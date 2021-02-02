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

const items = [
    {name: "Pasta", quantity: 10, type:"Grains", brand: "Kroger", vegOrVeg: "Vegetarian", bestBuy:"11/09/2020", expiration:"11/09/2020"},
    {name: "Tomatos", quantity: 20, type:"Vegtable", brand: "Walmart", vegOrVeg: "Vegan", bestBuy:"11/10/2020", expiration:"11/10/2020"}
];
loadPopularItems(items);