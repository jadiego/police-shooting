// Function to draw map
var drawMap = function() {
    map = L.map("map").setView([38.925, -96.724], 5);
    var USLayer = L.tileLayer("https://api.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFkaWVnbyIsImEiOiJjaWZvY2VwNmdoNjNvc3htN3B2NW52bTlwIn0.7dCCLGVvoDjg3AHS8m5s0Q").addTo(map);
    getData();   
}


// Function for getting data
var getData = function() {
    $.ajax({
        url: "../data/response.json",
        type: "get",
        success: function(dat) {
            data = dat;
            customBuild();
        },
        dataType: "json"
    });
}

var layers = {};
// Loops through data and adds the appropriate layers and points
var customBuild = function() {
    for(var i = 0; i < data.length; i++) {
        //Creates circle with popup
        var circle = L.circle([data[i].lat, data[i].lng], 20000, {
            color: (data[i]["Hit or Killed?"] === "Killed") ? "red" : "gray",
            fillOpacity: 0.3
        }).bindPopup(data[i].Summary + "Source".link(data[i]["Source Link"]));
        // If data doesn't have "Race" key, then changes it to Unknown;
        var personRace = ("Race" in data[i]) ? data[i].Race : "Unknown";
        if (layers.hasOwnProperty(personRace)) {
            layers[personRace].addLayer(circle);
        } else {
            layers[personRace] = L.layerGroup([circle]);   
        }
    }
    $.each(layers, function(key, value) {
        if (layers.hasOwnProperty(key)) {
            this.addTo(map);
        }
    
    });
    L.control.layers(null,layers).addTo(map);
}