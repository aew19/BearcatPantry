//This function is used for the formatting of the table
//Right now searching and ordering is on
function createInventoryTableStyle() {
    $('#inventory_table').DataTable({
        "pageLength": 3,
        "lengthChange": true,
        "searching": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "paging": false,
        "pagingType": "full_numbers",
        "lengthMenu": [[15, 25, 50, -1], [15, 25, 50, "All"]],
        language: {
            lengthMenu: "Display _MENU_ Items Per Page",
            searchPlaceholder: "Search Items",
            search: "",
        },
    });
}

//API Function to get Inventory Table
async function getInventory(){
    let response = await fetch("http://localhost:8080/inventoryTable/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

function generateInventoryTableHead(data) {
    const table = document.getElementById('inventory_table');

    let thead = table.createTHead();
    let row = thead.insertRow();
    let th = document.createElement("th");
    let text;
    
    if (data.productTitle) {
        text = document.createTextNode("Product Name");
        th.appendChild(text);
        row.appendChild(th);
    }

    th = document.createElement("th");
    if (data.quantity) {
        text = document.createTextNode("Quantity");
        th.appendChild(text);
        row.appendChild(th);
    }

    createInventoryTableStyle();
}

function loadInventoryTable(items){
    let loadPromise = function(resolve,reject) {
        const table = document.getElementById('inventory_table');
        for (let element of items) {
            let row = table.insertRow();

            //product name
            cell = row.insertCell();
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
        }
        resolve(items[0]);
    }
    return new Promise(loadPromise);
}

async function createInventoryTable(){
    getInventory().then(
        data => {
            if (data != "notFound") {
                loadInventoryTable(data).then(result => generateInventoryTableHead(result));
            }

        }
    )
}

createInventoryTable();
