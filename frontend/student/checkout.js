//Post to the orders table
//address 2 serves as apartment number
function addToOrders(fName, lName, mNumber, email, address, address2, method,phoneNumber, deliveryDate, deliveryTime){
    //POST to product table
    let isDelivery = false;
    if (method === 'Delivery'){
        isDelivery = true;
    }
    let cart = sessionStorage.getItem('cart')
    try{
    var cartArray = cart.split("::")
    }catch{ return; }
    let orderData = {'fName':fName,'lName':lName, 'mNumber':mNumber, 'address':address, 'address2':address2, 'delOrPickUp':isDelivery, 'email':email, 'phoneNumber':phoneNumber, 'orderStatus':0, 'delDate': deliveryDate, 'deliveryTime':deliveryTime, 'barcodes':cartArray}
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
    let deliveryDate = document.getElementById("checkoutDayDropDown").value // document.getElementById("checkoutDay").value
    let deliveryTime = document.getElementById("checkoutTime").value

    closePopup('intake');

    let cart = sessionStorage.getItem('cart')
    try{
    var cartArray = cart.split("::")
    }catch{ 
        alert("Order not submitted. No items in cart!");
        return; 
    }

    addToOrders(fName, lName, mNumber, email, address, address2, method,phoneNumber, deliveryDate, deliveryTime)
    sessionStorage.removeItem('cart')
    document.getElementById("itemCount").innerHTML=0;
    try{
    document.getElementById("shoppingCount").innerHTML=0;
    }catch{}
    alert("Order submitted, please fill out the intake form for your order to be fulfilled.");
    //window.open("https://www.uc.edu/campus-life/dean-of-students/bearcats-pantry/form.html", "_blank");
    location.reload()
}

function checkInputs(){
    let fName = document.getElementById("checkoutFirstName").value
    let lName = document.getElementById("checkoutLastName").value
    let mNumber = document.getElementById("checkoutMNumber").value
    let email = document.getElementById("checkoutUserEmail").value
    let address2 = document.getElementById("checkoutSuite").value
    let address = document.getElementById("checkoutAddress").value
    let method = document.getElementById("delivOrPick").value
    let phoneNumber = document.getElementById("checkoutPhoneNumber").value
    let deliveryDate = document.getElementById("checkoutDayDropDown").value // document.getElementById("checkoutDay").value
    let deliveryTime = document.getElementById("checkoutTime").value

    if(fName == "" || lName == "" || mNumber == "" || email == "" || address == "" || phoneNumber == ""){
        document.getElementById("NewwarningText").style.display = "block";
        return false;
    }

    return true;
}

function popIntake(){
    if(!checkInputs()){
        return;
    }
    try{
    if(intakeFormOpen === null){
        document.getElementById("intake").style.display = "block";

        intakeFormOpen = true
        document.getElementById('page-mask').style.position = "fixed";
    }
    else {
        document.getElementById("intake").style.display = "none";
        intakeFormOpen = null
        document.getElementById('page-mask').style.position = "unset";
    }
    }catch(error){console.log(error)}
}

function closePopup(element){
    document.getElementById(element).style.display = "none";
    document.getElementById('page-mask').style.position = "unset";
    document.getElementById('page-mask').style.backgroundColor = "unset";
    //location.reload();
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
        document.getElementById("shoppingCount").innerHTML = 0
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

// ---------------------------- WORKING METHOD -------------------------------- \\
/**    Notes
 * 
 * - starting algorithm is for the Summer Pilot of online orders - only two pickup days
 * - helpful links when using calendar picker again:
 * https://stackoverflow.com/questions/17182544/disable-certain-dates-from-html5-datepicker
 * https://www.w3schools.com/jsref/jsref_getday.asp
 * 
 * 
 * CURRENT STATE = can't set specific single dates to be enabled on calendar (without updated jQuery)
 *  - if this is just a testing feature for summer and certain "ranges" will be the norm in future,
 *     then maybe just have a drop down with the next available Tues and Wed for pick up.
 * 
 */

function setPickupDropDown(){
    let today = new Date();
    let nextAvailTues = new Date();
    let nextAvailWed = new Date();
    let pickupDates = [];
    // [0,1,2 ,3,4 ,5,6]
    // [S,M,Tu,W,Th,F,Sa]
    let dayOfWeekToday = today.getDay();
    console.log(today.toDateString());

    // if Sunday, get Tu/Wed of that week, otherwise get Tu/Wed of NEXT week
    if(dayOfWeekToday == 0){
        nextAvailTues = nextAvailTues.setDate(nextAvailTues.getDate() + 2); //new Date(today.getDate() + 2);
        nextAvailWed = nextAvailWed.setDate(nextAvailWed.getDate() + 3); //new Date(today.getDate() + 3);
        pickupDates.push(nextAvailTues, nextAvailWed);
    }
    else{
        let gapToTues = 7 + (2 - dayOfWeekToday);
        nextAvailTues = nextAvailTues.addDays(gapToTues); //nextAvailTues.setDate(nextAvailTues.getDate() + gapToTues);
        nextAvailWed = nextAvailWed.addDays(gapToTues + 1); // just add 1 for next Wed
        pickupDates.push(nextAvailTues, nextAvailWed);
    }

    let dateSelect = document.getElementById("checkoutDayDropDown");
    dateSelect.innerHTML = "";
    for(var i=0; i<pickupDates.length; i++){
        let date = pickupDates[i];
        let newElem = document.createElement("option");
        newElem.textContent = date.toDateString();
        newElem.value = date.toISOString().split('T')[0];
        dateSelect.appendChild(newElem);
    }
}

// method added to Date class
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
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

// global vars
let url ="";
let posturl = "";
let intakeFormOpen = null;

$(function(){
    $("#intakeForm").load("intakeForm.html");
});

fetch("../environment.json").then(response=>response.json())
    .then(json=>{
        env=json.env
        if (env === "dev"){
            url = "http://localhost:8080/"
            posturl = 'http://localhost:8080/'
        }else{
            //https does not work because SSL cert. Changing to http
            url = "https://bearcatspantry.uc.edu/web-services/"
            posturl = 'https://bearcatspantry.uc.edu/web-services/'
        }
        populateCart()
        
    })
    .catch(err => console.log("Error reading Environment"))




// **** for the Summer '22 test pilot *****
setPickupDropDown();