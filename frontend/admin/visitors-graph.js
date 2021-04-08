async function createVisitorsTable(){
    getVisitors().then(visitors=>{
        if (visitors != "notFound"){
            makeVisitorsTable(visitors);
        }
    })
}

google.charts.load('current', {packages: ['corechart', 'line']});
function makeVisitorsTable(VisitorsData) {
    var VisitorsTable = new google.visualization.DataTable();
    VisitorsTable.addColumn('string', 'X');
    VisitorsTable.addColumn('number', 'Students');

    VisitorsTable.addRows([
        ['January', VisitorsData[0]], ['February', VisitorsData[1]], ['March', VisitorsData[2]], ['April', VisitorsData[3]],
        ['May', VisitorsData[4]], ['June', VisitorsData[5]], ['July', VisitorsData[6]], ['August', VisitorsData[7]],
        ['September', VisitorsData[8]], ['October', VisitorsData[9]], ['November', VisitorsData[10]], ['December', VisitorsData[11]]
    ]);

    var table = new google.visualization.AreaChart(document.getElementById('chart_div'));

    var options = {
        width: '100%',
        height: '100%',
        hAxis: {
            title: 'Month',
            titleTextStyle: {
                color: '#e00122',
                bold: '1',
                italic: '1'
            },
            textStyle: {
                bold: '1',
                italic: '1',
            }
        },
        vAxis: {
            title: 'Number of Students',
            baseline: '0',
            titleTextStyle: {
                color: '#e00122',
                bold: '1',
                italic: '1'
            },
            textStyle: {
                bold: '1',
                italic: '1'
            }
        },
        legend: {
            position: 'right', 
            textStyle: {
                color: '#e00122',
                bold: '1',
                italic: '1',
            }
        },
        pointSize: '4',
        colors: [ '#e00122', ],
        fontName: 'Open Sans',
    };

    table.draw(VisitorsTable, options);
}

async function getVisitors(){
    let response = await fetch(url+"/getVisitorsData/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

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
        google.charts.setOnLoadCallback(function() {
            createVisitorsTable()
        });
    })
    .catch(err => console.log("Error reading Environment"))