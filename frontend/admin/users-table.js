let users = [
    { Name: "Karl Dierking", Role: "Volunteer", Modify: "" },
    { Name: "Jake van Meter", Role: "Volunteer", Modify: "" },
    { Name: "Daniel Cummins", Role: "Owner", Modify: "" },
    { Name: "Isaiah Corso-Phinney", Role: "Owner", Modify: "" },
    { Name: "Logan Lindsay", Role: "Supervisor", Modify: "" },
    { Name: "Sivani Alla", Role: "Volunteer", Modify: "" },
    { Name: "Teja Bollimunta", Role: "Volunteer", Modify: "" },
    { Name: "Connor Herbert", Role: "Owner", Modify: "" },
    { Name: "Isaac Smitherman", Role: "Owner", Modify: "" },
    { Name: "Joshua St. Pierre", Role: "Supervisor", Modify: "" }
];

$(function () {
    $('#users_table').DataTable({
      "pageLength": 3,
      "paging": false,
      "lengthChange": true,
      "searching": false,
      "ordering": true,
      "info": false,
      "autoWidth": true,
      "order": [1, "asc"]
      });
});

function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of users_data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, users_data) {
    var counter = 0;
    for (let element of users_data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            if (element[key] == "") {
                cell.innerHTML = "<div style=\"font-size:1.5rem;color:#e00122;display:inline-block;width:50%;\" id=\"EditBtn"+counter+"\" onclick =\"popEditUser(this.id)\"><i class='fas fa-edit'></i></div><div style=\"font-size:1.5rem;color:#e00122;display:inline-block;width:50%;\" id=\"DeleteBtn"+counter+"\" onclick =\"popDeleteUser(this.id)\"><i class='fas fa-trash'></i></div>";
                counter++;
            }
            cell.appendChild(text);
        }
    }
}

let users_table = document.getElementById('users_table');
let users_data = Object.keys(users[0]);
generateTable(users_table, users);
generateTableHead(users_table, users_data);