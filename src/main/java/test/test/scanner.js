var modal = null

function pop(){
    let request = new XMLHttpRequest();
    if(modal === null){
        document.getElementById("box").style.display = "block";
        var inputVal = document.getElementById("comment").value;
        console.log(inputVal);
        request.open("POST", "http://localhost:8080/newBarcode", true);
        request.send(inputVal);
        request.onload = () => {
            console.log(request);
            if (request.status === 200){
                console.log("SUCCESS!")
            }
        }
        modal = true
    } else {
        document.getElementById("box").style.display = "none";
        modal = null
    }
}