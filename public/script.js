// Initialize Leaflet map centered on Vancouver
const map = L.map('map').setView([49.2827, -123.1207], 12);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add marker
L.marker([49.2827, -123.1207])
  .addTo(map)
  .bindPopup('Hello Vancouver!')
  .openPopup(); 
