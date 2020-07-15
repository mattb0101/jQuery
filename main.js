function getData(url, cb) {
  var XHR = new XMLHttpRequest();

  XHR.open("GET", url);
  XHR.send();

  XHR.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(this.responseText)); 
    }
  };
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}


function generatePaginationButtons(next, prev) {
    if(next && prev) {
        return `<button onclick = "writeToDocument('${prev}')">Previous</button>
                <button onclick = "writeToDocument('${next}')">Next</button>`;
    }   else if (next && !prev) {
        return`<button onclick = "writeToDocument('${next}')">Next</button>`;
    }   else if (!next && prev) {
        return`<button onclick = "writeToDocument('${prev}')">Previous</button>`;
    } 
}

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = ""

    getData(url, function(data) {

        var pagination;
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous)
        }

        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;
    });
}

// function printDataToConsole(data) {
//     console.log(data);
// }

// getData(printDataToConsole);

// getData(function(data) {
//     console.log(data);
// });

// var XHR = new XMLHttpRequest();
// var data;

// XHR.open("GET", "https://ci-swapi.herokuapp.com/api/");
// XHR.send();

// // function setData(jsonData) { //Remove as not needed anymore
// //     data = jsonData;
// // }

// XHR.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         //document.getElementById("data").innerHTML = this.responseText;
//         //console.log(JSON.parse(this.responseText));
//         data = (JSON.parse(this.responseText)); // brought back in with timeout function!
//         //setData(JSON.parse(this.responseText));
//     }
// };

// console.log(data); // comes in as undefined, operating before data is ready!

// setTimeout(function(){
//     console.log(data);
// }, 500);
