$(function(){
    $("#deleteUserModal").load("deleteUserModal.html");
});

$(function(){
    $("#editUserModal").load("editUserModal.html");
});

$(function(){
    $("#addUserModal").load("addUserModal.html");
});

function makeTableScroll() {
    let maxRows = 8;
    let table = document.getElementById('inventory_table');
    let wrapper = table.parentNode;
    let rowsInTable = table.rows.length;
    let height = 0;
    if (rowsInTable > maxRows) {
        for (let i = 0; i < maxRows; i++) {
            height += table.rows[i].clientHeight;
        }
        wrapper.style.height = height + "px";
    }

    maxRows = 6;
    table = document.getElementById('transactions_table');
    rowsInTable = table.rows.length;
    height = 0;
    if (rowsInTable > maxRows) {
        for (let i = 0; i < maxRows; i++) {
            height += table.rows[i].clientHeight;
        }
        wrapper.style.height = height + "px";
    }

    maxRows = 8;
    table = document.getElementById('users_table');
    wrapper = table.parentNode;
    rowsInTable = table.rows.length;
    height = 0;
    if (rowsInTable > maxRows) {
        for (let i = 0; i < maxRows; i++) {
            height += table.rows[i].clientHeight;
        }
        wrapper.style.height = height + "px";
    }
}


function exportCSV(elem){
    if (elem.id == "invCSV") {
        let table = document.getElementById("inventory_table");
        elem.setAttribute("download", "pantryinventory.xls");
    }
    else if (elem.id == "usrCSV") {
        let table = document.getElementById("users_table");
        elem.setAttribute("download", "pantryusers.xls");
    }
    else if (elem.id == "trnCSV") {
        let table = document.getElementById("transactions_table");
        elem.setAttribute("download", "pantrytransactions.xls");
    }
    let html = table.outerHTML;
    let url = 'data:application/vnd.ms-excel,' + escape(html);
    elem.setAttribute("href", url);

    return false;
}

let closeModal = null
function popViewTransaction(clicked_id){
    if(closeModal === null){
        document.getElementById("viewTransaction").style.display = "block";
        closeModal = true;
        document.getElementById("modal-body").innerHTML = clicked_id;
        document.getElementById('page-mask').style.position = "fixed";
        document.getElementById('page-mask').style.backgroundColor = "rgba(0,0,0,0.6)";
    } else {
        document.getElementById("viewTransaction").style.display = "none";
        document.getElementById('page-mask').style.position = "unset";
        document.getElementById('page-mask').style.backgroundColor = "unset";
        closeModal = null;
    }
}

//The function can be used universally to close any popup
function closePopup(element){
    document.getElementById(element).style.display = "none";
    document.getElementById('page-mask').style.position = "unset";
}

//This function pops the scan item modal
var editUserModal = null
function popEditUser(userID, userFName, userLName, userUCID, permValue){
    
    if(editUserModal === null){
        
        if (permValue == 1) {
            document.getElementById("typeEditUser").value = "Volunteer";
        }
        else if (permValue == 2 ) {
            document.getElementById("typeEditUser").value = "Supervisor";
        }
        else if (permValue == 3 ) {
            document.getElementById("typeEditUser").value = "Owner";
        }

        document.getElementById("editUser").style.display = "block";
        addUserModal = true
        document.getElementById('page-mask').style.position = "fixed";
        document.getElementById('page-mask').style.backgroundColor = "rgba(0,0,0,0.6)";
        document.getElementById("editButton").value = userID;
        document.getElementById("fName").value = userFName;
        document.getElementById("lName").value = userLName;
        document.getElementById("userUCID").value = userUCID;
        document.getElementById("editButton").addEventListener('click', function() {
            editUser(document.getElementById("editButton").value, document.getElementById("fName").value, document.getElementById("lName").value, document.getElementById("userUCID").value, document.getElementById("typeEditUser").value);}, false);
    } else {
        document.getElementById("editUser").style.display = "none";
        editUserModal = null
        document.getElementById('page-mask').style.position = "unset";
    }
}

//This function pops the scan item modal
let addUserModal = null
function popAddUser(){
    let request = new XMLHttpRequest();
    if(addUserModal === null){
        document.getElementById("addUser").style.display = "block";
        addUserModal = true
        document.getElementById('page-mask').style.position = "fixed";
        document.getElementById('page-mask').style.backgroundColor = "rgba(0,0,0,0.6)";
    } else {
        document.getElementById("addUser").style.display = "none";
        addUserModal = null
        document.getElementById('page-mask').style.position = "unset";
    }
}

