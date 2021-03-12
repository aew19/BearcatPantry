$(function(){
    $("#navbar").load("../admin/NavBar.html");
});

function submitOrder() {
    //Hit orders post
}

function removeItemInCart(itemId) {

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
    let barcodes = items.split('::')
    barcodes.forEach(barcode =>{
        getBarcode(barcode).then(data =>{
            console.log(data)
        })
    })
    //get cart items
    //then format them
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

