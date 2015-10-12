// Function to draw your map
var drawMap = function() {
    
    // Create map and set view
    var map = L.map("mapSpace").setView([38.8833, 77.0167], center)

    // Create a tile layer variable using the appropriate url
    var layer = L.tileLayer("https://api.mapbox.com/v4/mapbox.comic/0/0/0.png?access_token=pk.eyJ1IjoiamFkaWVnbyIsImEiOiJjaWZvY2VwNmdoNjNvc3htN3B2NW52bTlwIn0.7dCCLGVvoDjg3AHS8m5s0Q")

    // Add the layer to your map
    layer.addTo(map)

    // Execute your function to get data
 
}

// Function for getting data
var getData = function() {

    // Execute an AJAX request to get the data in data/response.js

    
    // When your request is successful, call your customBuild function

}

// Loop through your data and add the appropriate layers and points
var customBuild = function() {
    // Be sure to add each layer to the map

    // Once layers are on the map, add a leaflet controller that shows/hides layers
  
}


