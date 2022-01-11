var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Creating the map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


d3.json(url).then(function (response) {
    z = []
    for (let i = 0; i < response.features.length; i++) {
        // Conditionals for country points
        var color = "";
        var zCord = response.features[i].geometry.coordinates[2]
        if (zCord > -10 && zCord < 10) {
            color = "#4efc03";
        }
        else if (zCord >= 10 && zCord < 30) {
            color = "#bafc03";
        }
        else if (zCord >= 30 && zCord < 50) {
            color = "#fcec03";
        }
        else if (zCord >= 50 && zCord < 70) {
            color = "#fc9003";
        }
        else if (zCord >= 70 && zCord < 90) {
            color = "#fc4903";
        }
        else {
            color = "#fc0303";
        }

        cord = [
            response.features[i].geometry.coordinates[1],
            response.features[i].geometry.coordinates[0],
            response.features[i].geometry.coordinates[2]
        ];
        z.push(cord[2]);
        // Add circles to the map.
        L.circle(cord, {
            fillOpacity: 0.75,
            color: color,
            // Adjust the radius.
            radius: Math.sqrt(Math.abs(zCord)) * 10000
        }).bindPopup(`<h1>${"Val 1"}</h1> <hr> <h3>Points: ${"Val 2"}</h3>`).addTo(myMap);
    };
});