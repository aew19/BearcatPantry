let transactions = [
    { Date: "11/03/2020", Name: "Karl Dierking", Items: ""},
    { Date: "11/03/2020", Name: "Jake van Meter", Items: ""},
    { Date: "11/02/2020", Name: "Daniel Cummins", Items: ""},
    { Date: "11/02/2020", Name: "Isaiah Corso-Phinney", Items: ""},
    { Date: "11/01/2020", Name: "Logan Lindsay", Items: ""},
    { Date: "11/01/2020", Name: "Sivani Alla", Items: ""},
    { Date: "10/29/2020", Name: "Teja Bollimunta", Items: ""},
    { Date: "10/29/2020", Name: "Connor Herbert", Items: ""},
    { Date: "10/27/2020", Name: "Isaac Smitherman", Items: ""},
    { Date: "10/27/2020", Name: "Joshua St. Pierre", Items: ""}
];

$(function () {
    $('#transactions_table').DataTable({
      "pageLength": 3,
      "paging": false,
      "lengthChange": true,
      "searching": false,
      "ordering": true,
      "info": false,
      "autoWidth": true,
      "order": [0, "desc"]
      });
});

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
            cell.appendChild(text);
        }
    }
}

let transactions_table = document.getElementById('transactions_table');
let transactions_data = Object.keys(transactions[0]);
generateTable(transactions_table, transactions);
generateTableHead(transactions_table, transactions_data);