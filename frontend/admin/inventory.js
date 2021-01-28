//Environment
//url = "http://localhost:8080"
url = "http://bcpwb1prd01l.ad.uc.edu:8080/web-services"

//This function just loads the navbar onto the page
$(function(){
    $("#navBarAdmin").load("navBarAdmin.html");
});
$(function(){
    $("#scanMultipleItemsModal").load("scanMultipleItemsModal.html");
});
//Modal Pop variables
var newItem = null
var scanItem = null
var scanmulti = null

//API FUNCTIONS
//JOIN table for the inventory
async function getInventory(){
    let response = await fetch(url + "/inventoryTable/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//If barcode is found we will update the quantity value
function updateInventory(barcode, quantity){
    //Update inventory table
    //POST to inventory table
    let data = {'quantity':parseInt(quantity)}
    let formBody =[];
    for (let key in data){
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        formBody.push(encodedKey+"="+encodedValue);
    }
    formBody = formBody.join("&");
    fetch(url + "/updateInventory/"+ barcode, {
        body: formBody,
        method:"PUT",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    }).then(response => response.json())
        .then(data=> {console.log('Success');})
        .catch((error)=>{ console.error('Error:', error);});
}
//Calls barcode api endpoint
async function getBarcode(barcode){
    let response = await fetch(url + "/items/"+barcode)
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}
//Add new item to database
//TODO add image
async function createItem(barcode, quantity, itemName, brand, type, url, isVegetarian, isVegan){
    if (isVegetarian === 'on'){
        isVegetarian = 1;
    }else{
        isVegetarian = 0;
    }
    if (isVegan === 'on'){
        isVegan = 1;
    }else{
        isVegan = 0;
    }
    //POST to inventory table
    let data = {'barcodeId':barcode, 'quantity':parseInt(quantity), 'location':""}
    let formBody =[];
    for (let key in data){
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        formBody.push(encodedKey+"="+encodedValue);
    }
    formBody = formBody.join("&");
    fetch(url + "/inventory", {
        body: formBody,
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    }).then(response => response.json())
        .then(data=> {console.log('Success');})
        .catch((error)=>{ console.error('Error:', error);});

    //POST to product table
    let prodData = {'barcodeId':barcode,'productTitle':itemName, 'foodType':type, 'brand':brand,'vegetarian':isVegetarian, 'vegan':isVegan,'productURL':url,'isActive':1}
    let prodFormBody =[];
    for (let prodKey in prodData){
        let encodedProdKey = encodeURIComponent(prodKey);
        let encodedProdValue = encodeURIComponent(prodData[prodKey]);
        prodFormBody.push(encodedProdKey+"="+encodedProdValue);
    }
    prodFormBody = prodFormBody.join("&");
    fetch(url +'/items', {
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
    var barcode = document.getElementById("itemBarcode").value;
    console.log(barcode);
    var quantity = document.getElementById("itemQuantity").value;
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
                            }
                        })
                    }
                )
            } else{
                document.getElementById("newItem").style.display = "block";
                var el_barcode = document.getElementById("newItemBarcode");
                el_barcode.value = barcode;
                var el_quantity = document.getElementById("newItemQuantity");
                el_quantity.value = quantity;
            }

        }
    );
}

//The function can be used universally to close any popup
function closePopup(element){
    document.getElementById(element).style.display = "none";
}



//This function pops the scan item modal
function popScan(){
    let request = new XMLHttpRequest();
    if(scanItem === null){
        document.getElementById("scanItem").style.display = "block";
        var el_barcode = document.getElementById("itemBarcode")
        el_barcode.value = null
        var el_quantity = document.getElementById("itemQuantity")
        el_quantity.value = null
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
        scanmulti = true
    } else {
        document.getElementById("multipleItems").style.display = "none";
        scanmulti = null
    }
}

