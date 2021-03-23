$(function(){
    $("#navbar").load("../admin/NavBar.html");
});

//Todo Add Date Logic
//Post to the orders table
//address 2 serves as apartment number
function addToOrders(fName, lName, mNumber, email, address, address2, method,phoneNumber, deliveryDate, deliveryTime){
    //POST to product table
    let isDelivery = false;
    if (method === 'Delivery'){
        isDelivery = true;
    }
    let orderData = {'fName':fName,'lName':lName, 'address':address, 'address2':address2, 'delOrPickUp':isDelivery, 'email':email, 'phoneNumber':phoneNumber, 'orderStatus':0, 'delDate': deliveryDate, 'deliveryTime':deliveryTime}
    let orderFormBody =[];
    for (let orderKey in orderData){
        let encodedProdKey = encodeURIComponent(orderKey);
        let encodedProdValue = encodeURIComponent(orderData[orderKey]);
        orderFormBody.push(encodedProdKey+"="+encodedProdValue);
    }
    orderFormBody = orderFormBody.join("&");
    fetch(posturl + 'orders', {
        body: orderFormBody,
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    })
        .then(status)
        .then(json)
        .then(function(data){
            console.log('Request Succeeded', data)
        })
        .catch(function(error){
            console.log('Request Failed', error)
        });
}
//On submit get all the orders information
function submitOrder() {
    //Get the information to send to orders post
    let fName = document.getElementById("checkoutFirstName").value
    let lName = document.getElementById("checkoutLastName").value
    let mNumber = document.getElementById("checkoutMNumber").value
    let email = document.getElementById("checkoutUserEmail").value
    let address2 = document.getElementById("checkoutSuite").value
    let address = document.getElementById("checkoutAddress").value
    let method = document.getElementById("delivOrPick").value
    let phoneNumber = document.getElementById("checkoutPhoneNumber").value
    let deliveryDate = document.getElementById("checkoutDay").value
    let deliveryTime = document.getElementById("checkoutTime").value
    addToOrders(fName, lName, mNumber, email, address, address2, method,phoneNumber, deliveryDate, deliveryTime)
    sessionStorage.removeItem('cart')
    document.getElementById("itemCount").innerHTML=0;
    location.reload()
}

//Removes an item out of cart
function removeItemInCart(barcode) {
    let cart = sessionStorage.getItem('cart')
    let cartArray = cart.split("::")
    let index = cartArray.indexOf(barcode)
    if (index > -1){
        cartArray.splice(index,1);
    }
    let newCart = cartArray.join("::")
    sessionStorage.setItem('cart',newCart)
    location.reload()
}

//Get the item information by barcode
async function getBarcode(barcode){
    let response = await fetch(url + "items/"+barcode)
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//populates the cart
function populateCart(){
    let items = sessionStorage.getItem('cart')
    if (items === "" || items === null){
        sessionStorage.removeItem('cart')
        document.getElementById("itemCount").innerHTML = 0
        return;
    }

    let barcodes = items.split('::')
    document.getElementById("itemCount").innerHTML=barcodes.length
    barcodes.forEach(barcode =>{
        if (barcode=== ""){
            return;
        }
        getBarcode(barcode).then(data =>{
            if (data === undefined){
                return;
            }
            let currentElement = JSON.stringify(barcode)
            let listHousing = document.getElementById("itemList")
            let item = document.createElement("li")
            item.className = "list-group-item d-flex justify-content-between lh-sm"
            let storageDiv = document.createElement("div")
            let itemName = document.createElement("h6")
            itemName.innerHTML = "<small class=\"text-muted\">"+data.brand+"</small> <h6 class=\"my-0\">"+data.name+"</h6>"
            storageDiv.appendChild(itemName)
            let btnDeleteItem = document.createElement("a")
            btnDeleteItem.innerHTML = "<a class=\"btn btn-red\" id=\"CheckoutDeleteBtn\" onclick=removeItemInCart("+currentElement+")><i class=\"fas fa-trash\" aria-hidden=\"true\"></i></a>"
            item.appendChild(storageDiv)
            item.appendChild(btnDeleteItem)
            listHousing.appendChild(item)
        })
    })
}
//Error handling for status
function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

//Returns the json of the response
function json(response) {
    return response.json()
}

let url ="";
let posturl = "";
fetch("../environment.json").then(response=>response.json())
    .then(json=>{
        env=json.env
        if (env === "dev"){
            url = "http://localhost:8080/"
            posturl = 'http://localhost:8080/'
        }else{
            //https does not work because SSL cert. Changing to http
            url = "http://bearcatspantry.uc.edu:8080/web-services/"
            posturl = 'http://bearcatspantry.uc.edu:8080/web-services/'
        }
        populateCart()
    })
    .catch(err => console.log("Error reading Environment"))

