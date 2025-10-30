// ================= TAB SWITCHING =================
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active state from all buttons and contents
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    // Activate the clicked button and its corresponding content
    button.classList.add('active');
    document.getElementById(button.dataset.target).classList.add('active');

    // Resize both maps (Leaflet needs to recalc after display:none)
    setTimeout(() => {
      vancouverMap.invalidateSize();
      geojsonMap.invalidateSize();
    }, 200);
  });
});

// ================= VANCOUVER MAP =================

// Base layers
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { maxZoom: 17 });

// Initialize map centered on Vancouver
const vancouverMap = L.map('map-vancouver', {
  center: [49.2827, -123.1207],
  zoom: 12,
  layers: [osm]
});

// Layer control
L.control.layers({ "OSM": osm, "Topographic": topo }).addTo(vancouverMap);

// Add marker
L.marker([49.2827, -123.1207])
  .addTo(vancouverMap)
  .bindPopup('Hello Vancouver!')
  .openPopup();

// Add multiple locations
const locations = [
  { name: 'Stanley Park', coords: [49.3043, -123.1443] },
  { name: 'UBC', coords: [49.2606, -123.2460] },
  { name: 'Metrotown', coords: [49.2276, -123.0008] }
];

locations.forEach(loc => {
  L.marker(loc.coords).addTo(vancouverMap)
    .bindPopup(`<b>${loc.name}</b>`);
});

// Circle for Downtown
L.circle([49.2827, -123.1207], {
  color: 'blue',
  fillColor: '#3f8efc',
  fillOpacity: 0.4,
  radius: 2000
}).addTo(vancouverMap).bindPopup('Downtown Vancouver Area');

// Polygon (Stanley Park boundary example)
L.polygon([
  [49.307, -123.157],
  [49.314, -123.142],
  [49.306, -123.116],
  [49.297, -123.126]
]).addTo(vancouverMap).bindPopup('Stanley Park');

// Click event popup
vancouverMap.on('click', function (e) {
  L.popup()
    .setLatLng(e.latlng)
    .setContent(`You clicked at<br>${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`)
    .openOn(vancouverMap);
});


// ================= GEOJSON DEMO MAP =================

// Initialize another map for GeoJSON testing
const geojsonMap = L.map('map-geojson', {
  center: [49.28, -123.12],
  zoom: 12
});

// Base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(geojsonMap);

// Load sample GeoJSON data (demo polygons)
fetch('data/demo.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: { color: 'red', weight: 2, fillOpacity: 0.4 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`<b>${feature.properties.name}</b>`);
      }
    }).addTo(geojsonMap);
  })
  .catch(err => console.error('Error loading GeoJSON:', err));
