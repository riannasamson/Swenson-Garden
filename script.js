mapboxgl.accessToken = 'pk.eyJ1Ijoicmlhbm5hc2Ftc29uIiwiYSI6ImNtaGEwZmw3MDBoMmQyaXB5YWtuOTRxYXQifQ.4UKVovVdhn3VLZFlhi5AJA';
const map = new mapboxgl.Map({
    container: 'map', // this is the container ID that we set in the HTML
    style: 'mapbox://styles/riannasamson/cmhoux5b9005m01srh38lf8vp', // Your Style URL goes here
    center: [-122.15213, 38.05420], // starting position [lng, lat]. Note that lat must be set between -90 and 90. You can choose what you'd like.
    zoom: 17 // starting zoom, again you can choose the level you'd like.
   });

// Property Area
map.on('load', function() {
    map.addSource('property-area', {
      type: 'geojson',
      data: 'https://raw.githubusercontent.com/riannasamson/Swenson-Garden/refs/heads/main/data/property-area.geojson'
  });

map.addLayer({
    id: 'property-layer',
    type: 'fill',
    source: 'property-area',
    paint: {
      'fill-color': '#efe1c7',
      'fill-opacity': 0.2
    }
});
