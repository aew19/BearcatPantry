//TODO REPLACE ALL LOCALHOST:8080 WITH https://bcpwb1prd01l.ad.uc.edu:8443/web-services/items
//CHECK to see if you can hit the bcpwb and if not default back to localhost:8080

let env="";
let url = "";
let posturl = '';
let InventoryData = new Object();
//Reads the environment and sets the correct API URL
async function loadEnv(){
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

                removeATagFromVolunteer("InventoryCSVExport");
            }
            google.charts.setOnLoadCallback(function() {
                createInventoryTable();
            });
        })
        .catch(err => console.log("Error reading Environment"))
}

$(function(){
    $("#newItemModal").load("newItemModal.html");
});
$(function(){
    $("#editItemModal").load("editItemModal.html");
});
$(function(){
    $("#scanMultipleItemsModal").load("scanMultipleItemsModal.html");
});

$(function(){
    $("#scanItemModal").load("scanItemModal.html");
});

$(function(){
    $("#checkoutModal").load("checkoutModal.html");
});

$(function(){
    $("#recountInventoryModal").load("recountInventoryModal.html");
});

$(function(){
    $("#deleteItemModal").load("deleteItemModal.html");
});

$(function(){
    $("#unknownItemModal").load("unknownItemModal.html");
});

$(function(){
    $("#addItemClassModal").load("addItemClassModal.html");
});


//Global Variables
let newItem = null
let scanItem = null
let checkout = null
let checkoutItemList = [];
let scanmulti = null
let recountInv = null;
let delItem = null;
let newItemClass = null;
let divHousing = null;
let divMulti = null;
let bulkScanItemList = [];


