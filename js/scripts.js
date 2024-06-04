// Initialize the map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 36.7372, lng: -119.7871 }, // Fresno County coordinates
        zoom: 12 // Zoom level
    });

    // Load and parse CSV file for route 5
    Papa.parse("data/route_5.csv", {
        download: true,
        header: true,
        complete: function (results) {
            var avenues = results.data.map(function (row) {
                return {
                    name: row.Description,
                    lat: parseFloat(row.Latitude), // Parse latitude from CSV
                    lng: parseFloat(row.Longitude) // Parse longitude from CSV
                };
            });
            createRoute(map, avenues);
        }
    });
}

// Function to create route line and segments
function createRoute(map, avenues) {
    var routePath = avenues.map(function (avenue) {
        return { lat: avenue.lat, lng: avenue.lng };
    });

    // Create a line for the route
    var routeLine = new google.maps.Polyline({
        path: routePath,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 5,
        map: map
    });

    // Add markers for each avenue (optional)
    avenues.forEach(function (avenue) {
        new google.maps.Marker({
            position: { lat: avenue.lat, lng: avenue.lng },
            map: map,
            title: avenue.name
        });
    });

    // Add mouseover and click event listeners to the route line
    google.maps.event.addListener(routeLine, 'mouseover', function () {
        displayAvenueName("Route 5");
    });

    google.maps.event.addListener(routeLine, 'mouseout', function () {
        hideAvenueName();
    });

    google.maps.event.addListener(routeLine, 'click', function () {
        displayGraphs("Route 5");
    });
}

// Function to display avenue name
function displayAvenueName(name) {
    var avenueLabel = document.createElement('div');
    avenueLabel.id = 'avenueLabel';
    avenueLabel.style.position = 'absolute';
    avenueLabel.style.backgroundColor = 'white';
    avenueLabel.style.padding = '5px';
    avenueLabel.style.border = '1px solid black';
    avenueLabel.style.top = '10px';
    avenueLabel.style.left = '10px';
    avenueLabel.innerHTML = name;
    document.body.appendChild(avenueLabel);
}

// Function to hide avenue name
function hideAvenueName() {
    var avenueLabel = document.getElementById('avenueLabel');
    if (avenueLabel) {
        document.body.removeChild(avenueLabel);
    }
}

// Function to display graphs
function displayGraphs(name) {
    console.log("Displaying graphs for:", name); // Check if function is called correctly

    // Dummy data for demonstration
    var data = {
        labels: ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        datasets: [{
            label: 'Back Peak Month',
            data: [12, 19, 3, 5, 2, 3, 10, 20, 15, 25],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }, {
            label: 'Back Peak Hour',
            data: [22, 29, 13, 25, 12, 23, 20, 30, 25, 35],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }, {
            label: 'Back AADT',
            data: [32, 39, 23, 35, 22, 33, 30, 40, 35, 45],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }, {
            label: 'Ahead Peak Hour',
            data: [42, 49, 33, 45, 32, 43, 40, 50, 45, 55],
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }, {
            label: 'Ahead Peak Month',
            data: [52, 59, 43, 55, 42, 53, 50, 60, 55, 65],
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }, {
            label: 'Ahead AADT',
            data: [62, 69, 53, 65, 52, 63, 60, 70, 65, 75],
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        }]
    };

    // Create a container for the graphs
    var graphContainer = document.getElementById('graphContainer');

    // Clear previous graphs
    graphContainer.innerHTML = '';

    // Create canvas elements for each graph
    for (var i = 0; i < 6; i++) {
        var canvas = document.createElement('canvas');
        canvas.id = 'chart' + i;
        graphContainer.appendChild(canvas);

        new Chart(canvas, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [data.datasets[i]]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: data.datasets[i].label
                }
            }
        });
    }
}
