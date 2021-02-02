//REPLACE ALL LOCALHOST:8080 WITH
//bcpwb1prd01l.ad.uc.edu:8080/web-services
//CHECK to see if you can hit the bcpwb and if not default back to localhost:8080


$(function(){
    $("#newItemModal").load("newItemModal.html");
});

$(function(){
    $("#scanMultipleItemsModal").load("scanMultipleItemsModal.html");
});

//Global Variables
var newItem = null
var scanItem = null
var scanmulti = null
let barcode;

//API FUNCTIONS
//JOIN table for the inventory
async function getInventory(){
    let response = await fetch("http://localhost:8080/inventoryTable/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//If barcode is found we will update the quantity value
function updateInventory(barcode, quantity){
    //Update inventory table
    let data = {'quantity':parseInt(quantity)}
    let formBody =[];
    for (let key in data){
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        formBody.push(encodedKey+"="+encodedValue);
    }
    formBody = formBody.join("&");
    fetch('http://localhost:8080/updateInventory/'+ barcode, {
        body: formBody,
        method:"PUT",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    }).then(response => response.json())
        .then(data=> {console.log('Success');})
        .catch((error)=>{ console.error('Error:', error);});
}

function addToInventoryTable(barcode, quantity, expiration){
    //POST to inventory table
    let data = {'barcodeId':barcode, 'quantity':quantity}
    let formBody =[];
    for (let key in data){
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        formBody.push(encodedKey+"="+encodedValue);
    }
    formBody = formBody.join("&");
    fetch('http://localhost:8080/inventory', {
        body: formBody,
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    }).then(response => response.json())
        .then(data=> {console.log('Success');})
        .catch((error)=>{ console.error('Error:', error);});
}

//Calls barcode api endpoint
async function getBarcode(barcode){
    let response = await fetch("http://localhost:8080/items/"+barcode)
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}
//Add new item to database
//TODO add image
async function createItem(barcode, quantity, itemName, brand, type, url, isVegetarian, isVegan){
    console.log(barcode)
    //POST to inventory table
    addToInventoryTable(barcode, quantity)
    //POST to product table
    let prodData = {'barcodeId':barcode,'productTitle':itemName, 'foodType':type, 'brand':brand}
    let prodFormBody =[];
    for (let prodKey in prodData){
        let encodedProdKey = encodeURIComponent(prodKey);
        let encodedProdValue = encodeURIComponent(prodData[prodKey]);
        prodFormBody.push(encodedProdKey+"="+encodedProdValue);
    }
    prodFormBody = prodFormBody.join("&");
    fetch('http://localhost:8080/items', {
        body: prodFormBody,
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    }).then(response => response.json())
        .then(data=> {console.log('Success');})
        .catch((error)=>{ console.error('Error:', error);});
}


//Calls API function To load Database Information into the table
async function createInventoryTable(){
    getInventory().then(
        data => {
            if (data != "notFound") {
                loadPantryItems(data).then(result => createTableStyle())
            }

        }
    )
}

//MODAL FUNCTIONS
//This function pops the new item modal
function popNewItemModal(){
    let request = new XMLHttpRequest();
    document.getElementById("scanItem").style.display = "none";
    scanItem = null
    barcode = document.getElementById("itemBarcode").value;
    console.log(barcode);
    let expiration = document.getElementById("expirationDate").value;
    console.log(expiration);
    let quantity = document.getElementById("quantity").value;
    console.log(quantity);
    //API Hit
    getBarcode(barcode).then(
        data => {
            if (data != "notFound"){
                document.getElementById("newItem").style.display = "none";
                //Update Quantity
                getInventory().then(
                    allInventory=>{
                        allInventory.forEach(inventory=>{
                            if (inventory.barcodeId == barcode){
                                console.log(inventory)
                                let currQuantity = inventory.quantity + parseInt(quantity);
                                console.log(currQuantity)
                                //update based on barcode id
                                updateInventory(barcode, currQuantity)
                                location.reload()
                            }else{
                                //insert on inventory table
                                addToInventoryTable(barcode, quantity, expiration)
                                location.reload()
                            }
                        })
                    }
                )
            } else{
                document.getElementById("newItem").style.display = "block";
            }

        }
    );
}

//The function can be used universally to close any popup
function closePopup(element){
    document.getElementById(element).style.display = "none";
    location.reload()
}



//This function pops the scan item modal
function popScan(){
    let request = new XMLHttpRequest();
    if(scanItem === null){
        document.getElementById("scanItem").style.display = "block";
        let el_barcode = document.getElementById("itemBarcode")
        el_barcode.value = null
        let el_expiration = document.getElementById("expirationDate")
        el_expiration.value = null
        scanItem = true
        document.getElementById('page-mask').style.position = "fixed";
    } else {
        document.getElementById("scanItem").style.display = "none";
        scanItem = null
        document.getElementById('page-mask').style.position = "unset";
    }
}

//This function pops the bulk scan modal
function popMultiScan(){
    let request = new XMLHttpRequest();
    document.getElementById("scanItem").style.display = "none";
    if(scanmulti === null){
        document.getElementById("multipleItems").style.display = "block";
        scanmulti = true;
        document.getElementById('page-mask').style.position = "fixed";
    } else {
        document.getElementById("multipleItems").style.display = "none";
        document.getElementById('page-mask').style.position = "unset";
        scanmulti = null
    }
}

function loadBulkScan(bulkitems){
    const table = document.getElementById("bulkScanTable");
    var counter = 0;
    for (let element of bulkitems) {
        let row = table.insertRow();

        //item #
        let cell = row.insertCell();
        counter++;
        let text = document.createTextNode(counter);
        cell.appendChild(text);

        //name
        cell = row.insertCell();
        text = document.createTextNode(element.item);
        cell.appendChild(text);

        //Expiration Date
        cell = row.insertCell();
        text = document.createTextNode(element.expdate);
        cell.innerHTML = "<input type=\"date\" id=\"date"+counter+"\"><label for=\"date"+counter+"\"></label>";
        cell.appendChild(text);
    }
}

//This function pops the bulk scan modal
function popNewItem(){
    let request = new XMLHttpRequest();
    document.getElementById("scanItem").style.display = "none";
    if(scanmulti === null){
        document.getElementById("newItem").style.display = "block";
        var barcode = document.getElementById("barcode").value;
        var quantity = document.getElementById("quantity").value;

        newItem = true
    } else {
        document.getElementById("newItem").style.display = "none";
        newItem = null
    }
}


//On Submit of new item modal create new items
async function submitNewItem(){
    let quantity = document.getElementById("newItemQuantity").value;
    let itemName = document.getElementById("itemName").value;
    let itemBrand = document.getElementById("itemBrand").value;
    let itemType = document.getElementById("type").value;
    let itemURL = document.getElementById("productURL").value;
    let vegan = document.getElementById("vegetarian").value;
    let vegetarian = document.getElementById("vegan").value;
    document.getElementById("newItem").style.display = "none";
    //Call API Endpoint
    await createItem(barcode, quantity, itemName, itemBrand, itemType, itemURL, vegetarian, vegan)

}

$(function () {
    $('#bulkScanTable').DataTable({
        "pageLength": 10,
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        "info": false,
        "autoWidth": true,
        "paging": false
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

//This function formats database data into the columns for the database
//Helper function
function loadPantryItems(items){
    let loadPromise = function(resolve,reject) {
        const table = document.getElementById("pantryStock");
        for (let element of items) {
            let row = table.insertRow();

            //select
            let cell = row.insertCell();
            let text = document.createTextNode(element.barcodeId);
            //changed the id to be the barcode of the item the checkbox is next to
            cell.innerHTML = "<input type=\"checkbox\" id=\"checkbox"+element.barcodeId+"\"><label for=\"checkbox"+element.barcodeId+"\"></label>";

            //name
            cell = row.insertCell();
            text = document.createTextNode(element.productTitle);
            cell.appendChild(text);

            //quantity
            cell = row.insertCell();
            text = document.createTextNode(element.quantity);
            if (element.quantity < 15) {
                cell.style.backgroundColor = '#ff3823';
                cell.style.color = '#fff';
            }
            else if (element.quantity >= 15 & element.quantity < 45) {
                cell.style.backgroundColor = '#fefb64';
            }
            else if (element.quantity >= 45) {
                cell.style.backgroundColor = '#92d36e';
                cell.style.color = '#fff';
            }
            cell.appendChild(text);

            //type
            cell = row.insertCell();
            text = document.createTextNode(element.foodType);
            cell.appendChild(text);

            //brand
            cell = row.insertCell();
            text = document.createTextNode(element.brand);
            cell.appendChild(text);

            //Vegetarian or Vegan
            cell = row.insertCell();
            if (element.vegan == true){
                text = document.createTextNode("Vegan");
                cell.appendChild(text);
            }
            else if (element.vegetarian == true){
                text = document.createTextNode("Vegetarian");
                cell.appendChild(text);
            } else{
                text = document.createTextNode("Neither");
                cell.appendChild(text);
            }

            //Best Buy Date
            cell = row.insertCell();
            if (element.bestBuyDate == null || element.bestBuyDate == ""){
                text = document.createTextNode("Unknown");
                cell.appendChild(text);
            }else{
                text = document.createTextNode(element.bestBuyDate);
                cell.appendChild(text);
            }
        }
        resolve("Success");
    }
    return new Promise(loadPromise);
}

//This function is used for the formatting of the table
//Right now searching and ordering is on
function createTableStyle() {
    $('#pantrytable').DataTable({
        "pageLength": 15,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": false,
        "autoWidth": true,
        "paging": true,
        "pagingType": "full_numbers",
        "lengthMenu": [[15, 25, 50, -1], [15, 25, 50, "All"]],
        language: {
            lengthMenu: "Display _MENU_ Items Per Page",
            searchPlaceholder: "Search Items",
            search: "",

        },
    });
}



createInventoryTable()




function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#imgPreview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

$("#prodImg").change(function() {
    readURL(this);
});

// DELETE ONCE FULLY ON DATABASE
const bulkitems = [
    {number: "1", item: "Pasta", expdate: ""},
    {number: "2", item: "Mushrooms", expdate: ""},
    {number: "3", item: "Mushrooms", expdate: ""},
    {number: "4", item: "Mushrooms", expdate: ""},
    {number: "5", item: "Eggs", expdate: ""},
    {number: "6", item: "Milk", expdate: ""},
    {number: "7", item: "Corn", expdate: ""},
    {number: "8", item: "Black Beans", expdate: ""},
    {number: "9", item: "Green Beans", expdate: ""},
    {number: "10", item: "Green Beans", expdate: ""},
    {number: "11", item: "Green Beans", expdate: ""},
    {number: "12", item: "Pears", expdate: ""},
    {number: "13", item: "Apples", expdate: ""},
    {number: "14", item: "Pinto Beans", expdate: ""},
    {number: "15", item: "Tomatos", expdate: ""}
];

loadBulkScan(bulkitems);
