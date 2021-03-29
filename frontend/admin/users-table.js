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
                makeUsersTable(data);
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
    let email = document.getElementById("userAddEmail").value;
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
    await addUser(mNumber, FName, LName, PermissionLevel, ActiveStatus, email);
    createUsersTable();
}

async function addUser(mNumber, FName, LName, PermissionLevel, ActiveStatus, Email){
    //POST to user table
    let userData = {'mNumber':mNumber,'fname':FName, 'lname':LName, 'permissions':PermissionLevel, 'isActive':ActiveStatus, 'email':Email}
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
            createUsersTable();
        })
        .catch(function(error){
            console.log('Request Failed', error)
            createUsersTable();
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


google.charts.load('current', {'packages':['table']});
function makeUsersTable(usersData) {
    var UsersTable = new google.visualization.DataTable();
    UsersTable.addColumn('number','User ID');
    UsersTable.addColumn('string','Name');
    UsersTable.addColumn('string','Role');
    UsersTable.addColumn('string','Modify User');

    var length = 0;
    for (let element of usersData) {
        if (element.isActive == 1) {
            length++;
        }
    }

    UsersTable.addRows(length);
    var counter = 0;
    for (let element of usersData) {
        if (element.isActive == 1) {
    
            let role;
            if (element.permissions == 1) {
                role = "Volunteer";
            }
            else if (element.permissions == 2 ) {
                role = "Supervisor";
            }
            else if (element.permissions == 3 ) {
                role = "Owner";
            }
    
            UsersTable.setValue(counter, 0, element.id);
            UsersTable.setValue(counter, 1, element.fname + " " + element.lname);
            UsersTable.setValue(counter, 2, role);
            UsersTable.setValue(counter, 3, "<a class=\"btn btn-red\" id=\"EditBtn\" onclick =popEditUser("+element.id+")><i class='fas fa-edit'></i></a><a class=\"btn btn-red\" id=\"DeleteBtn\" onclick =popConfirmDeleteUser("+element.id+")><i class='fas fa-trash'></i></a>");
            counter++;
        }
    }
    
    var view = new google.visualization.DataView(UsersTable);
    view.setColumns([1,2,3]);
    var table = new google.visualization.Table(document.getElementById('users_table'));
    
    var cssClassNames = {
        'headerRow': 'table',
        'tableRow': 'table',
        'oddTableRow': 'table'
    };

    table.draw(view, {width: '100%', height: '100%', allowHtml:true, sortColumn:0, 'cssClassNames': cssClassNames});
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
        google.charts.setOnLoadCallback(function() {
            createUsersTable()
        });

    })
    .catch(err => console.log("Error reading Environment"))

