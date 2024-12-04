// app.js
function initMap() {
    // Initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.7128, lng: -74.0060 }, // Default to New York City
        zoom: 12,
    });

    // Create a search box and link it to the input element
    const input = document.getElementById("search-box");
    const searchBox = new google.maps.places.SearchBox(input);

    // Bias search results to map's current bounds
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    // Add markers to the map
    const markers = [];
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) return;

        // Clear out old markers
        markers.forEach(marker => marker.setMap(null));
        markers.length = 0;

        // Fit map to the new markers
        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
            if (!place.geometry || !place.geometry.location) return;

            // Add a marker for each place
            markers.push(
                new google.maps.Marker({
                    map,
                    position: place.geometry.location,
                    title: place.name,
                })
            );

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

// Load the map after the page has loaded
window.onload = initMap;
