// Initialize the map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 36.7372, lng: -119.7871 }, // Fresno County coordinates
        zoom: 10 // Zoom level
    });

    // Define routes data
    var routesData = [
        { routeNumber: 5, csvPath: "data/route_5.csv" },
        { routeNumber: 33, csvPath: "data/route_33.csv" }
        // Add data for other routes
    ];

    // Load and parse CSV files for each route
    routesData.forEach(function (route) {
        Papa.parse(route.csvPath, {
            download: true,
            header: true,
            complete: function (results) {
                var avenues = results.data.map(function (row) {
                    return row.Description; // Assuming the avenue name column is named Description
                });
                createRoute(map, avenues);
            }
        });
    });
}

// Function to create route line and segments
function createRoute(map, avenues) {
    var routeLine = new google.maps.Polyline({
        path: [],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });

    // Add segments for each avenue along the route
    avenues.forEach(function (avenue) {
        // Sample coordinates (replace with actual coordinates)
        var coordinates = [
            { lat: 36.8, lng: -119.7 },
            { lat: 36.7, lng: -119.7 }
            // Add more coordinates as needed
        ];

        // Add segment for the avenue
        coordinates.forEach(function (coord) {
            routeLine.getPath().push(new google.maps.LatLng(coord.lat, coord.lng));
        });

        // Add event listener for hover
        google.maps.event.addListener(routeLine, 'mouseover', function (event) {
            // Display avenue name on hover (you can implement this)
            console.log(avenue);
        });

        // Add event listener for click
        google.maps.event.addListener(routeLine, 'click', function (event) {
            // Display graphs on click (you can implement this)
            console.log("Display graphs for " + avenue);
        });
    });
}
