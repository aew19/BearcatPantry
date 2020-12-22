//This function just loads the navbar onto the page
$(function(){
    $("#navBar").load("../navBar.html");
});

function loadPantryItems(items){
    const table = document.getElementById("pantryStock");
    items.forEach(item => {
        let row = table.insertRow();
        let name = row.insertCell(0);
        name.innerHTML = item.name;
        let quantity = row.insertCell(1);
        quantity.innerHTML = item.quantity;
        let type =  row.insertCell(2);
        type.innerHTML = item.type;
        let brand = row.insertCell(3);
        brand.innerHTML = item.brand;
        let vegOrVeg =  row.insertCell(4);
        vegOrVeg.innerHTML = item.vegOrVeg;
        let bestBuy =  row.insertCell(5);
        bestBuy.innerHTML = item.bestBuy;
        let expiration = row.insertCell(6);
        expiration.innerHTML = item.expiration;
    });
}
//Helper function for sorting table data
function sorting(a,b){
    if (a.value < b.value){
        return -1;
    }
    if (a.value > b.value){
        return 1;
    }
    return 0;
}
//Sorts the columns list
function sortColumn(list, direction){
    var sorted = list.sort(sorting);

    if (direction == -1){
        list.reverse();
    }
    return sorted;
}



const items = [
    {name: "Pasta", quantity: 10, type:"Grains", brand: "Kroger", vegOrVeg: "Vegetarian", bestBuy:"11/09/2020", expiration:"11/09/2020"},
    {name: "Tomatos", quantity: 20, type:"Vegtable", brand: "Walmart", vegOrVeg: "Vegan", bestBuy:"11/10/2020", expiration:"11/10/2020"}
];
loadPantryItems(items);