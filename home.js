//VARIABLE DECLARATION

var map
var service
var geocoder
var distances = []
var origin = ""
var destination = ""
var bias1 = 0.7
var bias2 = 0.6
var people = []

//MAP INITIALIZATION

function initMap() {
  map = newMap()
  geocoder = new google.maps.Geocoder

  computeInput()
}

function newMap() {
  new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.121993, lng: -88.257614},
    zoom: 13
  })
}

//DISTANCE CALCULATIONS

function computeInput() {
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
              format_distance = 0
              distance_array = distance.split(" ")
              if (distance_array[1] == "mi") {
                format_distance = parseFloat(distance_array[0])
              } else if (distance_array[1] == "ft") {
                format_distance = parseFloat(distance_array[0])/5280
              }
              distances[distances.length] = format_distance
              values = []              
              values.push(format_distance)
              values.push(duration)
            }
          }
        }
      }
      document.getElementById("responses").innerHTML = distances
      document.getElementById("temp1").innerHTML = values[0]
      document.getElementById("temp2").innerHTML = values[1]
    }
  )
}

//PEOPLE ARRAY 

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
  person["work"] = generate_work_address()
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

function generate_work_address() {
  work_addresses = []
  work_addresses.push(document.getElementById("parking1").value)
  work_addresses.push(document.getElementById("parking2").value)
  work_addresses.push(document.getElementById("parking3").value)

  return work_addresses[Math.floor(Math.random()*work_addresses.length)]
}

//LATITUDE & LONGITUDE CALCULATIONS

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

//DISTANCE FOR DELIVERY CYCLE

function perform_home_delivery() {
  delivery_address = document.getElementById("warehouse").value

  address_array = generate_home_address_array(delivery_address)

  calc_values = run_delivery(address_array)

  document.getElementById("total_distance").innerHTML = "Total Distance: " + calc_values[0]
  document.getElementById("total_duration").innerHTML = "Total Duration: " + calc_values[1]
}

function generate_home_address_array(delivery_address) {
  address_array = [delivery_address]

  for (i=0; i<people.length; i++) {
    home_address = people[i].home
    address_array.push(home_address)
  };

  address_array.push(delivery_address)

  return address_array
}

function run_delivery(address_array) {
  total_distance = 0
  total_duration = 0
  service = new google.maps.DistanceMatrixService()

  for (i = 0; i<(address_array.length-1); i++) {
    origins = [address_array[i]]
    destinations = [address_array[i+1]]

    distanceMatrix(service, origins, destinations)

    // total_distance = total_distance + calc_values[0]
    // total_duration = total_distance + calc_values[1]
  }

  return [total_distance, total_duration]
}

function format_distance(distance) {

}







