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

function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            // Need to figure out how to add checkbox here
            cell.appendChild(text);
        }
    }
}

function makeTableScroll() {
    var maxRows = 6;

    var table = document.getElementById('users_table');
    var wrapper = table.parentNode;
    var rowsInTable = table.rows.length;
    var height = 0;
    if (rowsInTable > maxRows) {
        for (var i = 0; i < maxRows; i++) {
            height += table.rows[i].clientHeight;
        }
        wrapper.style.height = height + "px";
    }
}

let table = document.querySelector("table");
let data = Object.keys(users[0]);
generateTable(table, users);
generateTableHead(table, data);