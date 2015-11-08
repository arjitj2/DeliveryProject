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
numberofpeople = parseInt(document.getElementById(whatever))

function createPeople() {
  for(i=0, i<numberofpeople.length, i++) {
    createPerson(i)
  }
}

function createPerson(i) {
  
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

