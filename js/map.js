// Function to draw map
var drawMap = function() {
    map = L.map("map").setView([38.925, -96.724], 5);
    var USLayer = L.tileLayer("https://api.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFkaWVnbyIsImEiOiJjaWZvY2VwNmdoNjNvc3htN3B2NW52bTlwIn0.7dCCLGVvoDjg3AHS8m5s0Q").addTo(map);
    getData();   
}

var data;
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
var blackhit = 0,
    blackkilled = 0,
    whitehit = 0,
    whitekilled = 0,
    totalkilled = 0;
// Loops through data and adds the appropriate layers and points
var customBuild = function() {
    for(var i = 0; i < data.length; i++) {
         
        //Create popup
        var popup = L.popup()
            .setLatLng([data[i].lat, data[i].lng])
            .setContent(data[i]["Victim's Age"] + " year old " + data[i]["Victim Name"] + " was " + data[i]["Hit or Killed?"] + " by " + data[i]["Agency Name"] + "<br/><br/>" + data[i].Summary + "(Source)".link(data[i]["Source Link"]));
        
        //Create circle
        var circle = L.circle([data[i].lat, data[i].lng], 30100, {
            color: (data[i]["Hit or Killed?"] === "Killed") ? "#9F4464" : "#203E51",
            opacity: 0.6,
            fillOpacity: 0.5,
            weight: 0
        }).bindPopup(popup);
        
        // Applies to overlay layer depending on race
        var personRace = ("Race" in data[i]) ? data[i].Race : "Unknown";
        if (layers.hasOwnProperty(personRace)) {
            layers[personRace].addLayer(circle);
        } else {
            layers[personRace] = L.layerGroup([circle]);   
        }
        
        //Adds to counters for table
        if (personRace == "Black or African American") {
            (data[i]["Hit or Killed?"]  === "Killed") ? blackkilled++ : blackhit++;
        } else if (personRace == "White") {
            (data[i]["Hit or Killed?"]  === "Killed") ? whitekilled++ : whitehit++;
        };
        
        if(data[i]["Hit or Killed?"] === "Killed") {
            totalkilled++;    
        }
    }
    $.each(layers, function(key, value) {
        if (layers.hasOwnProperty(key)) {
            this.addTo(map);
        }
    
    });
    L.control.layers(null,layers).addTo(map);
    //table
    $("#blackhit").text(blackhit);
    $("#blackkilled").text(blackkilled);
    $("#whitehit").text(whitehit);
    $("#whitekilled").text(whitekilled);
    
    //stats
    $("#total").text(data.length);
    $("#percentkilled").text(Math.ceil(totalkilled / data.length * 100) + "%")
    $("#blackandkilled").text(Math.ceil(blackkilled / (blackhit + blackkilled) * 100)  + "%");
    $("#whiteandkilled").text(Math.ceil(whitekilled / (whitehit + whitekilled) * 100)  + "%");
}