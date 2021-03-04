//GLOBAL VARIABLES
let divhousing = "";




function addToCart(barcode){


    if(itemBarcode=1){

    }
}

function loadPopularItems(items){
    const table = document.getElementById("popItems");
    items.forEach(item => {
        let row = table.insertRow();
        let name = row.insertCell(0);
        name.innerHTML = item.name;
    });
}

// const items = [
//     {name: "Pasta", quantity: 10, type:"Grains", brand: "Kroger", vegOrVeg: "Vegetarian", bestBuy:"11/09/2020", expiration:"11/09/2020"},
//     {name: "Tomatos", quantity: 20, type:"Vegtable", brand: "Walmart", vegOrVeg: "Vegan", bestBuy:"11/10/2020", expiration:"11/10/2020"}
// ];
// loadPopularItems(items);

function showNavBar() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}

function checkout() {
    window.open("checkout.html", '_self');
}

//JOIN table for the inventory
async function getInventory(){
    let response = await fetch(url + "inventoryTable/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}


//Function that looks at multiple items button and reads the barcode scanned
function newShoppingItem(){
    getInventory().then(data =>{
        for (let element of data) {
            console.log(element)
            divhousing = document.getElementById("itemsOuterContainer")
            let largestOuterDiv = document.createElement("div")
            let columnStyleDiv = document.createElement("div")
            columnStyleDiv.className = "col shopping"
            largestOuterDiv.appendChild(columnStyleDiv)
            let cardDiv = document.createElement("div")
            cardDiv.className = "card shadow-sm shoppingcard"
            columnStyleDiv.appendChild(cardDiv)
            cardDiv.innerHTML = "<svg class=\"bd-placeholder-img card-img-top\" width=\"152\" height=\"152\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Placeholder: Thumbnail\" preserveAspectRatio=\"xMidYMid slice\" focusable=\"false\"><image href=\"../../productPhotos/"+element.barcodeId+"/"+element.image+"\" height=\"152\" width=\"152\"/></svg>"
            let cardBody = document.createElement("div")
            cardBody.className = "card-body"
            cardDiv.appendChild(cardBody)
            let cardTitle = document.createElement("h5")
            cardTitle.innerHTML = "<h5 class=\"shoppingtitle\">"+element.productTitle+"</h5>"
            cardBody.appendChild(cardTitle)
            let cardLink = document.createElement("p")
            cardLink.innerHTML = "<p class=\"card-text\">"+element.brand+"<br> <a class=\"shoppinglink\" href=\""+element.productURL+"\" target=\"_blank\">More Info</a></p>"
            cardBody.appendChild(cardLink)
            let buttonDiv = document.createElement("div")
            cardBody.appendChild(buttonDiv)
            let styledButtonDiv = document.createElement("div")
            styledButtonDiv.className = "btn-group"
            styledButtonDiv.innerHTML = "<button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" onclick=\"\"><i class=\"fas fa-cart-plus\"></i> Add to Cart</button>"
            buttonDiv.appendChild(styledButtonDiv)
            let productTypeDiv = document.createElement("div")
            productTypeDiv.innerHTML = "<small class=\"text-muted\">"+element.foodType+"</small>"
            buttonDiv.appendChild(productTypeDiv)
            divhousing.appendChild(largestOuterDiv)
        }

    })

}

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
        newShoppingItem()
    })
    .catch(err => console.log("Error reading Environment"))

