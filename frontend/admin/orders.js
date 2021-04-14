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

async function emailStudentCall(){
    let response = await fetch(url + "emailStudent/")
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
            makeFullOrdersTable(orders);
        }
    })
}

google.charts.load('current', {'packages':['table']});
function makeFullOrdersTable(OrdersData) {
    var OrdersTable = new google.visualization.DataTable();
    OrdersTable.addColumn('string','Order Date');
    OrdersTable.addColumn('string','Name');
    OrdersTable.addColumn('string','Email');
    OrdersTable.addColumn('string','Type');
    OrdersTable.addColumn('string','Address');
    OrdersTable.addColumn('string','Date & Time');
    OrdersTable.addColumn('string','Items');
    OrdersTable.addColumn('string','Status');
    OrdersTable.addColumn('string','');

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
        OrdersTable.setValue(counter, 4, element.address + "\n" + element.address2);
        OrdersTable.setValue(counter, 5, element.delDate + ", " + element.deliveryTime);

        OrdersTable.setValue(counter, 6, "<input type=\"button\" class=\"btn btn-red\" value=\"See Items\" id=\"ItemBtn\" onclick = \"popViewTransaction("+element.orderId+")\">");
        if (element.orderStatus === 0){
            OrdersTable.setValue(counter, 7, "Pending")
            OrdersTable.setValue(counter, 8, "<input type=\"button\" class=\"btn btn-green\" value=\"Confirm\" id=\"ConfirmBtn\" onclick = \"changeOrderStatusInProgress("+element.orderId+")\"><input type=\"button\" class=\"btn btn-reject\" value=\"Decline\" id=\"DenyBtn\" onclick = \"deleteOrder("+element.orderId+")\">");
        }else if(element.orderStatus === 1){
            OrdersTable.setValue(counter, 7, "In Progress")
            OrdersTable.setValue(counter, 8, "<input type=\"button\" class=\"btn btn-green\" value=\"Complete\" id=\"ConfirmBtn\" onclick = \"changeOrderStatusCompleted("+element.orderId+")\"><input type=\"button\" class=\"btn btn-email-student\" value=\"Email Student\" id=\"EmailStudentBtn\" onclick = \"emailStudent("+element.orderId+")\"><input type=\"button\" class=\"btn btn-reject\" value=\"Cancel\" id=\"DenyBtn\" onclick = \"deleteOrder("+element.orderId+")\">");
        }else if (element.orderStatus === 2){
            OrdersTable.setValue(counter, 7, "Complete")
        }else{
            OrdersTable.setValue(counter, 7, "In Error")
        }

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
                //quantity
                cell = row.insertCell();
                text = document.createTextNode(item.itemQuantity);
                cell.appendChild(text);
            })

        }
    })

}

function changeOrderStatusInProgress(orderId){
    //Update order status
    let data = {'newStatus':1}
    let formBody =[];
    for (let key in data){
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        formBody.push(encodedKey+"="+encodedValue);
    }
    formBody = formBody.join("&");
    fetch(posturl + 'orders/'+ orderId, {
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
    location.reload()
}

function changeOrderStatusCompleted(orderId){
    //Update order status
    let data = {'newStatus':2}
    let formBody =[];
    for (let key in data){
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(data[key]);
        formBody.push(encodedKey+"="+encodedValue);
    }
    formBody = formBody.join("&");
    fetch(posturl + 'orders/'+ orderId, {
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
    location.reload()
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

function deleteOrder(orderId){
    fetch(posturl+'orders/'+ orderId, {
        method:"DELETE",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    }).then(response => console.log(response.json()));
    location.reload()
}
function emailStudent(orderId){
    emailStudentCall().then(
        alert("Student has been notified!")
    );
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