// Initialize the map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 36.7372, lng: -119.7871 }, // Fresno County coordinates
        zoom: 10 // Zoom level
    });

    // Define routes data
    var routesData = [
        { routeNumber: 5, csvPath: "data/route_5.csv" },
        { routeNumber: 33, csvPath: "data/route_33.csv" },
        // Add data for other routes as needed
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
                createRoute(map, avenues, route.routeNumber);
            }
        });
    });
}

// Function to create route line and segments
function createRoute(map, avenues, routeNumber) {
    var routeLine = new google.maps.Polyline({
        path: [],
        geodesic: true,
        strokeColor: getRandomColor(),
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });

    // Sample coordinates for demonstration purposes (replace with actual coordinates)
    var baseLatLng = { lat: 36.7372, lng: -119.7871 };
    var offset = 0.01;

    avenues.forEach(function (avenue, index) {
        // Sample coordinates (generate a new point for each avenue)
        var coordinates = [
            { lat: baseLatLng.lat + (index * offset), lng: baseLatLng.lng },
            { lat: baseLatLng.lat + (index * offset), lng: baseLatLng.lng + offset }
        ];

        coordinates.forEach(function (coord) {
            routeLine.getPath().push(new google.maps.LatLng(coord.lat, coord.lng));
        });

        // Add event listener for hover
        google.maps.event.addListener(routeLine, 'mouseover', function (event) {
            // Display avenue name on hover (implement as needed)
            console.log(avenue);
        });

        // Add event listener for click
        google.maps.event.addListener(routeLine, 'click', function (event) {
            // Display graphs on click (implement as needed)
            console.log("Display graphs for " + avenue);
        });
    });
}

// Utility function to generate random color for routes
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
