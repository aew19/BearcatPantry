let transactions = [
    { Date: "11/03/2020", Name: "Karl Dierking", Items: "", Status: 3 },
    { Date: "11/03/2020", Name: "Jake van Meter", Items: "", Status: 3 },
    { Date: "11/02/2020", Name: "Daniel Cummins", Items: "", Status: 3 },
    { Date: "11/02/2020", Name: "Isaiah Corso-Phinney", Items: "", Status: 2 },
    { Date: "11/01/2020", Name: "Logan Lindsay", Items: "", Status: 3 },
    { Date: "11/01/2020", Name: "Sivani Alla", Items: "", Status: 2 },
    { Date: "10/29/2020", Name: "Teja Bollimunta", Items: "", Status: 2 },
    { Date: "10/29/2020", Name: "Connor Herbert", Items: "", Status: 2 },
    { Date: "10/27/2020", Name: "Isaac Smitherman", Items: "", Status: 3 },
    { Date: "10/27/2020", Name: "Joshua St. Pierre", Items: "", Status: 3 }
];

//This function is used for the formatting of the table
//Right now searching and ordering is on
function createOrdersTableStyle() {
    $('#transactions_table').DataTable({
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

function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of transactions_data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, transactions_data) {
    var counter = 0;
    for (let element of transactions_data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            if (element[key] == "") {
                cell.innerHTML = "<input type=\"button\" class=\"btn btn-red\" value=\"See Items\" id=\"Btn"+counter+"\" onclick = \"popViewTransaction(this.id)\">";
                counter++;
            }
            else if (element[key] == 3) {
                cell.innerHTML = "<input type=\"button\" class=\"btn btn-yellow\" value=\"Ready for Delivery\">";
            }
            else if (element[key] == 2) {
                cell.innerHTML = "<input type=\"button\" class=\"btn btn-orange\" value=\"Ready for Pick-Up\">";
            }
            else{
                cell.appendChild(text);
            }        
        }
    }
}

//API Call to get student visits data
async function getStudentVisits(){
    let response = await fetch("http://localhost:8080/orders/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//API Call to get orders data
async function getOrders(){
    let response = await fetch("http://localhost:8080/orders/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

let transactions_table = document.getElementById('transactions_table');
let transactions_data = Object.keys(transactions[0]);
generateTable(transactions_table, transactions);
generateTableHead(transactions_table, transactions_data);
createOrdersTableStyle();