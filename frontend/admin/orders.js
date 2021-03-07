let orders = [
    { Date: "11/04/2020", Name: "Karl Dierking", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Ashley Wilhelm", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Friday 2-4 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Daniel Cummins", Email: "lindsaln@mail.uc.edu",  Type: 3, Address: "2650 Campus Drive", DateTime: "Friday 2-4 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Isaiah Corso-Phinney", Email: "lindsaln@mail.uc.edu",  Type: 3, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Logan Lindsay", Email: "lindsaln@mail.uc.edu",  Type: 2, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Sivani Alla", Email: "lindsaln@mail.uc.edu",  Type: 3, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/03/2020", Name: "Teja Bollimunta", Email: "lindsaln@mail.uc.edu",  Type: 2, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/03/2020", Name: "Connor Herbert", Email: "lindsaln@mail.uc.edu",  Type: 3, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/03/2020", Name: "Isaac Smitherman", Email: "lindsaln@mail.uc.edu",  Type: 3, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/02/2020", Name: "Joshua St. Pierre", Email: "lindsaln@mail.uc.edu",  Type: 2, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/02/2020", Name: "Teja Bollimunta", Email: "lindsaln@mail.uc.edu",  Type: 2, Address: "2650 Campus Drive", DateTime: "Wednesday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/02/2020", Name: "Connor Herbert", Email: "lindsaln@mail.uc.edu",  Type: 2, Address: "2650 Campus Drive", DateTime: "Wednesday 8-12 pm", Items: "items", Status: "status"},
    { Date: "10/29/2020", Name: "Isaac Smitherman", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Tuesday 2-4 pm", Items: "items", Status: "status"},
    { Date: "10/28/2020", Name: "Joshua St. Pierre", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Tuesday 2-4 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Karl Dierking", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Jake van Meter", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Friday 2-4 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Daniel Cummins", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Friday 2-4 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Isaiah Corso-Phinney", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Logan Lindsay", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Sivani Alla", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/03/2020", Name: "Teja Bollimunta", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/03/2020", Name: "Connor Herbert", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/03/2020", Name: "Isaac Smitherman", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/02/2020", Name: "Joshua St. Pierre", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/02/2020", Name: "Teja Bollimunta", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Wednesday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/02/2020", Name: "Connor Herbert", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Wednesday 8-12 pm", Items: "items", Status: "status"},
    { Date: "10/29/2020", Name: "Isaac Smitherman", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Tuesday 2-4 pm", Items: "items", Status: "status"},
    { Date: "10/28/2020", Name: "Joshua St. Pierre", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Tuesday 2-4 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Karl Dierking", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Jake van Meter", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Friday 2-4 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Daniel Cummins", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Friday 2-4 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Isaiah Corso-Phinney", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Logan Lindsay", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Sivani Alla", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/03/2020", Name: "Teja Bollimunta", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/03/2020", Name: "Connor Herbert", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/03/2020", Name: "Isaac Smitherman", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/02/2020", Name: "Joshua St. Pierre", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/02/2020", Name: "Teja Bollimunta", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Wednesday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/02/2020", Name: "Connor Herbert", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Wednesday 8-12 pm", Items: "items", Status: "status"},
    { Date: "10/29/2020", Name: "Isaac Smitherman", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Tuesday 2-4 pm", Items: "items", Status: "status"},
    { Date: "10/28/2020", Name: "Joshua St. Pierre", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Tuesday 2-4 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Karl Dierking", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Jake van Meter", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Friday 2-4 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Daniel Cummins", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Friday 2-4 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Isaiah Corso-Phinney", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Logan Lindsay", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/04/2020", Name: "Sivani Alla", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/03/2020", Name: "Teja Bollimunta", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/03/2020", Name: "Connor Herbert", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/03/2020", Name: "Isaac Smitherman", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Monday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/02/2020", Name: "Joshua St. Pierre", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Thursday 4-6 pm", Items: "items", Status: "status"},
    { Date: "11/02/2020", Name: "Teja Bollimunta", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Wednesday 8-12 pm", Items: "items", Status: "status"},
    { Date: "11/02/2020", Name: "Connor Herbert", Email: "lindsaln@mail.uc.edu", Type: 2, Address: "2650 Campus Drive", DateTime: "Wednesday 8-12 pm", Items: "items", Status: "status"},
    { Date: "10/29/2020", Name: "Isaac Smitherman", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Tuesday 2-4 pm", Items: "items", Status: "status"},
    { Date: "10/28/2020", Name: "Joshua St. Pierre", Email: "lindsaln@mail.uc.edu", Type: 3, Address: "2650 Campus Drive", DateTime: "Tuesday 2-4 pm", Items: "items", Status: "status"}
]

$(function(){
    $("#navbar").load("NavBar.html");
});

$(function () {
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
});

function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of orders_data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, orders_data) {
    var counter = 0;
    for (let element of orders_data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            if (element[key] == "items") {
                cell.innerHTML = "<input type=\"button\" class=\"btn btn-red\" value=\"See Items\" id=\"ItemBtn"+counter+"\" onclick = \"popViewTransaction(this.id)\">";
            }
            else if (element[key] == "status") {
                cell.innerHTML = "<input type=\"button\" class=\"btn btn-green\" value=\"Confirm\" id=\"ConfirmBtn"+counter+"\" onclick = \"popViewTransaction(this.id)\"><input type=\"button\" class=\"btn btn-reject\" value=\"Decline\" id=\"DenyBtn"+counter+"\" onclick = \"popViewTransaction(this.id)\">";
                counter++;
            }
            else if (element[key] == 3) {
                cell.innerHTML = "<input type=\"button\" class=\"btn btn-yellow\" value=\"Delivery\">";
            }
            else if (element[key] == 2) {
                cell.innerHTML = "<input type=\"button\" class=\"btn btn-orange\" value=\"Pick-Up\">";
            }
            else {
                cell.appendChild(text);
            }
        }
    }
}

var closeModal = null
function popViewTransaction(clicked_id){
    if(closeModal === null){
        document.getElementById("viewOrder").style.display = "block";
        closeModal = true
        document.getElementById("modal-body").innerHTML = clicked_id;
        document.getElementById('page-mask').style.position = "fixed";
    } else {
        document.getElementById("viewOrder").style.display = "none";
        document.getElementById('page-mask').style.position = "unset";
        closeModal = null
    }
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

let orders_table = document.getElementById('orders_table');
let orders_data = Object.keys(orders[0]);
generateTable(orders_table, orders);
generateTableHead(orders_table, orders_data);