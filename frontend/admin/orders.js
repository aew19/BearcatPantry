


$(function(){
    $("#navbar").load("NavBar.html");
});


function styleOrdersTable() {
    $('#orders_table').DataTable({
      "pageLength": 10,
      "lengthChange": true,
      "searching": true,
      "ordering": true,
      "info": false,
      "autoWidth": true,
      "order": [0, "desc"],
      "paging": true,
      "pagingType": "full_numbers",
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      language: {
        lengthMenu: "Display _MENU_ Orders Per Page",
        searchPlaceholder: "Search Orders",
        search: "",
      }
      });
}

async function getOrders(){
    let response = await fetch(url + "orders/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

async function getOrderItemsById(orderId){
    let response = await fetch(url + "orderItems/"+orderId)
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

async function getBarcode(barcode){
    let response = await fetch(url + "items/"+barcode)
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

async function createOrdersTable(){
    //get all the orders
    getOrders().then(orders=>{
        if (orders != "notFound"){
            //generate the table
            generateTable(orders).then(()=> styleOrdersTable())
        }
    })

}

function generateTable(orders) {
    console.log(orders)
    let loadPromise = function(resolve,reject) {
        const table = document.getElementById("currentOrders");
        for (let element of orders){
            let row = table.insertRow();
            //Date
            let cell = row.insertCell();
            let text = document.createTextNode(element.orderDate)
            cell.appendChild(text)
            //Name
            cell = row.insertCell();
            let name = element.fname + " " + element.lname;
            text = document.createTextNode(name)
            cell.appendChild(text)
            //Email
            cell = row.insertCell();
            text = document.createTextNode(element.email)
            cell.appendChild(text)
            //Type
            cell = row.insertCell();
            //True means delivery
            if (element.delOrPickUp === true){
                cell.innerHTML = "<input type=\"button\" class=\"btn btn-yellow\" value=\"Delivery\">";
            } else{
                cell.innerHTML = "<input type=\"button\" class=\"btn btn-orange\" value=\"Pick-Up\">";
            }
            //Address
            cell = row.insertCell();
            //TODO format for address 2
            text = document.createTextNode(element.address)
            cell.appendChild(text)
            //Date & Time
            cell = row.insertCell();
            let dateTime = element.delDate + " " + element.deliveryTime
            text = document.createTextNode(dateTime)
            cell.appendChild(text)
            //Items
            //TODO hit orderItems API endpoint
            cell = row.insertCell();
            cell.innerHTML = "<input type=\"button\" class=\"btn btn-red\" value=\"See Items\" id=\"ItemBtn\" onclick = \"popViewTransaction("+element.orderId+")\">";
            //Status
            cell = row.insertCell();
            cell.innerHTML = "<input type=\"button\" class=\"btn btn-green\" value=\"Confirm\" id=\"ConfirmBtn\" onclick = \"popViewTransaction("+element.orderId+")\"><input type=\"button\" class=\"btn btn-reject\" value=\"Decline\" id=\"DenyBtn\" onclick = \"popViewTransaction("+element.orderId+")\">";
        }
        resolve("Success")
    }
    return new Promise(loadPromise);
}

function popViewTransaction(orderId){
    document.getElementById("viewOrder").style.display = "block";
    document.getElementById('page-mask').style.position = "fixed";
    const table = document.getElementById("orderItemsTable");
    //Clear old rows from different order
    let rowCount = table.rows.length;
    for (let i = 1; i < rowCount; i++) {
        table.deleteRow(1);
    }
    //Get order items
    getOrderItemsById(orderId).then(items =>{
        for (let item of items){
            //get item name and brand
            getBarcode(item.barcodeId).then(data =>{
                let row = table.insertRow();
                //name
                let cell = row.insertCell();
                let text = document.createTextNode(data.name);
                cell.appendChild(text);
                //brand
                cell = row.insertCell();
                text = document.createTextNode(data.brand);
                cell.appendChild(text);
                //quantity Button
                cell = row.insertCell();
                text = document.createTextNode(item.itemQuantity);
                cell.appendChild(text);
            })

        }
    })

}

function showNavBar() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}

// needs updated to new export
function exportCSV(elem){
    var table = document.getElementById("orders_table");
    var html = table.outerHTML;
    var url = 'data:application/vnd.ms-excel,' + escape(html); // Set your html table into url 
    elem.setAttribute("href", url);
    elem.setAttribute("download", "pantryorders.xls"); // Choose the file name
    return false;
}
function closePopup(element){
    document.getElementById(element).style.display = "none";
    document.getElementById('page-mask').style.position = "unset";
}

fetch("../environment.json").then(response=>response.json())
    .then(json=>{
        env=json.env
        if (env === "dev"){
            url = "http://localhost:8080/"
            posturl = 'http://localhost:8080/'
        }else{
            //https does not work because SSL cert. Changing to http
            url = "http://bearcatspantry.uc.edu:8080/web-services/"
            posturl = 'http://bearcatspantry.uc.edu:8080/web-services/'
        }
        createOrdersTable()
    })
    .catch(err => console.log("Error reading Environment"))