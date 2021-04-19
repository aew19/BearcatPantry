$(function(){
    $("#deleteUserModal").load("deleteUserModal.html");
});

$(function(){
    $("#editUserModal").load("editUserModal.html");
});

$(function(){
    $("#addUserModal").load("addUserModal.html");
});

let env="";
let url = "";
let posturl = '';
//Reads the environment and sets the correct API URL
async function loadEnv(){
    fetch("../environment.json").then(response=>response.json())
        .then(json=>{
            env=json.env
            if (env === "dev"){
                url = "http://localhost:8080/"
                posturl = 'http://localhost:8080/'
            }else{
                //https does not work because SSL cert. Changing to http
                url = "https://bearcatspantry.uc.edu/web-services/"
                posturl = 'https://bearcatspantry.uc.edu/web-services/'

                removeATagFromVolunteer("AdminOrdersCSVExported");
                removeATagFromVolunteer("AdminInventoryCSVExported");
                removeATagFromVolunteer("AdminUsersCSVExported");
                removeATagFromVolunteer("addUsers");
                removeATagFromVolunteer("AdminVisitsCSVExported");
            }
            //Crate the components of the admin page here
            SetStatistics()

        })
        .catch(err => console.log("Error reading Environment"))
}

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
    table = document.getElementById('orders_table');
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
        getInventory().then(
            Inventory => {
                if (Inventory != "notFound") {
                    var myInventoryXML = new myExcelXML(Inventory);
                    myInventoryXML.fileName = "PantryInventory";
                    myInventoryXML.downLoad();
                }
            }
        )
    }
    else if (elem.id == "usrCSV") {
        getUsers().then(
            Users => {
                if (Users != "notFound") {
                    var myUsersXML = new myExcelXML(Users);
                    myUsersXML.fileName = "PantryUsers";
                    myUsersXML.downLoad();
                }
            }
        )
    }
    else if (elem.id == "trnCSV") {
        getOrders().then(
            Orders => {
                if (Orders != "notFound") {
                    var myTransactionsXML = new myExcelXML(Orders);
                    myTransactionsXML.fileName = "PantryOrders";
                    myTransactionsXML.downLoad();
                }
            }
        )
    }
    else if (elem.id == "studentvisitsCSV") {
        getStudentVisits().then(
            Visits => {
                if (Visits != "notFound") {
                    var myStudentVisitsXML = new myExcelXML(Visits);
                    myStudentVisitsXML.fileName = "PantryUsers";
                    myStudentVisitsXML.downLoad();
                }
            }
        )
    }

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
    document.getElementById('page-mask').style.backgroundColor = "unset";
}

//This function pops the scan item modal
var editUserModal = null
function popEditUser(userID){
    getUserByID(userID).then(
        userdata => {
            if(editUserModal === null){
                
                if (userdata.permissions == 1) {
                    document.getElementById("typeEditUser").value = "Volunteer";
                }
                else if (userdata.permissions == 2 ) {
                    document.getElementById("typeEditUser").value = "Supervisor";
                }
                else if (userdata.permissions == 3 ) {
                    document.getElementById("typeEditUser").value = "Owner";
                }

                document.getElementById("editUser").style.display = "block";
                addUserModal = true
                document.getElementById('page-mask').style.position = "fixed";
                document.getElementById('page-mask').style.backgroundColor = "rgba(0,0,0,0.6)";
                document.getElementById("editButton").value = userID;
                document.getElementById("fName").value = userdata.fname;
                document.getElementById("lName").value = userdata.lname;
                document.getElementById("userUCID").value = userdata.mNumber;
                document.getElementById("userEditEmail").value = userdata.email;
            } else {
                document.getElementById("editUser").style.display = "none";
                editUserModal = null
                document.getElementById('page-mask').style.position = "unset";
                document.getElementById('page-mask').style.backgroundColor = "unset";
            }
        }
    )
}

function submitEditUser() {
    let userMNumber = document.getElementById("userUCID").value.toUpperCase();
    if (!userMNumber.includes("M")) {
        userMNumber = "M" + userMNumber;
    }
    editUser(
        document.getElementById("editButton").value,
        document.getElementById("fName").value,
        document.getElementById("lName").value,
        userMNumber,
        document.getElementById("typeEditUser").value,
        document.getElementById("userEditEmail").email
    );
}

