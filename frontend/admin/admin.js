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
    var maxRows = 8;
    var table = document.getElementById('inventory_table');
    var wrapper = table.parentNode;
    var rowsInTable = table.rows.length;
    var height = 0;
    if (rowsInTable > maxRows) {
        for (var i = 0; i < maxRows; i++) {
            height += table.rows[i].clientHeight;
        }
        wrapper.style.height = height + "px";
    }

    maxRows = 6;
    table = document.getElementById('transactions_table');
    wrapper = table.parentNode;
    rowsInTable = table.rows.length;
    height = 0;
    if (rowsInTable > maxRows) {
        for (var i = 0; i < maxRows; i++) {
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
        for (var i = 0; i < maxRows; i++) {
            height += table.rows[i].clientHeight;
        }
        wrapper.style.height = height + "px";
    }
}


function exportCSV(elem){
    if (elem.id == "invCSV") {
        var table = document.getElementById("inventory_table");
        elem.setAttribute("download", "pantryinventory.xls");
    }
    else if (elem.id == "usrCSV") {
        var table = document.getElementById("users_table");
        elem.setAttribute("download", "pantryusers.xls");
    }
    else if (elem.id == "trnCSV") {
        var table = document.getElementById("transactions_table");
        elem.setAttribute("download", "pantrytransactions.xls");
    }
    var html = table.outerHTML;
    var url = 'data:application/vnd.ms-excel,' + escape(html);
    elem.setAttribute("href", url);

    return false;
}

var closeModal = null
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
    location.reload()
}

//This function pops the scan item modal
var editUserModal = null
function popEditUser(){
    let request = new XMLHttpRequest();
    if(editUserModal === null){
        document.getElementById("editUserModal").style.display = "block";
        addUserModal = true
        document.getElementById('page-mask').style.position = "fixed";
        document.getElementById('page-mask').style.backgroundColor = "rgba(0,0,0,0.6)";
    } else {
        document.getElementById("editUserModal").style.display = "none";
        editUserModal = null
        document.getElementById('page-mask').style.position = "unset";
    }
}

//This function pops the scan item modal
var addUserModal = null
function popAddUser(){
    let request = new XMLHttpRequest();
    if(addUserModal === null){
        document.getElementById("addUserModal").style.display = "block";
        addUserModal = true
        document.getElementById('page-mask').style.position = "fixed";
        document.getElementById('page-mask').style.backgroundColor = "rgba(0,0,0,0.6)";
    } else {
        document.getElementById("addUserModal").style.display = "none";
        addUserModal = null
        document.getElementById('page-mask').style.position = "unset";
    }
}

//This function pops the scan item modal
var delUserModal = null
function popConfirmDeleteUser(){
    let request = new XMLHttpRequest();
    if(delUserModal === null){
        document.getElementById("deleteUserModal").style.display = "block";
        delUserModal = true
        document.getElementById('page-mask').style.position = "fixed";
        document.getElementById('page-mask').style.backgroundColor = "rgba(0,0,0,0.6)";
    } else {
        document.getElementById("deleteUserModal").style.display = "none";
        delUserModal = null
        document.getElementById('page-mask').style.position = "unset";
    }
}

function deleteUser(user_id) {
    console.log(user_id);
    // will have to figure out how to get user id from the modal
}

function editUser(user_id) {
    console.log(user_id);
    // will have to figure out how to get user id from the modal
}

function addUser(user_id) {
    console.log(user_id);
    // will have to figure out how to get user id from the modal
}