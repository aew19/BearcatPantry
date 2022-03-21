async function createTransactionTable(){
    getTransactionData().then(trans=>{
      if(trans!="notFound"){makeTransactionTable(trans)}
      //console.log("test")
      //console.log(trans)
    })
}

google.charts.load('current', {'packages':['table']});
function makeTransactionTable(TransactionData) {
    var TranTable = new google.visualization.DataTable();
    TranTable.addColumn('string','Date');
    TranTable.addColumn('string','Item Name');
    TranTable.addColumn('number','Weight');
    TranTable.addColumn('number','Quantity');
    TranTable.addColumn('string','Tansaction In/Out');

    TranTable.addRows(TransactionData.length);


    var counter = 0;
    for (let element of TransactionData) {
        TranTable.setValue(counter, 0, element.date);
        TranTable.setValue(counter, 1, element.productName);
        TranTable.setValue(counter, 2, element.weight);
        TranTable.setValue(counter, 3, element.quantity);
        if(element.itemsIn){ TranTable.setValue(counter, 4, "In"); }
        else{ TranTable.setValue(counter, 4, "Out"); }

        counter++;
    }

    var table = new google.visualization.Table(document.getElementById('transaction_table'));

    var cssClassNames = {
        'headerRow': 'table',
        'tableRow': 'table',
        'oddTableRow': 'table'
    };

    table.draw(TranTable, {width: '100%', height: '100%', allowHtml:true, sortColumn:0, 'cssClassNames': cssClassNames});
}

async function getTransactionData(){
    fromDate = document.getElementById('fromDate').value
    toDate = document.getElementById('toDate').value
    prodType = document.getElementById('itemType').value
    itemsIn = true
    if(document.getElementById('itemsOutRadio').checked){itemsIn = false}

    let data = {'fromDate':fromDate, 'toDate':toDate, 'prodType':prodType, 'itemsIn':itemsIn}
    let formBody = []
    for(let key in data){
        let encodedKey = encodeURIComponent(key)
        let encodedValue = encodeURIComponent(data[key])
        formBody.push(encodedKey+"="+encodedValue)
    }
    formBody = formBody.join("&");


    let response = await fetch(url + 'transactionQuery',{
        body: formBody,
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
    })
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

function setInputDates(){
    document.getElementById('fromDate').valueAsDate = new Date()
    document.getElementById('toDate').valueAsDate = new Date()
}

fetch("../environment.json").then(response=>response.json())
    .then(json=>{
        env=json.env
        if (env === "dev"){
            url = "http://localhost:8080/"
            posturl = 'http://localhost:8080/'
        }else{
            url = "https://bearcatspantry.uc.edu/web-services/"
            posturl = 'https://bearcatspantry.uc.edu/web-services/'
        }
        google.charts.setOnLoadCallback(function() {
            setInputDates()
            createTransactionTable()
        });

    })
    .catch(err => console.log("Error reading Environment"))