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
    location.reload()
}

//This function pops the scan item modal
let editUserModal = null
function popEditUser(){
    let request = new XMLHttpRequest();
    if(editUserModal === null){
        document.getElementById("editUser").style.display = "block";
        addUserModal = true
        document.getElementById('page-mask').style.position = "fixed";
        document.getElementById('page-mask').style.backgroundColor = "rgba(0,0,0,0.6)";
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

let delUserModal = null
function popConfirmDeleteUser(){
    let request = new XMLHttpRequest();
    if(delUserModal === null){
        document.getElementById("deleteUser").style.display = "block";
        delUserModal = true
        document.getElementById('page-mask').style.position = "fixed";
        document.getElementById('page-mask').style.backgroundColor = "rgba(0,0,0,0.6)";
    } else {
        document.getElementById("deleteUser").style.display = "none";
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