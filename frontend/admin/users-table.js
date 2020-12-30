let users = [
    { Select: "", Name: "Karl Dierking", Role: "Volunteer"},
    { Select: "", Name: "Jake van Meter", Role: "Volunteer"},
    { Select: "", Name: "Daniel Cummins", Role: "Owner"},
    { Select: "", Name: "Isaiah Corso-Phinney", Role: "Owner"},
    { Select: "", Name: "Logan Lindsay", Role: "Supervisor"},
    { Select: "", Name: "Sivani Alla", Role: "Volunteer"},
    { Select: "", Name: "Teja Bollimunta", Role: "Volunteer"},
    { Select: "", Name: "Connor Herbert", Role: "Owner"},
    { Select: "", Name: "Isaac Smitherman", Role: "Owner"},
    { Select: "", Name: "Joshua St. Pierre", Role: "Supervisor"}
];

$(function () {
    $('#users_table').DataTable({
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
                cell.innerHTML = "<input type=\"checkbox\" id=\"checkbox"+counter+"\"><label for=\"checkbox"+counter+"\"></label>";
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