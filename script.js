mapboxgl.accessToken = 'pk.eyJ1Ijoicmlhbm5hc2Ftc29uIiwiYSI6ImNtaGEwZmw3MDBoMmQyaXB5YWtuOTRxYXQifQ.4UKVovVdhn3VLZFlhi5AJA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/riannasamson/cmhoux5b9005m01srh38lf8vp',
  center: [-122.15213, 38.05420],
  zoom: 17
});

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
      'fill-opacity': 1.0
    }
  });
});
