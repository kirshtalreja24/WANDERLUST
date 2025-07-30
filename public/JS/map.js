mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 10 // starting zoom
});

const popupOffsets = {
    'top': [0, 25],
    'bottom': [0, -25],
    'left': [25, 0],
    'right': [-25, 0]
};


// console.log(coordinates);
const popup = new mapboxgl.Popup({ offset: popupOffsets, className: 'my-class' })
    .setHTML(`
        <h4> ${listing.location} </h4>
        <p> Exact location provided after booking </p>`);

// Create the marker
const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(popup) 
    .addTo(map);
