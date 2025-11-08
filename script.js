mapboxgl.accessToken = 'pk.eyJ1Ijoicmlhbm5hc2Ftc29uIiwiYSI6ImNtaGEwZmw3MDBoMmQyaXB5YWtuOTRxYXQifQ.4UKVovVdhn3VLZFlhi5AJA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/riannasamson/cmhoux5b9005m01srh38lf8vp',
  center: [-122.15213, 38.05420],
  zoom: 17,
  minZoom: 15
});

map.on('load', function() {
  map.addSource('property-area', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/riannasamson/Swenson-Garden/refs/heads/main/data/property-area.geojson'
  });

  // Property Area layer
  map.addLayer({
    id: 'property-layer',
    type: 'fill',
    source: 'property-area',
    paint: {
      'fill-color': '#efe1c7',
      'fill-opacity': .5,
      'fill-outline-color': '#000000'
    }
  });

  // Buildings layer
  map.addSource('buildings', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/riannasamson/Swenson-Garden/refs/heads/main/data/buildings.geojson'
  });

  map.addLayer({
    id: 'buildings-layer',
    type: 'fill',
    source: 'buildings',
    paint: {
    'fill-color': [ // Making the garden green
      'match',
      ['get', 'Building ID'],
      'C', '#c7d89e',         
      '#807c8f'   // Making the other buildings gray
    ],
    'fill-opacity': 0.8,
    'fill-outline-color': '#000000'
    }
  });

  // Add click event for building popups
      map.on('click', 'buildings-layer', (e) => {
        const coordinates = e.lngLat;
            const properties = e.features[0].properties;

    // Create popup content using the actual building data properties
        const popupContent = `
            <div>
                <h3>${properties.Name}</h3>
                <p><strong>Name:</strong> ${properties.Name}</p>
                <p><strong>Property Owner:</strong> ${properties["Property Owner"]}</p>
                <p><strong>Address:</strong> ${properties["Address"]}</p>
                ${properties.Link ? `<p><a href="${properties.Link}" target="_blank">More Information</a></p>` : ''}
                ${properties["Building ID"] ? `<p><strong>Building ID:</strong> ${properties["Building ID"]}</p>` : ''}
            </div>
        `;

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });

  // Trees layer
  map.addSource('trees', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/riannasamson/Swenson-Garden/refs/heads/main/data/trees.geojson'
  });

  map.addLayer({
    id: 'trees-layer',
    type: 'circle',
    source: 'trees',
    paint: {
      'circle-color': '#b3d69d',
      'circle-radius': 8,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#000000'
      }
    });

    // Add click event for tree popups
      map.on('click', 'trees-layer', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
            const properties = e.features[0].properties;

    // Create popup content using the actual tree data properties
        const popupContent = `
            <div>
                <h3>${properties["Tree Type"]}</h3>
                <p><strong>Tree Type:</strong> ${properties["Tree Type"]}</p>
                <p><strong>Notes:</strong> ${properties["Notes"]}</p>
                <p><strong>Tree ID:</strong> ${properties["Tree ID"]}</p>
            </div>
        `;

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });

    // Change cursor to pointer when hovering over points
    map.on('mouseenter', 'buildings-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change cursor back when leaving points
    map.on('mouseleave', 'buildings-layer', () => {
        map.getCanvas().style.cursor = '';
    });
});
