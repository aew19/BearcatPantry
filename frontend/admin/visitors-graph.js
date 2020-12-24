google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);
function drawBasic() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'X');
    data.addColumn('number', 'Students');

    data.addRows([
        ['January', 15],     ['February', 18],   ['March', 14],      ['April', 14],
        ['May', 17],        ['June', 19],       ['July', 16],       ['August', 18],
        ['September', 14],  ['October', 14],    ['November', 15],   ['December', 16],
    ]);

    var options = {
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
            },
            slantedText: true
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

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}