//API FUNCTIONS
//JOIN table for the inventory
async function getInventory(){
    let response = await fetch(url + "inventoryTable/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//If barcode is found we will update the quantity value
function updateInventory(barcode1, quantity){
    //Update inventory table
    let data = {'quantity':parseInt(quantity)}
    let formBody =[];
    for (let key in data){
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        formBody.push(encodedKey+"="+encodedValue);
    }
    formBody = formBody.join("&");
    fetch(posturl + 'updateInventory/'+ barcode1, {
        body: formBody,
        method:"PUT",
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

//Update product table
function updateProduct(barcode, itemName, brand, type, url, isVegetarian, isVegan, weight){
    let data = {'productTitle':itemName, 'brand':brand,'foodType':type, 'productURL':url, 'vegetarian':isVegetarian, 'vegan':isVegan, 'weight':weight}
    let formBody =[];
    for (let key in data){
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        formBody.push(encodedKey+"="+encodedValue);
    }
    formBody = formBody.join("&");
    fetch(posturl + 'items/'+ barcode, {
        body: formBody,
        method:"PUT",
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

//Delete item from inventory
function deleteInventory(barcode){
    fetch(posturl+'deleteInventory/'+ barcode, {
        method:"DELETE",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    }).then(response => console.log(response.json()));
}

async function addToInventoryTable(barcode, quantity){
    //POST to inventory table
    let data = {'barcodeId':barcode, 'quantity':quantity}
    let formBody =[];
    for (let key in data){
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        formBody.push(encodedKey+"="+encodedValue);
    }
    formBody = formBody.join("&");
    fetch(posturl+'inventory', {
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body: formBody
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

//Calls barcode api endpoint
async function getBarcode(barcode){
    let response = await fetch(url + "items/"+barcode)
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

async function getInventoryItem(barcode){
    let response = await fetch(url + "inventory/"+barcode)
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//Add new item to product database
async function createItem(barcode, quantity, itemName, brand, type, url, isVegetarian, isVegan, image, weight){
    //let checkWeight = parseFloat(weight);
    //POST to product table
    let prodData = {'barcodeId':barcode,'productTitle':itemName, 'foodType':type, 'brand':brand, 'productURL':url, 'vegetarian':isVegetarian, 'vegan':isVegan, 'weight':weight}
    let prodFormBody =[];
    for (let prodKey in prodData){
        let encodedProdKey = encodeURIComponent(prodKey);
        let encodedProdValue = encodeURIComponent(prodData[prodKey]);
        prodFormBody.push(encodedProdKey+"="+encodedProdValue);
    }
    prodFormBody = prodFormBody.join("&");
    fetch(posturl + 'items', {
        body: prodFormBody,
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

//Add image to item
async function addImage(barcode, image){
    let prodFormBody = new FormData();
    prodFormBody.append('file',image)
    fetch(posturl + 'addImage/'+barcode, {
        body: prodFormBody,
        enctype: "multipart/form-data",
        method:"PUT",
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

function bulkUpdateQuantities(){
    document.getElementById("bulkScan").style.display = "none";
    document.getElementById('page-mask').style.position = "unset";
    let product = {'barcodeIds':bulkScanItemList}
    let prodFormBody =[];
    for (let prodKey in product){
        let encodedProdKey = encodeURIComponent(prodKey);
        let encodedProdValue = encodeURIComponent(product[prodKey]);
        prodFormBody.push(encodedProdKey+"="+encodedProdValue);
    }
    prodFormBody = prodFormBody.join("&");
    let response = fetch(posturl + '/increaseInventory', {
        body: prodFormBody,
        method:"PUT",
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
    location.reload()
}

function checkoutUpdateQuantities(){
    document.getElementById("checkout").style.display = "none";
    document.getElementById('page-mask').style.position = "unset";
    let product = {'barcodeIds':checkoutItemList}
    let prodFormBody =[];
    for (let prodKey in product){
        let encodedProdKey = encodeURIComponent(prodKey);
        let encodedProdValue = encodeURIComponent(product[prodKey]);
        prodFormBody.push(encodedProdKey+"="+encodedProdValue);
    }
    prodFormBody = prodFormBody.join("&");
    let response = fetch(posturl + 'decreaseInventory', {
        body: prodFormBody,
        method:"PUT",
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
    location.reload()
    rowCount = 0;
}

//Removes image when editing the image in the folder
async function deleteImage(barcode){
    fetch(posturl+'deleteImage/'+ barcode, {
        method:"DELETE",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    })
        .then(status)
        .then(json)
        .then(function(data){
            console.log("Folder Deleted", data)
        }).catch(function (error){
            console.log("Request Failed", error)
    });
}

//Calls API function To load Database Information into the table
async function createInventoryTable(){
    getInventory().then(
        data => {
            if (data != "notFound") {
                InventoryData = data;
                makeInventoryTable(data);
            }
        }
    )
}

google.charts.load('current', {'packages':['table']});
function makeInventoryTable(inventoryData) {
    var InventoryTable = new google.visualization.DataTable();
    InventoryTable.addColumn('string','Modify Item');
    InventoryTable.addColumn('string','Item');
    InventoryTable.addColumn('number','Quantity');
    InventoryTable.addColumn('string','Type');
    InventoryTable.addColumn('string','Brand');
    InventoryTable.addColumn('number','Weight');

    InventoryTable.addRows(inventoryData.length);
    var counter = 0;
    for (let element of inventoryData) {
        let currentElement = JSON.stringify(element.barcodeId);
        InventoryTable.setValue(counter, 0, "<a class=\"btn btn-red\" id=\"EditBtn\" onclick =popEditItem("+currentElement+","+element.quantity+")><i class='fas fa-edit'></i></a><a class=\"btn btn-red\" id=\"DeleteBtn\" onclick =popConfirmDeleteItem("+currentElement+")><i class='fas fa-trash'></i></a>");
        InventoryTable.setValue(counter, 1, element.productTitle);
        InventoryTable.setValue(counter, 2, element.quantity);
        InventoryTable.setValue(counter, 3, element.foodType);
        InventoryTable.setValue(counter, 4, element.brand);
        InventoryTable.setValue(counter, 5, element.weight);
        counter++;
    }
        
    var formatter = new google.visualization.ColorFormat();
    formatter.addRange(0, 15, '#fff', '#ff3823');
    formatter.addRange(15, 45, 'black', '#fefb64');
    formatter.addRange(45, 1000, '#fff', '#92d36e');
    formatter.format(InventoryTable, 2);

    var table = new google.visualization.Table(document.getElementById('pantryStock'));

    var cssClassNames = {
        'headerRow': 'table',
        'tableRow': 'table',
        'oddTableRow': 'table'
    };

    table.draw(InventoryTable, {width: '100%', height: '100%', allowHtml:true, sortColumn:2, page:'enable', pageSize: 10, pagingButtons:'both', 'cssClassNames': cssClassNames});
}

//MODAL FUNCTIONS
//This function pops the new item modal
function popNewItemModal(){
    //Get the information
    let barcode = document.getElementById("itemBarcode").value;
    let quantity = document.getElementById("quantity").value;
    if (barcode == "" || quantity == "") {
        document.getElementById("warningText").style.display = "block";
    }
    else {
        document.getElementById("scanItem").style.display = "none";
        scanItem = null    
        //API Hit
        getBarcode(barcode).then(
            data => {
                if (data != "notFound"){
                    document.getElementById("newItem").style.display = "none";
                    //Update Quantity
                    getInventory().then(
                        allInventory=>{
                            for (i = 0; i<allInventory.length; i++){
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
                    let el_barcode = document.getElementById("newItemBarcode");
                    el_barcode.value = barcode;
                    let el_quantity = document.getElementById("newItemQuantity");
                    el_quantity.value = quantity;
                }

            }
        );
    }
}
//If bulk scan does not find item then we ask them to enter item
function popUnknownItemModal(barcode){
    document.getElementById("unknownItem").style.display = "block";
    document.getElementById("unknownItemBarcode").value = barcode;
    document.getElementById("bulkScan").style.display = "none";
}

//The function can be used specifically for bulk scan issues
function closeUnknownItemPopUp(){
    document.getElementById("unknownItem").style.display = "none";
    document.getElementById("bulkScan").style.display = "block";
}

async function submitUnknownItem(){
    let quantity = document.getElementById("unknownItemQuantity").value;
    let barcode = document.getElementById("unknownItemBarcode").value;
    let itemName = document.getElementById("unknownItemName").value;
    let itemBrand = document.getElementById("unknownItemBrand").value;
    let itemType = document.getElementById("unknownItemType").value;
    let itemURL = document.getElementById("unknownItemProductURL").value;
    let vegan = false;
    let vegetarian = false;
    let image = document.getElementById("unknownItemProdImg").files[0];

    if (document.getElementById("unknownItemVegetarian").value == "true") {
        vegetarian = true;
    }

    if (document.getElementById("unknownItemVegan").value == "true") {
        vegan = true;
    }

    if (quantity == "" || barcode == "" || itemName == "" || itemBrand == "" || itemType == "" || itemURL == "" || image == null) {
        document.getElementById("UnknownwarningText").style.display = "block";
    }
    else {
        document.getElementById("unknownItem").style.display = "none";
        //Call API Endpoint
        await createItem(barcode, quantity, itemName, itemBrand, itemType, itemURL, vegetarian, vegan, image)
        sleep(1000);
        await addImage(barcode,image)
        //See if image made it
        getBarcode(barcode).then(data=>{
            //If not retry the insert
            if (data.image === null) {
                addImage(barcode,image)
            }
        })
        sleep(1000);
        closeUnknownItemPopUp();
        document.getElementById("multiScanBarcode").value = barcode;
        newScannedItem();
        itemName = document.getElementById("unknownItemName").value = "";
        itemBrand = document.getElementById("unknownItemBrand").value = "";
        itemType = document.getElementById("unknownItemType").value = "Other";
        itemURL = document.getElementById("unknownItemProductURL").value = "";
        vegan = document.getElementById("unknownItemVegan").value = "false";
        vegetarian = document.getElementById("unknownItemVegetarian").value = "false";
        image = document.getElementById("unknownItemImgPreview").src = "../images/placeholderimage.png";
    }
}


//The function can be used universally to close any popup
function closePopup(element){
    document.getElementById(element).style.display = "none";
    document.getElementById('page-mask').style.position = "unset";
    document.getElementById('page-mask').style.backgroundColor = "unset";
    //location.reload();
}


//This function pops the scan item modal
function popScan(){
    let request = new XMLHttpRequest();
    if(scanItem === null){
        document.getElementById("scanItem").style.display = "block";
        let el_barcode = document.getElementById("itemBarcode")
        el_barcode.focus()
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

//This function pops the checkout modal
function popCheckout(){
    if(checkout === null){
        document.getElementById("checkout").style.display = "block";
        let el_barcode = document.getElementById("checkoutItemBarcode")
        el_barcode.value = null
        el_barcode.focus()
        divHousing = document.getElementById("checkoutItemList")

        checkout = true
        document.getElementById('page-mask').style.position = "fixed";
    } else {
        document.getElementById("checkout").style.display = "none";
        checkout = null
        document.getElementById('page-mask').style.position = "unset";
    }
}
//Function that looks at multiple items button and reads the barcode scanned
function newScannedItem(){
    const table = document.getElementById("multiItemTable");
    let newScanSlot = document.createElement("p");
    let scanItemText = "";
    let currentBarcode = document.getElementById("multiScanBarcode").value
    getBarcode(currentBarcode).then(
        data => {
            let currentElement = JSON.stringify(currentBarcode)
            if (data === "notFound"){
                popUnknownItemModal(currentBarcode)
                document.getElementById("multiScanBarcode").value = "";
            }else{
                bulkScanItemList.push(document.getElementById("multiScanBarcode").value);
                let row = table.insertRow();
                //name
                let cell = row.insertCell();
                let text = document.createTextNode(data.name);
                cell.appendChild(text);
                //brand
                cell = row.insertCell();
                text = document.createTextNode(data.brand);
                cell.appendChild(text);
                //Delete Button
                cell = row.insertCell();
                cell.innerHTML ="<a class=\"btn btn-red\" id=\"DeleteBtn\" onclick =deleteTableEntryMulti(this,"+currentElement+")><i class='fas fa-trash'></i></a>";
                document.getElementById("multiScanBarcode").value = "";
            }

        })
}

let rowCount = 0;

function newLine(){
    const table = document.getElementById("checkoutTable");
    let newBarcodeSlot = document.createElement("p");
    let itemText = "";
    checkoutItemList.push(document.getElementById("checkoutItemBarcode").value);
    let currBarcode = document.getElementById("checkoutItemBarcode").value;
    console.log(currBarcode)
    getBarcode(currBarcode).then(
        data => {
            let currentElement = JSON.stringify(currBarcode)
            let row = table.insertRow();
            //name
            let cell = row.insertCell();
            let text = document.createTextNode(data.name);
            cell.appendChild(text);
            //brand
            cell = row.insertCell();
            text = document.createTextNode(data.brand);
            cell.appendChild(text);
            //Delete Button
            cell = row.insertCell();
            cell.innerHTML ="<a class=\"btn btn-red\" id=\"DeleteBtn\" onclick=deleteTableEntryCheckout(this,"+currentElement+")><i class='fas fa-trash'></i></a>";
            document.getElementById("checkoutItemBarcode").value = "";
        })

}

function deleteTableEntryCheckout(row,barcode){
    let i = row.parentNode.parentNode.rowIndex;
    let item = checkoutItemList.indexOf(barcode)
    if (item > -1){
        checkoutItemList.splice(item,1);
    }
    document.getElementById("checkoutTable").deleteRow(i);
}

function deleteTableEntryMulti(row, barcode){
    let i = row.parentNode.parentNode.rowIndex;
    let item = bulkScanItemList.indexOf(barcode)
    if (item > -1){
        bulkScanItemList.splice(item,1);
    }
    document.getElementById("multiItemTable").deleteRow(i);
}

//This function pops the bulk scan modal
function popMultiScan(){
    if(scanmulti === null){
        document.getElementById("bulkScan").style.display="block";
        document.getElementById('page-mask').style.position = "fixed";
        let el_barcode = document.getElementById("multiScanBarcode")
        el_barcode.value = null
        el_barcode.focus()
        divMulti = document.getElementById("multiScanList")
        scanmulti = true
    } else {
        document.getElementById("bulkScan").style.display = "none";
        scanmulti = null
        document.getElementById('page-mask').style.position = "unset";
    }
}


//This function pops the bulk scan modal
function popNewItem(){
    document.getElementById("scanItem").style.display = "none";
    if(scanmulti === null){
        document.getElementById("newItem").style.display = "block";
        newItem = true
    } else {
        document.getElementById("newItem").style.display = "none";
        newItem = null
    }
}

async function popEditItem(barcode1, quantity){
    let dropDown = document.getElementById("newItemClass");
    dropDown.innerHTML = "";
    let inventoryItem = await getInventoryItem(barcode1);
    //console.log(inventoryItem);
    let itemClasses = await getAllItemClasses();
    //console.log(itemClasses);
    getBarcode(barcode1).then(
        data => {
            document.getElementById("editItem").style.display = "block";
            document.getElementById('page-mask').style.position = "fixed";
            document.getElementById("newType").value = data.type;
            document.getElementById("newBarcode").value = data.barcode;
            document.getElementById("newItemName").value = data.name;
            document.getElementById("newQuantity").value = quantity;
            document.getElementById("newItemBrand").value = data.brand;
            document.getElementById("newProductURL").value = data.productURL;
            document.getElementById("editItemWeight").value = data.weight.toString();
            if (data.vegetarian === true){
                document.getElementById("newVegetarian").value = "true";
            }
            if (data.vegan === true){
                document.getElementById("newVegan").value = "true";
            }

                
            for(i=0; i<itemClasses.length; i++){
                let itemClass = itemClasses[i];
                var opt = document.createElement("option");
                opt.value = itemClass.className;
                opt.innerHTML = itemClass.className;
                if(inventoryItem.itemClass.classId == itemClass.classId){
                    opt.selected = true;
                }
                dropDown.appendChild(opt);
            }    
        })

}

function recountInventory(){
    // logic to erase current DB and replace with scanned items
    document.getElementById("recountInventory").style.display = "none";
    recountInv = null
    document.getElementById('page-mask').style.position = "unset";
}

function popConfirmDeleteItem(barcode1){
    getBarcode(barcode1).then(
        data => {
            document.getElementById("deleteItem").style.display = "block";
            delItem = true
            document.getElementById('page-mask').style.position = "fixed";
            document.getElementById("removeItem").value = barcode1;
            document.getElementById("itemDisplay").innerHTML = data.brand + " " + data.name;
        })
}

//Deletes item
function deleteItem(barcode){
    console.log(barcode)
    document.getElementById("deleteItem").style.display = "none";
    deleteInventory(barcode)
    location.reload()
}

//On Submit of new item modal create new items
async function submitNewItem(){
    let newQuantity = document.getElementById("newItemQuantity").value;
    let barcode = document.getElementById("newItemBarcode").value;
    let itemName = document.getElementById("itemName").value;
    let itemBrand = document.getElementById("itemBrand").value;
    let itemType = document.getElementById("type").value;
    let itemURL = document.getElementById("productURL").value;
    let weight = parseFloat(document.getElementById("newItemWeight").value);
    let vegan = false;
    let vegetarian = false;
    let image = document.getElementById("prodImg").files[0];

    if (document.getElementById("vegetarian").value == "true") {
        vegetarian = true;
    }

    if (document.getElementById("vegan").value == "true") {
        vegan = true;
    }

    if (newQuantity == "" || barcode == "" || itemName == "" || itemBrand == "" || itemType == "" || itemURL == "" || image == null || weight == 0.0) {
        document.getElementById("NewwarningText").style.display = "block";
    }
    else {
        document.getElementById("newItem").style.display = "none";
        //Call API Endpoint
        await addToInventoryTable(barcode, newQuantity)
        await createItem(barcode, newQuantity, itemName, itemBrand, itemType, itemURL, vegetarian, vegan, image, weight)
        sleep(1000);
        await addImage(barcode,image)
        //See if image made it
        getBarcode(barcode).then(data=>{
            //If not retry the insert
            if (data === null) {
                addImage(barcode,image)
            }
        })
        location.reload()
    }
}

//Pops the edit item modal
function editItem(){
    let updateQuantity = parseInt(document.getElementById("newQuantity").value);
    let currBarcode = document.getElementById("newBarcode").value;
    let itemName = document.getElementById("newItemName").value;
    let itemBrand = document.getElementById("newItemBrand").value;
    let itemType = document.getElementById("newType").value;
    let itemURL = document.getElementById("newProductURL").value;
    let vegetarian = false;
    let vegan = false;
    let image = document.getElementById("editImg").files[0];
    let weight = parseFloat(document.getElementById("editItemWeight").value);
    let itemClass = document.getElementById("newItemClass").value

    document.getElementById("editItem").style.display = "none";
    document.getElementById('page-mask').style.position = "unset";

    if (document.getElementById("newVegetarian").value == "true") {
        vegetarian = true;
    }

    if (document.getElementById("newVegan").value == "true") {
        vegan = true;
    }

    updateInventory(currBarcode, updateQuantity)
    updateProduct(currBarcode, itemName, itemBrand, itemType, itemURL,vegetarian, vegan, weight)
    updateItemClass(currBarcode, itemClass)
    //Check to see if image is being updated
    if (image != undefined){
        deleteImage(currBarcode).then(()=>{
             sleep(600)
            addImage(currBarcode, image).then(r => console.log(r))
        })
    }
    /*
    if (updateQuantity === 0){
        //Delete
        // deleteInventory(currBarcode)

        // no longer deleting entire item, just set quantity to 0
        // NOTE: may be able to remove if statement
        updateInventory(currBarcode, updateQuantity)
        location.reload()
    }
    else{
        //Update
        updateInventory(currBarcode, updateQuantity)
        updateProduct(currBarcode, itemName, itemBrand, itemType, itemURL,vegetarian, vegan, weight)
        //Check to see if image is being updated
        if (image != undefined){
            deleteImage(currBarcode).then(()=>{
                sleep(600)
                addImage(currBarcode, image).then(r => console.log(r))
            })
        }
    }*/
}

//This function is used for exporting data in a table to CSV
function exportCSV(){
    JSONToCSVConvertor(InventoryData, "PantryInventory", true);
}

function popAddItemClass(){
    if(newItemClass === null){
        document.getElementById("itemClassModal").style.display = "block";
        newItemClass = true
        document.getElementById('page-mask').style.position = "fixed";
    } else {
        document.getElementById("itemClassModal").style.display = "none";
        newItemClass = null
        document.getElementById('page-mask').style.position = "unset";
    }
}

async function submitNewItemClass(){
    // GET FROM HTML: className, foodType, image
    let className = document.getElementById("className").value;
    let foodType = document.getElementById("classFoodType").value;
    let classImage = document.getElementById("classImg").files[0];

    // if empty vals
    if(className == "" || foodType == "" || classImage == null) {
        document.getElementById("NewwarningText").style.display = "block";
    }
    
    //POST to item class table
    let data = {'className':className, 'foodType':foodType}
    let formBody =[];
    for (let key in data){
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        formBody.push(encodedKey+"="+encodedValue);
    }
    formBody = formBody.join("&");

    await fetch(posturl + 'itemClass', {
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body: formBody
    })
        .then(status)
        .then(json)
        .then(function(data){
            console.log('Request Succeeded', data)
        })
        .catch(function(error){
            console.log('Request Failed', error)
        });

    //sleep(1000)
    
    //console.log(classObj);
    //alert("test");

    await addItemClassImage(className, classImage);

    location.reload();
    
    //console.log(classObj.classId);
}

// WORKS
async function getItemClassByName(className){
    let response = await fetch(url + "itemClass/"+className)
    try{
        return response.json();
    }catch{
        return "notFound";
    }
}

async function addItemClassImage(className, image){
    let classObj = await getItemClassByName(className);
    let id = classObj.classId; // add to url
    
    let prodFormBody = new FormData();
    prodFormBody.append('file',image)
    fetch(posturl + 'addClassImage/'+ id, {
        body: prodFormBody,
        enctype: "multipart/form-data",
        method:"PUT",
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

async function getAllItemClasses(){
    let response = await fetch(url + "itemClassAll");
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

async function updateItemClass(barcode, className){
    //Update inventory table
    let data = {'className':className}
    let formBody =[];
    for (let key in data){
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        formBody.push(encodedKey+"="+encodedValue);
    }
    formBody = formBody.join("&");
    fetch(posturl + 'updateItemClass/'+ barcode, {
        body: formBody,
        method:"PUT",
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

function classImageReadURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#classImgPreview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

function readUnknownURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#unknownItemImgPreview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

function readEditUrl(input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#editImgPreview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
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

//Pause function
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

loadEnv()