//This function pops the scan item modal
let addUserModal = null
function popAddUser(){
    if(addUserModal === null){
        document.getElementById("addUser").style.display = "block";
        addUserModal = true
        document.getElementById('page-mask').style.position = "fixed";
        document.getElementById('page-mask').style.backgroundColor = "rgba(0,0,0,0.6)";
    } else {
        document.getElementById("addUser").style.display = "none";
        addUserModal = null
        document.getElementById('page-mask').style.position = "unset";
        document.getElementById('page-mask').style.backgroundColor = "unset";
    }
}

var delUserModal = null
function popConfirmDeleteUser(userID){
    getUserByID(userID).then(
        userdata => {
            if (delUserModal === null) {
                document.getElementById("deleteUser").style.display = "block";
                delUserModal = true
                document.getElementById('page-mask').style.position = "fixed";
                document.getElementById('page-mask').style.backgroundColor = "rgba(0,0,0,0.6)";
                document.getElementById("delButton").value = userID;
                document.getElementById("userDisplay").innerHTML = userdata.fname + " " + userdata.lname;
            } else {
                document.getElementById("deleteUser").style.display = "none";
                delUserModal = null
                document.getElementById('page-mask').style.position = "unset";
                document.getElementById('page-mask').style.backgroundColor = "unset";
            }
        }
    );
}

function deleteUser(userID) {
    closePopup('deleteUser');
    getUserByID(userID).then(
        userdata => {
            let ActiveStatus = 0;
            let userData = {'id':userID,'mNumber':userdata.mNumber,'fname':userdata.fname, 'lname':userdata.lname, 'permission':userdata.permissions, 'isActive':ActiveStatus, 'email':""}
            let userFormBody =[];
            for (let userKey in userData){
                let encodedUserKey = encodeURIComponent(userKey);
                let encodedUserValue = encodeURIComponent(userData[userKey]);
                userFormBody.push(encodedUserKey+"="+encodedUserValue);
            }
            userFormBody = userFormBody.join("&");
            console.log(userFormBody);
            fetch(posturl + '/updateUsers/' + userID, {
                body: userFormBody, 
                method:"PUT",
                headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            }).then(response => response.json())
                .then(data=> {console.log('Success');createUsersTable();})
                .catch((error)=>{ console.error('Error:', error);createUsersTable();});           
        }
    );
        
}

function editUser(userID, FName, LName, mNumber, Permissions, email) {
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
    let userData = {'id':userID,'mNumber':mNumber,'fname':FName, 'lname':LName, 'permission':PermissionLevel, 'isActive':ActiveStatus, 'email':email}
    let userFormBody =[];
    for (let userKey in userData){
        let encodedUserKey = encodeURIComponent(userKey);
        let encodedUserValue = encodeURIComponent(userData[userKey]);
        userFormBody.push(encodedUserKey+"="+encodedUserValue);
    }
    userFormBody = userFormBody.join("&");
    console.log(userFormBody);
    fetch(posturl + '/updateUsers/' + userID, {
        body: userFormBody, 
        method:"PUT",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    }).then(response => response.json())
        .then(data=> {console.log('Success');createUsersTable();})
        .catch((error)=>{ console.error('Error:', error);createUsersTable();});
}

//API Function to get Total Items
async function getTotalItems(){
    let response = await fetch(url + "/getUniqueItems/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//API Function to get Total Inventory
async function getTotalInventory(){
    let response = await fetch(url + "/getTotalInventory/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//API Function to get Total Users
async function getTotalUsers(){
    let response = await fetch(url + "/getTotalUsers/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//API Function to get Total Uncompleted Orders
async function getTotalUncompleteOrders(){
    let response = await fetch(url + "/getTotalUncompletedOrdersCount/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

//API Function to get Total Orders
async function getTotalOrders(){
    let response = await fetch(url + "/getTotalOrders/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

async function getUserByID(id){
    let response = await fetch(url + "/users/"+id)
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

loadEnv()