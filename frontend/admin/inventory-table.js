let inventory = [
    { Item: "Pasta", Stock: 12},
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

$(function () {
    $('#inventory_table').DataTable({
      "pageLength": 3,
      "paging": false,
      "lengthChange": true,
      "searching": false,
      "ordering": true,
      "info": false,
      "autoWidth": true
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
            // Need to figure out how to add buttons here
            cell.appendChild(text);
        }
    }
}

let inventory_table = document.getElementById('inventory_table');
let inventory_data = Object.keys(inventory[0]);
generateTable(inventory_table, inventory);
generateTableHead(inventory_table, inventory_data);