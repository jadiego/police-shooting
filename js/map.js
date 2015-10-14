// Function to draw map
var drawMap = function() {
    var map = L.map("map").setView([38.925, -96.724], 5);
    var USLayer = L.tileLayer("https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFkaWVnbyIsImEiOiJjaWZvY2VwNmdoNjNvc3htN3B2NW52bTlwIn0.7dCCLGVvoDjg3AHS8m5s0Q");
    USLayer.addTo(map);
    getData();
}

var data;
// Function for getting data
var getData = function() {
    $.ajax({
        dataType: "json",
        url: "../data/response.json",
        type: "get",
        success: function(dat) {
            data = dat;
        }
    });
    customBuild();
}

// Loops through data and adds the appropriate layers and points
var customBuild = function() {

}