var delUserModal = null
function popConfirmDeleteUser(userID, userFName, userLName){
    let request = new XMLHttpRequest();  
    if(delUserModal === null){
        document.getElementById("deleteUser").style.display = "block";
        delUserModal = true
        document.getElementById('page-mask').style.position = "fixed";
        document.getElementById('page-mask').style.backgroundColor = "rgba(0,0,0,0.6)";
        document.getElementById("delButton").value = userID;
        document.getElementById("userDisplay").innerHTML = userFName + " " + userLName;
    } else {
        document.getElementById("deleteUser").style.display = "none";
        delUserModal = null
        document.getElementById('page-mask').style.position = "unset";
    }
}

function deleteUser(userID) {
    closePopup('deleteUser');
    
    let userData = {'id':userID };
    let userFormBody =[];
    for (let userKey in userData){
        let encodedUserKey = encodeURIComponent(userKey);
        let encodedUserValue = encodeURIComponent(userData[userKey]);
        userFormBody.push(encodedUserKey+"="+encodedUserValue);
    }
    userFormBody = userFormBody.join("&");
    fetch('http://localhost:8080/deleteUser/'+ userID, {
        body: userFormBody,
        method:"DELETE",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    }).then(response => response.json())
        .then(data=> {console.log('Success');location.reload();})
        .catch((error)=>{ console.error('Error:', error);location.reload();});
}

function editUser(userID, FName, LName, mNumber, Permissions ) {
    //PUT to user table
    let ActiveStatus = 1;
    let PermissionLevel;

    if (Permissions == "Volunteer" || Permissions == "Permissions Level") {
        PermissionLevel = 1;
    }
    else if (Permissions == "Supervisor" ) {
        PermissionLevel = 2;
    }
    else if (Permissions == "Owner" ) {
        PermissionLevel = 3;
    }

    PermissionLevel = parseInt(PermissionLevel);
    let userData = {'id':userID,'mNumber':mNumber,'fname':FName, 'lname':LName, 'permission':PermissionLevel, 'isActive':ActiveStatus}
    let userFormBody =[];
    for (let userKey in userData){
        let encodedUserKey = encodeURIComponent(userKey);
        let encodedUserValue = encodeURIComponent(userData[userKey]);
        userFormBody.push(encodedUserKey+"="+encodedUserValue);
    }
    userFormBody = userFormBody.join("&");
    console.log(userFormBody);
    fetch('http://localhost:8080/updateUsers/' + userID, {
        body: userFormBody, 
        method:"PUT",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    }).then(response => response.json())
        .then(data=> {console.log('Success');location.reload();})
        .catch((error)=>{ console.error('Error:', error);location.reload();});
}

//API Function to get Total Items
async function getTotalItems(){
    let response = await fetch("http://localhost:8080/getUniqueItems/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//API Function to get Total Inventory
async function getTotalInventory(){
    let response = await fetch("http://localhost:8080/getTotalInventory/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//API Function to get Total Users
async function getTotalUsers(){
    let response = await fetch("http://localhost:8080/getTotalUsers/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//API Function to get Total Uncompleted Orders
async function getTotalUncompleteOrders(){
    let response = await fetch("http://localhost:8080/getTotalUncompletedOrders/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//API Function to get Total Orders
async function getTotalOrders(){
    let response = await fetch("http://localhost:8080/getTotalOrders/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

async function SetStatistics(){
    getTotalItems().then(
        totalItems => {
            if (totalItems != "notFound") {
                document.getElementById("itemsStat").innerHTML = totalItems;
            }
        }
    )

    getTotalInventory().then(
        totalInventory => {
            if (totalInventory != "notFound") {
                document.getElementById("inventoryStat").innerHTML = totalInventory;
            }
        }
    )

    getTotalUsers().then(
        totalUsers => {
            if (totalUsers != "notFound") {
                document.getElementById("usersStat").innerHTML = totalUsers;
            }
        }
    )

    getTotalUncompleteOrders().then(
        totalUncOrders => {
            if (totalUncOrders != "notFound") {
                document.getElementById("uncOrdersStat").innerHTML = totalUncOrders;
            }
        }
    )

    getTotalOrders().then(
        totalOrders => {
            if (totalOrders != "notFound") {
                document.getElementById("ordersStat").innerHTML = totalOrders;
            }
        }
    )
}

SetStatistics();