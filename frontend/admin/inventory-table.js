//API Function to get Inventory Table
async function getInventory(){
    let response = await fetch(url+"/inventoryTable/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

google.charts.load('current', {'packages':['table']});
function makeInventoryTable(inventoryData) {
    var InventoryTable = new google.visualization.DataTable();
    InventoryTable.addColumn('string','Product Name');
    InventoryTable.addColumn('number','Quantity');

    InventoryTable.addRows(inventoryData.length);
    var counter = 0;
    for (let element of inventoryData) {
        InventoryTable.setValue(counter, 0, element.productTitle);
        InventoryTable.setValue(counter, 1, element.quantity);
        counter++;
    }
        
    var formatter = new google.visualization.ColorFormat();
    formatter.addRange(0, 15, '#fff', '#ff3823');
    formatter.addRange(15, 45, 'black', '#fefb64');
    formatter.addRange(45, 1000, '#fff', '#92d36e');
    formatter.format(InventoryTable, 1);

    var table = new google.visualization.Table(document.getElementById('inventory_table'));

    var cssClassNames = {
        'headerRow': 'table',
        'tableRow': 'table',
        'oddTableRow': 'table'
    };

    table.draw(InventoryTable, {width: '100%', height: '100%', allowHtml:true, sortColumn:1, 'cssClassNames': cssClassNames});
}

async function createInventoryTable(){
    getInventory().then(
        data => {
            if (data != "notFound") {
                makeInventoryTable(data);
            }
        }
    )
}

fetch("../environment.json").then(response=>response.json())
    .then(json=>{
        env=json.env
        if (env === "dev"){
            url = "http://localhost:8080/"
            posturl = 'http://localhost:8080/'
        }else{
            url = "https://bearcatspantry.uc.edu/web-services/"
            posturl = 'https://bearcatspantry.uc.edu/web-services/'
        }
        google.charts.setOnLoadCallback(function() {
            createInventoryTable()
        });

    })
    .catch(err => console.log("Error reading Environment"))
