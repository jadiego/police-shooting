// Function to draw map
var drawMap = function() {
    var map = L.map("map").setView([38.925,-96.724], 5);
    var layer = L.tileLayer("https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFkaWVnbyIsImEiOiJjaWZvY2VwNmdoNjNvc3htN3B2NW52bTlwIn0.7dCCLGVvoDjg3AHS8m5s0Q");
    layer.addTo(map);
    getData();
}


// Function for getting data
var getData = function() {
    var data;
    $.ajax({
        url:"../data/response.json",
        type: "get",
        success:function(dat) {
        data = dat
        // Do something with your data!
    }, 
    dataType:"json"
    }
)}

// Loop through your data and add the appropriate layers and points
var customBuild = function() {
    // Be sure to add each layer to the map
    
    
    // Once layers are on the map, add a leaflet controller that shows/hides layers
}