//On Submit of new item modal create new items
async function submitNewItem(){
    var barcode = document.getElementById("newItemBarcode").value;
    var quantity = document.getElementById("newItemQuantity").value;
    var itemName = document.getElementById("itemName").value;
    var itemBrand = document.getElementById("itemBrand").value;
    var itemType = document.getElementById("type").value;
    var itemURL = document.getElementById("url").value;
    var vegan = document.getElementById("vegetarian").value;
    var vegetarian = document.getElementById("vegan").value;
    document.getElementById("newItem").style.display = "none";
    //Call API Endpoint
    await createItem(barcode, quantity, itemName, itemBrand, itemType, itemURL, vegetarian, vegan)

}

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
            console.log(element)
            let row = table.insertRow();

            //name
            let cell = row.insertCell();
            let text = document.createTextNode(element.productTitle);
            cell.appendChild(text);

            //quantity
            cell = row.insertCell();
            text = document.createTextNode(element.quantity);
            cell.style.fontWeight = 700;
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




//Dummy Data
//DELETE ONCE FULLY ON DATABASE
// const items = [
//     {name: "Pasta", quantity: 10, type:"Grains", brand: "Kroger", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"11/09/2020"},
//     {name: "Tomatos", quantity: 20, type:"Vegetable", brand: "Walmart", vegan: 1, vegetarian:0, bestBuy:"11/10/2020", expiration:"11/10/2020"},
//     {name: "Pasta Sauce", quantity: 5, type:"Grains", brand: "Meijer", vegan: 0, vegetarian:0, bestBuy:"11/09/2020", expiration:"1/20/2020"},
//     {name: "Tomato Paste", quantity: 8, type:"Vegetable", brand: "Walmart", vegan: 1, vegetarian:0, bestBuy:"11/10/2020", expiration:"12/11/2020"},
//     {name: "Mushrooms", quantity: 7, type:"Grains", brand: "Target", vegan: 0, vegetarian:0, bestBuy:"11/09/2020", expiration:"8/15/2020"},
//     {name: "Eggs", quantity: 12, type:"Vegetable", brand: "Meijer", vegan: 0, vegetarian:1, bestBuy:"11/10/2020", expiration:"12/10/2022"},
//     {name: "Milk", quantity: 16, type:"Grains", brand: "Target", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"7/19/2020"},
//     {name: "Corn", quantity: 20, type:"Vegetable", brand: "Walmart", vegan: 1, vegetarian:1, bestBuy:"11/10/2020", expiration:"11/10/2021"},
//     {name: "Black Beans", quantity: 15, type:"Grains", brand: "Kroger", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"6/29/2020"},
//     {name: "Green Beans", quantity: 24, type:"Vegetable", brand: "Kroger", vegan: 1, vegetarian:1, bestBuy:"11/10/2020", expiration:"11/10/2022"},
//     {name: "Oranges", quantity: 15, type:"Grains", brand: "Walmart", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"6/29/2020"},
//     {name: "Peaches", quantity: 24, type:"Vegetable", brand: "Meijer", vegan: 1, vegetarian:1, bestBuy:"11/10/2020", expiration:"11/10/2022"},
//     {name: "Pears", quantity: 15, type:"Grains", brand: "Kroger", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"6/29/2020"},
//     {name: "Apples", quantity: 24, type:"Vegetable", brand: "Walmart", vegan: 1, vegetarian:1, bestBuy:"11/10/2020", expiration:"11/10/2022"},
//     {name: "Pasta", quantity: 10, type:"Grains", brand: "Kroger", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"11/09/2020"},
//     {name: "Tomatos", quantity: 20, type:"Vegetable", brand: "Walmart", vegan: 1, vegetarian:0, bestBuy:"11/10/2020", expiration:"11/10/2020"},
//     {name: "Pasta Sauce", quantity: 5, type:"Grains", brand: "Meijer", vegan: 0, vegetarian:0, bestBuy:"11/09/2020", expiration:"1/20/2020"},
//     {name: "Tomato Paste", quantity: 8, type:"Vegetable", brand: "Walmart", vegan: 1, vegetarian:0, bestBuy:"11/10/2020", expiration:"12/11/2020"},
//     {name: "Mushrooms", quantity: 7, type:"Grains", brand: "Target", vegan: 0, vegetarian:0, bestBuy:"11/09/2020", expiration:"8/15/2020"},
//     {name: "Eggs", quantity: 12, type:"Vegetable", brand: "Meijer", vegan: 0, vegetarian:1, bestBuy:"11/10/2020", expiration:"12/10/2022"},
//     {name: "Milk", quantity: 16, type:"Grains", brand: "Target", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"7/19/2020"},
//     {name: "Corn", quantity: 20, type:"Vegetable", brand: "Walmart", vegan: 1, vegetarian:1, bestBuy:"11/10/2020", expiration:"11/10/2021"},
//     {name: "Black Beans", quantity: 15, type:"Grains", brand: "Kroger", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"6/29/2020"},
//     {name: "Green Beans", quantity: 24, type:"Vegetable", brand: "Kroger", vegan: 1, vegetarian:1, bestBuy:"11/10/2020", expiration:"11/10/2022"},
//     {name: "Oranges", quantity: 15, type:"Grains", brand: "Walmart", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"6/29/2020"},
//     {name: "Peaches", quantity: 24, type:"Vegetable", brand: "Meijer", vegan: 1, vegetarian:1, bestBuy:"11/10/2020", expiration:"11/10/2022"},
//     {name: "Pears", quantity: 15, type:"Grains", brand: "Kroger", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"6/29/2020"},
//     {name: "Apples", quantity: 24, type:"Vegetable", brand: "Walmart", vegan: 1, vegetarian:1, bestBuy:"11/10/2020", expiration:"11/10/2022"},
//     {name: "Pasta", quantity: 10, type:"Grains", brand: "Kroger", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"11/09/2020"},
//     {name: "Tomatos", quantity: 20, type:"Vegetable", brand: "Walmart", vegan: 1, vegetarian:0, bestBuy:"11/10/2020", expiration:"11/10/2020"},
//     {name: "Pasta Sauce", quantity: 5, type:"Grains", brand: "Meijer", vegan: 0, vegetarian:0, bestBuy:"11/09/2020", expiration:"1/20/2020"},
//     {name: "Tomato Paste", quantity: 8, type:"Vegetable", brand: "Walmart", vegan: 1, vegetarian:0, bestBuy:"11/10/2020", expiration:"12/11/2020"},
//     {name: "Mushrooms", quantity: 7, type:"Grains", brand: "Target", vegan: 0, vegetarian:0, bestBuy:"11/09/2020", expiration:"8/15/2020"},
//     {name: "Eggs", quantity: 12, type:"Vegetable", brand: "Meijer", vegan: 0, vegetarian:1, bestBuy:"11/10/2020", expiration:"12/10/2022"},
//     {name: "Milk", quantity: 16, type:"Grains", brand: "Target", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"7/19/2020"},
//     {name: "Corn", quantity: 20, type:"Vegetable", brand: "Walmart", vegan: 1, vegetarian:1, bestBuy:"11/10/2020", expiration:"11/10/2021"},
//     {name: "Black Beans", quantity: 15, type:"Grains", brand: "Kroger", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"6/29/2020"},
//     {name: "Green Beans", quantity: 24, type:"Vegetable", brand: "Kroger", vegan: 1, vegetarian:1, bestBuy:"11/10/2020", expiration:"11/10/2022"},
//     {name: "Oranges", quantity: 15, type:"Grains", brand: "Walmart", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"6/29/2020"},
//     {name: "Peaches", quantity: 24, type:"Vegetable", brand: "Meijer", vegan: 1, vegetarian:1, bestBuy:"11/10/2020", expiration:"11/10/2022"},
//     {name: "Pears", quantity: 15, type:"Grains", brand: "Kroger", vegan: 0, vegetarian:1, bestBuy:"11/09/2020", expiration:"6/29/2020"},
//     {name: "Apples", quantity: 24, type:"Vegetable", brand: "Walmart", vegan: 1, vegetarian:1, bestBuy:"11/10/2020", expiration:"11/10/2022"}
// ];
// loadPantryItems(items);
