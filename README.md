This project visualizes earthquake data using the Leaflet JavaScript library. The visualization includes data markers that represent earthquake magnitudes and depths, with dynamic styling based on magnitude (size) and depth (color). It also features an interactive map with popups providing detailed information about each earthquake. Additionally, an optional feature visualizes tectonic plate boundaries to showcase the relationship between seismic activity and tectonic movements.

Features

Part 1: Earthquake Visualization

Data Source:

  The earthquake data is sourced from the USGS GeoJSON Feed.
  The dataset used includes all earthquakes from the past 7 days.

Interactive Map:

  Earthquakes are plotted on the map based on their latitude and longitude.
  Marker size reflects the magnitude of the earthquake.
  Marker color reflects the depth of the earthquake.

Popups:

  Each marker includes a popup with detailed information:
  Location: The place where the earthquake occurred.
  Magnitude: The magnitude of the earthquake.
  Depth: The depth of the earthquake in kilometers.

Legend:

  A legend provides context for the depth-based color coding.

Part 2: Optional Enhancements

Tectonic Plate Visualization:

  Tectonic plate boundaries are added using data from the Fraxen Tectonic Plates GitHub Repository.

Layer Controls:

  Separate layers for earthquakes and tectonic plates can be toggled on and off independently.

Base Maps:

  Multiple base maps are included, allowing users to switch between views.

