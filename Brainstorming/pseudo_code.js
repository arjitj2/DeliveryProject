var people = []
var warehouse = warehouse_address
30.times do |person|
  person.home_add = google.maps.random_address()
  person.work_add = google.maps.random_address()

  if(Math.random() < bias1) {
    person.at_home = true
  } else {
    person.at_home = false
  }

  if(Math.random() < bias2) {
    person.has_pack = true
  } else {
    person.has_pack = false
  }

  people << person
end

people.each do |person|
  if person.at_home = true
    if person.has_pack = true
      //distance matrix bullshit
end






//seeding people
people = []
bias1 = 0.7
bias2 = 0.6


function createPeople() {
  numberofpeople = parseInt(document.getElementById("people"))
  for(i=0, i<numberofpeople.length, i++) {
    createPerson()
  }
}

function createPerson() {
  person = new Object()
  person["home"] = generate_home_address()
  person["work"] = generate_work_address()
  if (Math.random()<bias1) {
    person["package"] = true
  } else {
    person["package"] = false
  }
  if (Math.random()<bias2) {
    person["is_home"] = true
  } else {
    person["is_home"] = false
  }
  people[people.length] = person
}




origins = ["Peoria, IL"]

//rectangular
latmin =
latmax = 
latrange = latmax-latmin

lonmin = 
lonmax =
lonrange = lonmax-lonmin

numberofhomes = parseInt(document.getElementById(whatever))

addresses = []

numberofhomes.times do 
  lat = latmin + (latrange*Math.random())
  lon = lonmin + (lonrange*Math.random())


end

