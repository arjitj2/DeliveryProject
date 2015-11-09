var map
var service
var distances = []
var origin = ""
var destination = ""
var bias1 = 0.7
var bias2 = 0.6
var people = []

function initMap() {
  map = newMap()

  computeInput()
}

function newMap() {
  new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.121993, lng: -88.257614},
    zoom: 13
  })
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
              // var duration = element.duration.text;
              // var from = origins[i];
              // var to = destinations[j];
              distances[distances.length] = distance
            }
          }
        }
      }
      document.getElementById("responses").innerHTML = distances
    }
  )
}

function createPeople() {
  numberofpeople = parseInt(document.getElementById("people").value)

  for (i=0; i<numberofpeople; i++) {
    createPerson()
  }
  document.getElementById("people_array").innerHTML = JSON.stringify(people, null, 4)
}

function createPerson() {
  person = new Object()
  person["home"] = generate_home_address()
  person["work"] = generate_home_address()
  if (Math.random()<bias1) {
    person["package"] = "true"
  } else {
    person["package"] = "false"
  }
  if (Math.random()<bias2) {
    person["is_home"] = "true"
  } else {
    person["is_home"] = "false"
  }
  people[people.length] = person
}

function generate_home_address() {
  latitude = get_latitude().toString()
  longitude = get_longitude().toString()

  latlng = latitude + ", " + longitude
  return latlng
}

function get_longitude() {
  min_lon = parseFloat(document.getElementById("min_lon").value)
  max_lon = parseFloat(document.getElementById("max_lon").value)
  lon_range = max_lon - min_lon

  lng = min_lon + (Math.random() * lon_range)
  return lng
}

function get_latitude() {
  min_lat = parseFloat(document.getElementById("min_lat").value)
  max_lat = parseFloat(document.getElementById("max_lat").value)
  lat_range = max_lat - min_lat

  lat = min_lat + (Math.random() * lat_range)
  return lat
}

function generate_work_address() {

}