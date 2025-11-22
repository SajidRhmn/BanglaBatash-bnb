mapboxgl.accessToken = mapToken;

// Only initialize map if coordinates exist
if (coordinates) {
    const map = new mapboxgl.Map({
            container: 'map', // container ID
            center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom: 13.3 // starting zoom
    });
    // console.log(coordinates);


    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker({ color: 'red' })
            .setLngLat(coordinates)  // Listing.geometry.coordinate
            .setPopup(new mapboxgl.Popup({offset: 25})
            .setHTML("<h7>Exact location will be revealed upon confirmation. </h7>"))
            .addTo(map);
} else {
    // Hide map container if no coordinates
    document.getElementById('map').innerHTML = '<p>Location not available</p>';
}