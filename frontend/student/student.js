$(function(){
    $("#navbar").load("../admin/NavBar.html");
});

//GLOBAL VARIABLES
let divhousing = "";


function addToCart(barcode){
    let items = sessionStorage.getItem('cart')
    if (items === null){
        sessionStorage.setItem('cart', barcode)
    } else {
        items = items +'::' + barcode
        sessionStorage.setItem('cart', items)
    }
    alert("Item has been added to cart!");
    var count = document.getElementById("shoppingCount").innerHTML;
    count++;
    document.getElementById("shoppingCount").innerHTML = count;
}

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
            let currentElement = JSON.stringify(element.barcodeId)
            console.log(element)
            divhousing = document.getElementById("itemsOuterContainer")
            let largestOuterDiv = document.createElement("div")
            largestOuterDiv.style.float = "left"
            largestOuterDiv.style.width = "25%"

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



            let divInnerProductInfoContainer = document.createElement("div")
            divInnerProductInfoContainer.style.width="100%"

            let productTypeDiv = document.createElement("div")
            productTypeDiv.innerHTML = "<small class=\"text-muted\">"+element.foodType+"</small>"
            productTypeDiv.style.width="50%"
            productTypeDiv.style.display="inline-block"
            divInnerProductInfoContainer.appendChild(productTypeDiv)
            let dietTypeDiv = document.createElement("div")
            let dietStatus = "";
            if (element.vegan == true){
                dietStatus = "Vegan <i class=\"fas fa-seedling\"></i>"
            } else if(element.vegetarian == true){
                dietStatus = "Vegetarian <i class=\"fas fa-leaf\"></i>"
            }
            dietTypeDiv.innerHTML ="<small style=\"color:#92d36e\">"+dietStatus+"</small>"
            dietTypeDiv.style.width="50%"
            dietTypeDiv.style.display="inline-block"
            dietTypeDiv.style.textAlign="right"
            divInnerProductInfoContainer.appendChild(dietTypeDiv)
            divhousing.appendChild(largestOuterDiv)

            buttonDiv.appendChild(divInnerProductInfoContainer)

            let styledButtonDiv = document.createElement("div")
            styledButtonDiv.className = "btn-group"
            styledButtonDiv.style.paddingTop="20px"
            styledButtonDiv.style.marginLeft="auto"
            styledButtonDiv.style.marginRight="auto"
            styledButtonDiv.style.maxWidth="50%"
            styledButtonDiv.style.display="grid"
            styledButtonDiv.innerHTML = "<button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" onclick=addToCart("+currentElement+")><i class=\"fas fa-cart-plus\"></i> Add to Cart</button>"
            buttonDiv.appendChild(styledButtonDiv)
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
            url = "https://bearcatspantry.uc.edu/web-services/"
            posturl = 'https://bearcatspantry.uc.edu/web-services/'
        }
        newShoppingItem()
    })
    .catch(err => console.log("Error reading Environment"))

let myStorage = window.sessionStorage;