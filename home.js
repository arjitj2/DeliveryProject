//VARIABLE DECLARATION

var map
var service
var directionsDisplay
var geocoder
var origin = ""
var destination = ""
var bias1 = 0.7
var bias2 = 0.6
var people = []
var total_distance = 0
var total_duration = 0

//MAP INITIALIZATION

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.121993, lng: -88.257614},
    zoom: 13
  })
  service = new google.maps.DirectionsService
  directionsDisplay = new google.maps.DirectionsRenderer
  directionsDisplay.setMap(map)

  computeInput(service, directionsDisplay)
}

//DISTANCE CALCULATIONS

function computeInput() {
  origin = document.getElementById("origin").value
  destination = document.getElementById("dest").value

  calculateAndDisplayRoute(service, directionsDisplay, origin, destination)
}

function calculateAndDisplayRoute(service, directionsDisplay, origin, destination) {
  console.log("BEGIN DIRECTION SERVICE")
  service.route(
    {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    }, callback)
}

function callback(response, status) {
  if (status === google.maps.DirectionsStatus.OK) {
    directionsDisplay.setDirections(response);

    distance = response.routes[0].legs[0].distance.text
    duration = response.routes[0].legs[0].duration.text

    format_distance = 0
    distance_array = distance.split(" ")
    if (distance_array[1] == "mi") {
      format_distance = parseFloat(distance_array[0].replace(/,/g, ''))
    } else if (distance_array[1] == "ft") {
      format_distance = parseFloat(distance_array[0].replace(/,/g, ''))/5280
    }
    console.log(format_distance)
    total_distance += format_distance

    document.getElementById("total_distance").innerHTML = "Total Distance: " + total_distance
    
  } else {
    window.alert('Directions request failed due to ' + status);
  }
  console.log("COMPLETE DIRECTION SERVICE")
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

  run_delivery(address_array)
}

function generate_home_address_array() {
  address_array = []

  for (i=0; i<people.length; i++) {
    home_address = people[i].home
    address_array.push(home_address)
  };

  return address_array
}

function run_delivery(address_array) {
  total_distance = 0
  total_duration = 0

  modified_address_array = []

  for (i = 0; i<(address_array.length-1); i++) {
    origin = address_array[i]
    destination = address_array[i+1]
    
    pair_array = [origin, destination]

    modified_address_array.push(pair_array)
  }

  async.eachSeries(modified_address_array, conduct_distance_calc, function(err) {
    if(err) {
      console.log(err)
    }
  })
}

function conduct_distance_calc(address_pair, doneCallback) {
  origin = address_pair[0]
  destination = address_pair[1]

  calculateAndDisplayRoute(service, directionsDisplay, origin, destination)

  return doneCallback(null)
}







