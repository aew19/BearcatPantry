//REPLACE ALL LOCALHOST:8080 WITH
//bcpwb1prd01l.ad.uc.edu:8080/web-services
//CHECK to see if you can hit the bcpwb and if not default back to localhost:8080
$(function(){
    $("#newItemModal").load("newItemModal.html");
});

$(function(){
    $("#scanMultipleItemsModal").load("scanMultipleItemsModal.html");
});

$(function(){
    $("#scanItemModal").load("scanItemModal.html");
});

$(function(){
    $("#recountInventoryModal").load("recountInventoryModal.html");
});

$(function(){
    $("#deleteItemModal").load("deleteItemModal.html");
});

//Global Variables
let newItem = null
let scanItem = null
let scanmulti = null
let recountInv = null;
let delItem = null;
let barcode;
let quantity;

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

function addToInventoryTable(barcode, quantity){
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
    //Get the information
    document.getElementById("scanItem").style.display = "none";
    scanItem = null
    barcode = document.getElementById("itemBarcode").value;
    quantity = document.getElementById("quantity").value;
    //API Hit
    getBarcode(barcode).then(
        data => {
            console.log(data)
            if (data != "notFound"){
                document.getElementById("newItem").style.display = "none";
                //Update Quantity
                getInventory().then(
                    allInventory=>{
                        for (i = 0; i<allInventory.length; i++){
                            console.log(allInventory[i])
                            if (allInventory[i].barcodeId === barcode){
                                //PUT
                                let currQuantity = parseInt(allInventory[i].quantity) + parseInt(quantity);
                                //update based on barcode id
                                updateInventory(barcode, currQuantity)
                                location.reload()
                                return;
                            }
                        }
                        addToInventoryTable(barcode,quantity)
                        location.reload()
                    }
                )

            }else{
                document.getElementById("newItem").style.display = "block";
            }

        }
    );
}




//The function can be used universally to close any popup
function closePopup(element){
    document.getElementById(element).style.display = "none";
   // location.reload()
   document.getElementById('page-mask').style.position = "unset";
}



//This function pops the scan item modal
function popScan(){
    let request = new XMLHttpRequest();
    if(scanItem === null){
        document.getElementById("scanItem").style.display = "block";
        let el_barcode = document.getElementById("itemBarcode")
        el_barcode.value = null
        let el_quantity = document.getElementById("quantity")
        el_quantity.value = null
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
    let counter = 0;
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

    }
}

//This function pops the bulk scan modal
function popNewItem(){
    let request = new XMLHttpRequest();
    document.getElementById("scanItem").style.display = "none";
    if(scanmulti === null){
        document.getElementById("newItem").style.display = "block";
        newItem = true
    } else {
        document.getElementById("newItem").style.display = "none";
        newItem = null
    }
}

function popRecountInventory(){
    let request = new XMLHttpRequest();
    document.getElementById("scanItem").style.display = "none";
    if(recountInv === null){
        document.getElementById("recountInventory").style.display = "block";
        document.getElementById('page-mask').style.position = "fixed";
        recountInv = true
    } else {
        document.getElementById("recountInventory").style.display = "none";
        recountInv = null
        document.getElementById('page-mask').style.position = "unset";
    }
}

function recountInventory(){
    // logic to erase current DB and replace with scanned items
    document.getElementById("recountInventory").style.display = "none";
    recountInv = null
    document.getElementById('page-mask').style.position = "unset";
}

function popConfirmDeleteItem(){
    let request = new XMLHttpRequest();
    document.getElementById("deleteItem").style.display = "block";
    delItem = true
    document.getElementById('page-mask').style.position = "fixed";
}

//On Submit of new item modal create new items
async function submitNewItem(){
    // let quantity = document.getElementById("newItemQuantity").value;
    let itemName = document.getElementById("itemName").value;
    let itemBrand = document.getElementById("itemBrand").value;
    let itemType = document.getElementById("type").value;
    let itemURL = document.getElementById("productURL").value;
    let vegan = document.getElementById("vegetarian").value;
    let vegetarian = document.getElementById("vegan").value;
    document.getElementById("newItem").style.display = "none";
    //Call API Endpoint
    await createItem(barcode, quantity, itemName, itemBrand, itemType, itemURL, vegetarian, vegan)
    location.reload()

}

function deleteItem(){
    // getInventory().then(
    //     data => {
    //        let check = document.getElementById("checkbox"+104);
    //        console.log(check)
    //     }
    // )
    // logic to erase items from DB
    document.getElementById('deleteItem').style.display = "none";
    document.getElementById('page-mask').style.position = "unset";
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
        let counter = 0
        const table = document.getElementById("pantryStock");
        for (let element of items) {
            let row = table.insertRow();
            //select
            let cell = row.insertCell();
            cell.innerHTML = "<input type=\"checkbox\" id=\"checkbox"+counter+"\"><label for=\"checkbox"+counter+"\"></label>";
            counter = counter + 1;
            //changed the id to be the barcode of the item the checkbox is next to
            // cell.innerHTML = "<input type=checkbox id=checkbox"+element.id+"><label for=checkbox"+element.id+"></label>";

            //name
            cell = row.insertCell();
            let text = document.createTextNode(element.productTitle);
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


createInventoryTable()

// DELETE ONCE FULLY ON DATABASE
// const bulkitems = [
//     {number: "1", item: "Pasta", expdate: ""},
//     {number: "2", item: "Mushrooms", expdate: ""},
//     {number: "3", item: "Mushrooms", expdate: ""},
//     {number: "4", item: "Mushrooms", expdate: ""},
//     {number: "5", item: "Eggs", expdate: ""},
//     {number: "6", item: "Milk", expdate: ""},
//     {number: "7", item: "Corn", expdate: ""},
//     {number: "8", item: "Black Beans", expdate: ""},
//     {number: "9", item: "Green Beans", expdate: ""},
//     {number: "10", item: "Green Beans", expdate: ""},
//     {number: "11", item: "Green Beans", expdate: ""},
//     {number: "12", item: "Pears", expdate: ""},
//     {number: "13", item: "Apples", expdate: ""},
//     {number: "14", item: "Pinto Beans", expdate: ""},
//     {number: "15", item: "Tomatos", expdate: ""}
// ];

loadBulkScan(bulkitems);
