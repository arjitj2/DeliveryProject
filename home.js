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
  // console.log(origins)
  // console.log(destinations)
  service.route(
    {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    }, 
    function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    console.log("COMPLETE DIRECTION SERVICE")
    }
  )
  // service.getDistanceMatrix(
  //   {
  //     origins: origins,
  //     destinations: destinations,
  //     travelMode: google.maps.TravelMode.DRIVING,
  //     unitSystem: google.maps.UnitSystem.IMPERIAL,
  //   }, 
  //   function(response, status) {
  //     if (status == google.maps.DistanceMatrixStatus.OK) {
  //       var origins = response.originAddresses;
  //       var destinations = response.destinationAddresses;

  //       var element = response.rows[0].elements[0]
  //       if (element.status == "OK") {
  //         var distance = element.distance.text;
  //         var duration = element.duration.text;
  //         var from = origins[0];
  //         var to = destinations[0];
  //         // format_distance = 0
  //         // distance_array = distance.split(" ")
  //         // if (distance_array[1] == "mi") {
  //         //   format_distance = parseFloat(distance_array[0].replace(/,/g, ''))
  //         // } else if (distance_array[1] == "ft") {
  //         //   format_distance = parseFloat(distance_array[0].replace(/,/g, ''))/5280
  //         // }
  //         // total_distance += format_distance
  //         // values = []              
  //         // values.push(format_distance)
  //         // values.push(duration)
  //       }
  //     }
  //     // document.getElementById("responses").innerHTML = format_distance
  //     // document.getElementById("temp1").innerHTML = values[0]
  //     // document.getElementById("temp2").innerHTML = values[1]
  //     // console.log(parseFloat(document.getElementById("temp1").innerHTML))
  //   }
  // )
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

  document.getElementById("total_distance").innerHTML = "Total Distance: " + total_distance
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

  for (i = 0; i<(address_array.length-1); i++) {
    origins = [address_array[i]]
    destinations = [address_array[i+1]]
    console.log(origins)
    console.log(destinations)

    conduct_distance_matrix(service, origins, destinations)
  }
}

function conduct_distance_matrix(service, origins, destinations) {
  distanceMatrix(service, origins, destinations)
}







