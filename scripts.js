// Initialize the map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 36.7372, lng: -119.7871}, // Fresno County coordinates
      zoom: 10 // Zoom level
  });

  // Load route data and add markers
  loadRouteData(map);
}

// Function to load route data
function loadRouteData(map) {
  // Load CSV files and parse route data
  Papa.parse("data/routes.csv", {
      download: true,
      header: true,
      complete: function(results) {
          var routes = results.data;
          routes.forEach(function(route) {
              var marker = new google.maps.Marker({
                  position: {lat: parseFloat(route.latitude), lng: parseFloat(route.longitude)},
                  map: map,
                  title: route.routeNumber
              });
              marker.addListener('click', function() {
                  // You'll implement this part in a later step
              });
          });
      }
  });
}
