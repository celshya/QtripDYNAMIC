import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES

try{
  let response = await fetch(config.backendEndpoint+"/cities");
  let user = await response.json();
  return user;
}
  catch(err){
   
    return null;
  }
  // 1. Fetch cities using the Backend API and return the data
}



//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
 console.log(id)
  let row = document.getElementById("data")
  let col = document.createElement("div");
  col.id=id
  col.setAttribute("class","col-12 col-sm-6 col-lg-3 mb-4")
  col.innerHTML=` 
  <a href="pages/adventures/?city=${id}" id=${id}>
    <div class="tile">
      <img class="img-fluid" src=${image} />
      <div class="tile-text text-center text-white">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
    </div>
  </a>`

  row.append(col)
}

export { init, fetchCities, addCityToDOM };
