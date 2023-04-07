let map = L.map("map", {
    center: [34.05,-118.24],
    zoom: 4
});


// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson'
let colors = ['#FF5733','#FF8B33','#FFB733','#FFE033','#D1EE1F','#85FF15']

d3.json(url).then((response) => {
    let quakes = response.features;

    // console.log(quakes);
    // let colors = ['#FF5733','#FF8B33','#FFB733','#FFE033','#D1EE1F','#85FF15']

    for (let i = 0; i < quakes.length; i++) {
        let location = quakes[i].geometry;
        let mag = quakes[i].properties.mag;
        let rad = mag*10000;
        let color = '';
        let date = new Date(quakes[i].properties.time);
        if (location.coordinates[2] > 90) {
            color = colors[0]
        }
        else if (location.coordinates[2] > 70) {
            color = colors[1]
        }
        else if (location.coordinates[2] > 50) {
            color = colors[2]
        }
        else if (location.coordinates[2] > 30) {
            color = colors[3]
        }
        else if (location.coordinates[2] > 10) {
            color = colors[4]
        }
        else {
            color = colors[5]
        }
        let marker = L.circle([location.coordinates[1], location.coordinates[0]], {
            color: color,
            fillColor: color,
            fillOpacity: .9,
            radius: rad}).addTo(map);            
        let popup = marker.bindPopup(`<strong>Location: ${quakes[i].properties.place}<br />Date/Time: ${date}<br />Magnitude: ${quakes[i].properties.mag}
            <br />Depth: ${location.coordinates[2]}`);
        }
        
  // Set up the legend.
  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function(map) {
    let div = L.DomUtil.create("div", "legend");
    let labels = [">90","70-90",'50-70','30-50','10-30','<10'];
    div.innerHTML += "<h4>Quake Depth</h4>";
    for (let i = 0; i < labels.length; i++) {
        div.innerHTML += `<i style="background: ${colors[i]}"></i><span>${labels[i]}</span><br>`;
  }

    return div;
  };
  
  legend.addTo(map);

    }
    
);