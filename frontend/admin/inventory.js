//This function just loads the navbar onto the page
$(function(){
    $("#navBar").load("../navBar.html");
});
//Modal Pop variables
var newItem = null
var scanItem = null
var scanmulti = null

//This function pops the new item modal
function popNewItemModal(){
    let request = new XMLHttpRequest();
    document.getElementById("scanItem").style.display = "none";
    scanItem = null
    if(newItem === null){
        document.getElementById("newItem").style.display = "block";
        var barcode = document.getElementById("barcode").value;
        console.log(barcode);
        var quantity = document.getElementById("quantity").value;
        console.log(quantity);
        // request.open("POST", "http://localhost:8080/newBarcode", true);
        // request.send(inputVal);
        // request.onload = () => {
        //     console.log(request);
        //     if (request.status === 200){
        //         console.log("SUCCESS!")
        //     }
        // }
        newItem = true
    } else {
        document.getElementById("newItem").style.display = "none";
        newItem = null
    }
}

//This function pops the scan item modal
function popScan(){
    let request = new XMLHttpRequest();
    if(scanItem === null){
        document.getElementById("scanItem").style.display = "block";
        // var inputVal = document.getElementById("comment").value;
        // console.log(inputVal);
        // request.open("POST", "http://localhost:8080/newBarcode", true);
        // request.send(inputVal);
        // request.onload = () => {
        //     console.log(request);
        //     if (request.status === 200){
        //         console.log("SUCCESS!")
        //     }
        // }
        scanItem = true
    } else {
        document.getElementById("scanItem").style.display = "none";
        scanItem = null
    }

}

//This function pops the bulk scan modal
function popMultiScan(){
    let request = new XMLHttpRequest();
    document.getElementById("scanItem").style.display = "none";
    if(scanmulti === null){
        document.getElementById("multipleItems").style.display = "block";
        var barcode = document.getElementById("barcode").value;
        console.log(barcode);
        var quantity = document.getElementById("quantity").value;
        console.log(quantity);
        // request.open("POST", "http://localhost:8080/newBarcode", true);
        // request.send(inputVal);
        // request.onload = () => {
        //     console.log(request);
        //     if (request.status === 200){
        //         console.log("SUCCESS!")
        //     }
        // }
        scanmulti = true
    } else {
        document.getElementById("multipleItems").style.display = "none";
        scanmulti = null
    }
}

//This function is used for the formatting of the table
//Right now searching and ordering is on
$(function () {
    $('#pantrytable').DataTable({
      "pageLength": 3,
      "paging": false,
      "lengthChange": true,
      "searching": true,
      "ordering": true,
      "info": false,
      "autoWidth": true
      });
});

//This function is used for exporting data in a table to CSV
function exportCSV(elem){
    var table = document.getElementById("pantrytable");
    var html = table.outerHTML;
    var url = 'data:application/vnd.ms-excel,' + escape(html); // Set your html table into url 
    elem.setAttribute("href", url);
    elem.setAttribute("download", "pantrystock.xls"); // Choose the file name
    return false;
}

//This function loads pantry items from data
function loadPantryItems(items){
    const table = document.getElementById("pantryStock");
    for (let element of items) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            if (element[key] < 15) {
                cell.style.backgroundColor = '#ff3823';
                cell.style.color = '#fff';
            }
            else if (element[key] >= 15 & element[key] < 45) {
                cell.style.backgroundColor = '#fefb64';
            }
            else if (element[key] >= 45) {
                cell.style.backgroundColor = '#92d36e';
                cell.style.color = '#fff';
            }
            cell.appendChild(text);
        }
    }
}

// let request = new XMLHttpRequest();
// request.open("GET", "http://localhost:8080/items", true);
// request.onload = function (){
//     let data = JSON.parse(this.response);
//     console.log(data)
// }
// request.send()
const items = [
    {name: "Pasta", quantity: 10, type:"Grains", brand: "Kroger", vegOrVeg: "Vegetarian", bestBuy:"11/09/2020", expiration:"11/09/2020"},
    {name: "Tomatos", quantity: 20, type:"Vegtable", brand: "Walmart", vegOrVeg: "Vegan", bestBuy:"11/10/2020", expiration:"11/10/2020"}
];
loadPantryItems(items);