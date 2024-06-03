// Parse the CSV data
Papa.parse("data/Route_5_Common_Avenues.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      const data = results.data;
  
      // Initialize the Google Map
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 36.7378, lng: -119.7871 }, // Fresno, CA
      });
  
      // Add markers to the map
      data.forEach(function(avenue) {
        const marker = new google.maps.Marker({
          position: { lat: avenue.lat, lng: avenue.lng }, // Replace with actual latitude and longitude from the CSV
          map: map,
          title: avenue.Description,
        });
  
        // Add a click event listener to the marker
        marker.addListener("click", function() {
          // Display the data for the clicked avenue
          displayData(avenue);
        });
      });
    },
  });
  
  function displayData(avenue) {
    const dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = "";
  
    // Create a canvas element for the chart
    const canvas = document.createElement("canvas");
    dataContainer.appendChild(canvas);
  
    // Create the chart data
    const labels = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
    const backPeakHourData = [
      avenue["Back Peak Hour_2013"],
      avenue["Back Peak Hour_2014"],
      avenue["Back Peak Hour_2015"],
      avenue["Back Peak Hour_2016"],
      avenue["Back Peak Hour_2017"],
      avenue["Back Peak Hour_2018"],
      avenue["Back Peak Hour_2019"],
      avenue["Back Peak Hour_2020"],
      avenue["Back Peak Hour_2021"],
      avenue["Back Peak Hour_2022"],
    ];
  
    const backAADTData = [
      avenue["Back AADT_2013"],
      avenue["Back AADT_2014"],
      avenue["Back AADT_2015"],
      avenue["Back AADT_2016"],
      avenue["Back AADT_2017"],
      avenue["Back AADT_2018"],
      avenue["Back AADT_2019"],
      avenue["Back AADT_2020"],
      avenue["Back AADT_2021"],
      avenue["Back AADT_2022"],
    ];
  
    // Create the chart
    const chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Back Peak Hour",
            data: backPeakHourData,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Back AADT",
            data: backAADTData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }