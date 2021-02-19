//REPLACE ALL LOCALHOST:8080 WITH
//bcpwb1prd01l.ad.uc.edu:8080/web-services
//CHECK to see if you can hit the bcpwb and if not default back to localhost:8080
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
    fetch('http://localhost:8080/updateInventory/'+ barcode1, {
        body: formBody,
        method:"PUT",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    }).then(response => response.json())
        .then(data=> {console.log('Success');})
        .catch((error)=>{ console.error('Error:', error);});
}

//Update product table
function updateProduct(barcode, itemName, brand, type, url, isVegetarian, isVegan){
    let data = {'productTitle':itemName, 'brand':brand,'foodType':type, 'productURL':url, 'vegetarian':isVegetarian, 'vegan':isVegan}
    let formBody =[];
    for (let key in data){
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        formBody.push(encodedKey+"="+encodedValue);
    }
    formBody = formBody.join("&");
    fetch('http://localhost:8080/items/'+ barcode, {
        body: formBody,
        method:"PUT",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    }).then(response => response.json())
        .then(data=> {console.log('Success');})
        .catch((error)=>{ console.error('Error:', error);});
}

//Delete item from inventory
function deleteInventory(barcode){
    fetch('http://localhost:8080/deleteInventory/'+ barcode, {
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
    let response = fetch('http://localhost:8080/inventory', {
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: formBody
    })
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
async function createItem(barcode, quantity, itemName, brand, type, url, isVegetarian, isVegan, formData){
    //POST to product table
    let prodData = {'barcodeId':barcode,'productTitle':itemName, 'foodType':type, 'brand':brand, 'productURL':url, 'vegetarian':isVegetarian, 'vegan':isVegan}
    let prodFormBody =[];
    for (let prodKey in prodData){
        let encodedProdKey = encodeURIComponent(prodKey);
        let encodedProdValue = encodeURIComponent(prodData[prodKey]);
        prodFormBody.push(encodedProdKey+"="+encodedProdValue);
    }
    prodFormBody = prodFormBody.join("&");
    let response = fetch('http://localhost:8080/items', {
        body: prodFormBody,
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    })





}

async function addImage(barcode, image){
    let response = fetch('http://localhost:8080/addImage/'+barcode, {
        body: image,
        method:"PUT",
    })
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
    let barcode = document.getElementById("itemBarcode").value;
    let quantity = document.getElementById("quantity").value;
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


//The function can be used universally to close any popup
function closePopup(element){
    document.getElementById(element).style.display = "none";
    location.reload()
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

function popEditItem(barcode1, quantity){
    getBarcode(barcode1).then(
        data => {
            document.getElementById("editItem").style.display = "block";
            document.getElementById("newType").value = data.type;
            document.getElementById("newBarcode").value = data.barcode;
            document.getElementById("newItemName").value = data.name;
            document.getElementById("newQuantity").value = quantity;
            document.getElementById("newItemBrand").value = data.brand;
            document.getElementById("newProductURL").value = data.productURL;
            if (data.vegetarian === true){
                document.getElementById("newVegetarian").checked = true
            }
            if (data.vegan === true){
                document.getElementById("newVegan").checked = true
            }
        })

}

function recountInventory(){
    // logic to erase current DB and replace with scanned items
    document.getElementById("recountInventory").style.display = "none";
    recountInv = null
    document.getElementById('page-mask').style.position = "unset";
}

function popConfirmDeleteItem(){
    document.getElementById("deleteItem").style.display = "block";
    delItem = true
    document.getElementById('page-mask').style.position = "fixed";
}

//On Submit of new item modal create new items
async function submitNewItem(){
    let newQuantity = document.getElementById("newItemQuantity").value;
    let barcode = document.getElementById("newItemBarcode").value;
    let itemName = document.getElementById("itemName").value;
    let itemBrand = document.getElementById("itemBrand").value;
    let itemType = document.getElementById("type").value;
    let itemURL = document.getElementById("productURL").value;
    let vegan = document.getElementById("vegan").checked;
    let vegetarian = document.getElementById("vegetarian").checked;
    let image = document.getElementById("prodImg").files[0];

    let formData = new FormData()
    formData.append('image', image)

    document.getElementById("newItem").style.display = "none";
    //Call API Endpoint
    await addToInventoryTable(barcode, newQuantity)
    await createItem(barcode, newQuantity, itemName, itemBrand, itemType, itemURL, vegetarian, vegan, formData)
    await addImage(barcode,formData)
    location.reload()


}

function editItem(){
    let updateQuantity = parseInt(document.getElementById("newQuantity").value);
    let currBarcode = document.getElementById("newBarcode").value;
    let itemName = document.getElementById("newItemName").value;
    let itemBrand = document.getElementById("newItemBrand").value;
    let itemType = document.getElementById("newType").value;
    let itemURL = document.getElementById("newProductURL").value;
    let vegetarian = document.getElementById("newVegetarian").checked;
    let vegan = document.getElementById("newVegan").checked;
    document.getElementById("editItem").style.display = "none";
    if (updateQuantity === 0){
        //Delete
        deleteInventory(currBarcode)
        location.reload()
    }
    else{
        //Update
        updateInventory(currBarcode, updateQuantity)
        updateProduct(currBarcode, itemName, itemBrand, itemType, itemURL,vegetarian, vegan)
        location.reload()
    }
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
            let currentElement = JSON.stringify(element.barcodeId)
            //let currentQuantity = JSON.stringify(element.quantity)

            let row = table.insertRow();
            //select
            let cell = row.insertCell();
            cell.innerHTML = "<button style=\"font-size:1.5rem;color:#e00122;display:inline-block;width:50%; background: none; border: none; outline: none;\" id=\"EditBtn\" onclick =popEditItem("+currentElement+","+element.quantity+")><i class='fas fa-edit'></i></button>";
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

createInventoryTable()
// loadBulkScan(bulkitems);
