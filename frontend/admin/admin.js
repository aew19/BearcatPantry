$(function(){
    $("#navBarAdmin").load("navBarAdmin.html");
});

$(function(){
    $("#footer").load("../footer.html");
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
        closeModal = true
        document.getElementById("modal-body").innerHTML = clicked_id;
    } else {
        document.getElementById("viewTransaction").style.display = "none";
        closeModal = null
    }
}