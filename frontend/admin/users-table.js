//This function is used for the formatting of the table
//Right now searching and ordering is on
function createUserTableStyle() {
    $('#users_table').DataTable({
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

function generateUsersTableHead(data) {

    const table = document.getElementById('users_table');
    let thead = table.createTHead();
    let row = thead.insertRow();
    let th = document.createElement("th");
    let text;

    if (data.id) {
        text = document.createTextNode("User ID");
        th.appendChild(text);
        th.style.display = "none";
        row.appendChild(th);
    }

    th = document.createElement("th");
    if (data.fname) {
        text = document.createTextNode("Name");
        th.appendChild(text);
        row.appendChild(th);
    }
    
    th = document.createElement("th");
    if (data.permissions) {
        if (data.permissions == 1) {
            text = document.createTextNode("Volunteer");
        }
        else if (data.permissions == 2 ) {
            text = document.createTextNode("Supervisor");
        }
        else if (data.permissions == 3 ) {
            text = document.createTextNode("Owner");
        }
        th.appendChild(text);
        row.appendChild(th);
    }
    
    th = document.createElement("th");
    if (data.dateActive) { 
        text = document.createTextNode("Modify User");
        th.appendChild(text);
        row.appendChild(th);
    }

    createUserTableStyle();
}

function loadUsersTable(users){
    let loadPromise = function(resolve,reject) {
        const table = document.getElementById('users_table');
        for (let element of users) {
            if (element.isActive == 1) {
                let row = table.insertRow();
                row.id = element.id;

                //user id
                cell = row.insertCell();
                let text = document.createTextNode(element.id);
                cell.appendChild(text);
                cell.style.display = "none";

                //first and last name
                cell = row.insertCell();
                text = document.createTextNode(element.fname + " " + element.lname);
                cell.appendChild(text);

                //role
                cell = row.insertCell();
                if (element.permissions == 1) {
                    text = document.createTextNode("Volunteer");
                }
                else if (element.permissions == 2 ) {
                    text = document.createTextNode("Supervisor");
                }
                else if (element.permissions == 3 ) {
                    text = document.createTextNode("Owner");
                }
                cell.appendChild(text);

                //modify
                cell = row.insertCell();
                text = document.createTextNode("");
                cell.innerHTML = "<a class=\"btn btn-red\" id=\"EditBtn\" onclick =popEditUser("+element.id+")><i class='fas fa-edit'></i></a><a class=\"btn btn-red\" id=\"DeleteBtn\" onclick =popConfirmDeleteUser("+element.id+")><i class='fas fa-trash'></i></a>";
                cell.appendChild(text);
            }
        }
        resolve(users[0]);
    }
    return new Promise(loadPromise);
}

//API Call to get users table
async function getUsers(){
    let response = await fetch(url + "users/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

async function createUsersTable(){
    getUsers().then(
        data => {
            if (data != "notFound") {
                loadUsersTable(data).then(result => generateUsersTableHead(result));
            }
        }
    )
}


//On Submit of new user modal create new user
async function submitNewUser(){
    let mNumber = document.getElementById("userMNum").value.toUpperCase();

    if (!mNumber.includes("M")) {
        mNumber = "M" + mNumber;
    }

    let FName = document.getElementById("AddfName").value;
    let LName = document.getElementById("AddlName").value;
    let PermissionLevel = document.getElementById("typeUser").value;
    if (PermissionLevel == "Supervisor") {
        PermissionLevel = 2;
    }
    else if (PermissionLevel == "Owner") {
        PermissionLevel = 3;
    }
    else {
        PermissionLevel = 1;
    }
    let ActiveStatus = 1;
    document.getElementById("addUser").style.display = "none";
    document.getElementById('page-mask').style.position = "unset";
    //Call API Endpoint
    await addUser(mNumber, FName, LName, PermissionLevel, ActiveStatus);
    location.reload();
}

async function addUser(mNumber, FName, LName, PermissionLevel, ActiveStatus){
    //POST to user table
    let userData = {'mNumber':mNumber,'fname':FName, 'lname':LName, 'permissions':PermissionLevel, 'isActive':ActiveStatus}
    let userFormBody =[];
    for (let userKey in userData){
        let encodedUserKey = encodeURIComponent(userKey);
        let encodedUserValue = encodeURIComponent(userData[userKey]);
        userFormBody.push(encodedUserKey+"="+encodedUserValue);
    }
    userFormBody = userFormBody.join("&");
    
    fetch(posturl + '/users', {
        body: userFormBody,
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    })
        .then(status)
        .then(json)
        .then(function(data){
            console.log('Request Succeeded', data)
            location.reload()
        })
        .catch(function(error){
            console.log('Request Failed', error)
            location.reload()
        });
}

//Error handling for status
function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

//Returns the json of the response
function json(response) {
    return response.json()
}


fetch("../environment.json").then(response=>response.json())
    .then(json=>{
        env=json.env
        if (env === "dev"){
            url = "http://localhost:8080/"
            posturl = 'http://localhost:8080/'
        }else{
            url = "https://bcpwb1prd01l.ad.uc.edu:8443/web-services/"
            posturl = 'https://bcpwb1prd01l.ad.uc.edu:8443/web-services/'
        }
        //Crate the components of the admin page here
        createUsersTable()

    })
    .catch(err => console.log("Error reading Environment"))

