let inventory = [
    { Item: "Pasta", Quantity: 12},
    { Item: "Corn", Stock: 12},
    { Item: "Carrots", Stock: 12},
    { Item: "Toilet Paper", Stock: 12},
    { Item: "Black Beans", Stock: 12},
    { Item: "Green Beans", Stock: 12},
    { Item: "Chicken Noodle Soup", Stock: 32},
    { Item: "Pinto Beans", Stock: 54},
    { Item: "Macaroni", Stock: 60},
    { Item: "Pasta", Stock: 61}
];

//API Function to get
async function getInventory(){
    let response = await fetch("http://localhost:8080/inventoryTable/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}


$(function () {
    $('#inventory_table').DataTable({
      "pageLength": 3,
      "paging": false,
      "lengthChange": true,
      "searching": false,
      "ordering": true,
      "info": false,
      "autoWidth": true,
      "order": ["desc"]
      });
});

function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of inventory_data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, inventory_data) {
    for (let element of inventory_data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.style.fontWeight = 700;
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

let inventory_table = document.getElementById('inventory_table');
let inventory_data = Object.keys(inventory[0]);
generateTable(inventory_table, inventory);
generateTableHead(inventory_table, inventory_data);