


$(function(){
    $("#navbar").load("NavBar.html");
});

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
            makeInventoryTable(orders);
        }
    })
}

google.charts.load('current', {'packages':['table']});
function makeInventoryTable(OrdersData) {
    var OrdersTable = new google.visualization.DataTable();
    OrdersTable.addColumn('string','Order Date');
    OrdersTable.addColumn('string','Name');
    OrdersTable.addColumn('string','Email');
    OrdersTable.addColumn('string','Type');
    OrdersTable.addColumn('string','Address');
    OrdersTable.addColumn('string','Date & Time');
    OrdersTable.addColumn('string','Items');
    OrdersTable.addColumn('string','Status');

    OrdersTable.addRows(OrdersData.length);
    var counter = 0;
    for (let element of OrdersData) {
        OrdersTable.setValue(counter, 0, element.orderDate);
        OrdersTable.setValue(counter, 1, element.fname + " " + element.lname);
        OrdersTable.setValue(counter, 2, element.email);
        if (element.delOrPickUp === true){
            OrdersTable.setValue(counter, 3, "<input type=\"button\" class=\"btn btn-yellow\" value=\"Delivery\">");
        } else{
            OrdersTable.setValue(counter, 3, "<input type=\"button\" class=\"btn btn-orange\" value=\"Pick-Up\">");
        }
        OrdersTable.setValue(counter, 4, element.address);
        OrdersTable.setValue(counter, 5, element.delDate + " " + element.deliveryTime);
        OrdersTable.setValue(counter, 6, "<input type=\"button\" class=\"btn btn-red\" value=\"See Items\" id=\"ItemBtn\" onclick = \"popViewTransaction("+element.orderId+")\">");
        OrdersTable.setValue(counter, 7, "<input type=\"button\" class=\"btn btn-green\" value=\"Confirm\" id=\"ConfirmBtn\" onclick = \"popViewTransaction("+element.orderId+")\"><input type=\"button\" class=\"btn btn-reject\" value=\"Decline\" id=\"DenyBtn\" onclick = \"popViewTransaction("+element.orderId+")\">");
        counter++;
    }

    var table = new google.visualization.Table(document.getElementById('orders_table'));

    var cssClassNames = {
        'headerRow': 'table',
        'tableRow': 'table',
        'oddTableRow': 'table'
    };

    table.draw(OrdersTable, {width: '100%', height: '100%', allowHtml:true, sortColumn:0, page:'enable', pageSize: 10, pagingButtons:'both', 'cssClassNames': cssClassNames});
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

function closePopup(element){
    document.getElementById(element).style.display = "none";
    document.getElementById('page-mask').style.position = "unset";
    document.getElementById('page-mask').style.backgroundColor = "unset";
}

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
        }
        google.charts.setOnLoadCallback(function() {
            createOrdersTable();
        });
    })
    .catch(err => console.log("Error reading Environment"))