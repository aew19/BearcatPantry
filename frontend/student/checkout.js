$(function(){
    $("#navbar").load("../admin/NavBar.html");
});

function submitOrder() {
    //Hit orders post
}

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

async function getBarcode(barcode){
    let response = await fetch(url + "items/"+barcode)
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

function populateCart(){
    let items = sessionStorage.getItem('cart')
    if (items === ""){
        sessionStorage.removeItem('cart')
        return;
    }
    let barcodes = items.split('::')
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
            itemName.innerHTML = "<h6 class=\"my-0\">"+data.name+"</h6>"
            storageDiv.appendChild(itemName)
            let itemBrand = document.createElement("small")
            itemBrand.innerHTML="<small class=\"text-muted\">"+data.brand+"</small>"
            storageDiv.appendChild(itemBrand)
            let btnDeleteItem = document.createElement("a")
            btnDeleteItem.innerHTML = "<a class=\"btn btn-red\" id=\"CheckoutDeleteBtn\" onclick=removeItemInCart("+currentElement+")><i class=\"fas fa-trash\" aria-hidden=\"true\"></i></a>"
            item.appendChild(storageDiv)
            item.appendChild(btnDeleteItem)
            listHousing.appendChild(item)
        })
    })
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
            url = "https://bcpwb1prd01l.ad.uc.edu:8443/web-services/"
            posturl = 'https://bcpwb1prd01l.ad.uc.edu:8443/web-services/'
        }
        populateCart()
    })
    .catch(err => console.log("Error reading Environment"))

