const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
  var XHR = new XMLHttpRequest();

  XHR.open("GET", baseURL + type + "/");
  XHR.send();

  XHR.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(this.responseText)); 
    }
  };
}

function writeToDocument(type) {
    var el = document.getElementById("data");
    el.innerHTML = ""
    getData(type, function(data) {
        data = data.results;

        data.forEach(function(item) {
            el.innerHTML +=  "<p>" + item.name + "</p>";
        });
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
