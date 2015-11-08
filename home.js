var map
var service
var distances = []
var origin = ""
var destination = ""

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.121993, lng: -88.257614},
    zoom: 13
  })

  computeInput()
}

function computeInput() {
  distances = []
  service = new google.maps.DistanceMatrixService()

  origins = [document.getElementById("origin").value]
  destinations = [document.getElementById("dest").value]

  distanceMatrix(service, origins, destinations)
}

function distanceMatrix(service, origins, destinations) {
  service.getDistanceMatrix(
    {
      origins: origins,
      destinations: destinations,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    }, function(response, status) {
      if (status == google.maps.DistanceMatrixStatus.OK) {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;

        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            if (element.status == "OK") {
              var distance = element.distance.text;
              var duration = element.duration.text;
              var from = origins[i];
              var to = destinations[j];
              distances[distances.length] = distance
            }
          }
        }
      }
      document.getElementById("responses").innerHTML = distances
    }
  )
}