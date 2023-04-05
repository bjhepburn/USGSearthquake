let map = L.map("map", {
    center: [34.05,-118.24],
    zoom: 6
});


// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson'

d3.json(url).then((response) => {
    let quakes = response.features;

    console.log(quakes);
    
    for (let i = 0; i < quakes.length; i++) {
        let location = quakes[i].geometry;
        let mag = quakes[i].properties.mag;
        let rad = mag*10000;
        let color = '';
        let date = new Date(quakes[i].properties.time * 1000);
        if (location.coordinates[2] > 90) {
            color = '#FF5733'
        }
        else if (location.coordinates[2] > 70) {
            color = '#FF8B33'
        }
        else if (location.coordinates[2] > 50) {
            color = '#FFB733'
        }
        else if (location.coordinates[2] > 30) {
            color = '#FFE033'
        }
        else if (location.coordinates[2] > 10) {
            color = '#D1EE1F'
        }
        else {
            color = '#85FF15'
        }
        let marker = L.circle([location.coordinates[1], location.coordinates[0]], {
            color: color,
            fillColor: color,
            fillOpacity: .9,
            radius: rad}).addTo(map);            
        let popup = marker.bindPopup(`<strong>Location: ${quakes[i].properties.place}<br />Date/Time: ${date}<br />Magnitude: ${quakes[i].properties.mag}
            <br />Depth: ${location.coordinates[2]}`);
        }
        
        L.control.Legend({
            position: "bottomright",
            legends: [{
                label: "Marker1",
                type: "image",
                url: "marker/marker-red.png",
            }]
        }).addTo(map);

    }
    
);