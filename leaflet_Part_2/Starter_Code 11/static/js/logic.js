// Create the 'basemap' tile layer that will be the background of our map.
const basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map
const street = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of OSM France'
});

// Create the map object with center and zoom options.
const map = L.map('map', {
  center: [20, 0], // Latitude and Longitude (global center)
  zoom: 2,         // Default zoom level
  
// Then add the 'basemap' tile layer to the map.

  layers: [basemap] // Add the 'basemap' by default
});
// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
// Add a control to the map that will allow the user to change which layers are visible.
const earthquakes = new L.LayerGroup();
const tectonicPlates = new L.LayerGroup();
const baseMaps = {
  "Basemap": basemap
};

// Overlay layers
const overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates
};
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.7,
      fillColor: getColor(feature.geometry.coordinates[2]), // Depth determines color
      color: "#000000",
      radius: getRadius(feature.properties.mag), // Magnitude determines radius
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
    if (depth > 90) return "#ea2c2c"; // Deep red for >90 km
    if (depth > 70) return "#ea822c"; // Orange for 70-90 km
    if (depth > 50) return "#ee9c00"; // Yellow-orange for 50-70 km
    if (depth > 30) return "#eecc00"; // Yellow for 30-50 km
    if (depth > 10) return "#d4ee00"; // Light yellow for 10-30 km
    return "#98ee00"; // Green for <10 km
  
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    return magnitude === 0 ? 1 : magnitude * 4; // Scale radius; minimum size of 1
  }
  

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        `<strong>Location:</strong> ${feature.properties.place}<br>
         <strong>Magnitude:</strong> ${feature.properties.mag}<br>
         <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km`
      );
    }
  }).addTo(earthquakes);
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  earthquakes.addTo(map);
});

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend
    const depthIntervals = [-10, 10, 30, 50, 70, 90];
    const colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];
    

    // Loop through our depth intervals to generate a label with a colored square for each interval.
    for (let i = 0; i < depthIntervals.length; i++) {
      div.innerHTML +=
        `<i style="
          background: ${colors[i]};
          width: 18px;
          height: 18px;
          display: inline-block;
          margin-right: 8px;
      "></i>` +
      `${depthIntervals[i]}${depthIntervals[i + 1] ? "&ndash;" + depthIntervals[i + 1] : "+"}<br>`;
    }

    return div;
  };

  // Finally, add the legend to the map.
  legend.addTo(map);

  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    // Save the geoJSON data, along with style information, to the tectonic_plates layer.
    L.geoJson(plate_data, {
      color: "#ff5733", // Orange-red for plate boundaries
      weight: 2
    }).addTo(tectonicPlates);
  
    

    // Then add the tectonic_plates layer to the map.
    tectonicPlates.addTo(map);
  });
