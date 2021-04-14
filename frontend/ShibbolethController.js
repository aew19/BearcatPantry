async function getShibData(){
    // leaving hardcoded because shibboleth data will not work in development environment.
    let response = await fetch("https://bearcatspantry.uc.edu/web-services/ShibbolethData")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

async function getUserByMNumber(MNum){
    let response = await fetch(url + "/getUserByMNum/"+MNum)
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

async function getUsers(){
    let response = await fetch(url + "/users/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

function initializeShibboleth() {
    getShibData().then(
        shibData => {
            getUsers().then(
                users => { 
                    for (const [userKey, userValue] of Object.entries(users)) {
                        if (userValue.isActive && userValue.mNumber == shibData.uceduUCID) { 
                            if (userValue.permissions == 1 || userValue.permissions == 2 || userValue.permissions == 3) {
                                $("#navbar").load("../../../BearcatPantry/frontend/admin/AdminNavBar.html");
                            }
                            else {  
                                $("#navbar").load("../../../BearcatPantry/frontend/student/StudentNavBar.html");
                            }
                        }
                    }
                }
            )
        }
    )
}

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
            }
            //Crate the components of the admin page here
            initializeShibboleth()

        })
        .catch(err => console.log("Error reading Environment"))
}

loadEnv()