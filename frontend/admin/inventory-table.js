//API Function to get
async function getInventory(){
    let response = await fetch("http://localhost:8080/inventoryTable/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}


function createTableStyle() {
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
}

function generateTableHead() {
    const table = document.getElementById("inventory_table")
    let thead = table.createTHead();
    let row = thead.insertRow();

    let th = document.createElement("th");
    let text = document.createTextNode("Item");
    th.appendChild(text);
    row.appendChild(th);
    th = document.createElement("th");
    text = document.createTextNode("Quantity");
    th.appendChild(text);
    row.appendChild(th);

}

function generateTable(data) {
    generateTableHead()
    const table = document.getElementById("inventory_table")
    for (let element of data) {
        let row = table.insertRow();
        //name
        let cell = row.insertCell();
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
    }

}

function createInventoryTable(){
    getInventory().then(
        data => {
            if (data != "notFound") {
                generateTable(data)
            }

        }
    )
    createTableStyle()
}



createInventoryTable();
