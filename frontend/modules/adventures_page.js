
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  let city = search.split("=")[1];
  return city
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  try{
  let advfetch = await fetch(config.backendEndpoint+`/adventures?city=${city}`)
  let res  =  await advfetch.json();
  
  return res;

  }
  catch(err){
  
    return null;
  }
  // 1. Fetch adventures using the Backend API and return the data

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {

  adventures.forEach(element => {
    
    let row = document.getElementById("data");
    
    let col = document.createElement("div")
    col.setAttribute("class","col-12 col-sm-6 col-lg-3 mb-4 ")

    col.innerHTML=`<a href="detail/?adventure=${element.id}" id=${element.id}>
    <div class="activity-card">
    <div class="category-banner"><h6>${element.category}</h6></div>
    
      <img src="${element.image}" class="activity-card-image" alt="...">
    <div class="px-2">
      <div class="d-md-flex justify-content-between ">
        <div class="mr-5 p-2"><p>${element.name}</p></div>
        <div class="p-2 ml-auto"><p>₹${element.costPerHead}</p></div>
      </div>
      <div class="d-md-flex justify-content-between ">
        <div class="mr-5 p-2 "><p>Duration</p></div>
        <div class="p-2 ml-auto  "><p>${element.duration} Hours</p></div>
      </div>
     </div> 
    </div>
    </div>
  </a>`


    row.appendChild(col)
  });
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
 
  let filteredlist=[]
  list.forEach((ele)=>{
  
    if((ele.duration>=parseInt(low)) && (ele.duration<=parseInt(high))){
      filteredlist.push(ele)
    }
  })

    return filteredlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredlist=[]
 for(let i of categoryList){
 list.forEach((ele)=>{
  if(ele.category==i){
    filteredlist.push(ele)
  }
 })
 }
 
 

  return filteredlist;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
 

            let filteredlist =[];
            let categorylist = filters["category"]
            let low=filters["duration"].split("-")[0]
            let high=filters["duration"].split("-")[1]





            if(filters["category"].length>0 && filters["duration"].length>0){
          
            let templist =filterByCategory(list,categorylist)

            filteredlist=filteredlist.concat(filterByDuration(templist,low,high))

            
            
          //     filteredlist=filteredlist.concat(filterByDuration(filteredlist,high,low))
              
              
            }
            else if(filters["category"].length>0){
              filteredlist=filteredlist.concat(filterByCategory(list,categorylist))
              
            }
          else if(filters["duration"].length>0){
            filteredlist=filteredlist.concat(filterByDuration(list,low,high))
            
            
          }
          else{
            return list;
          }


            // Place holder for functionality to work in the Stubs
          
            return filteredlist;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  // JSON.stringify(localStorage.filters)
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object 

  return JSON.parse(window.localStorage.getItem('filters'));

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM



function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
let list = (filters.category)

list.forEach((ele)=>{
  let catlist = document.getElementById("category-list");
  let categorydom = document.createElement("div")
  
  categorydom.setAttribute("class","category-filter d-flex ")
 
  categorydom.innerHTML=`<div class="me-2 my-2">${ele}</div>`
  let cancelbutton =document.createElement("button")

  cancelbutton.innerText="x"
  
  cancelbutton.id="cancel"
 
  cancelbutton.className="btn me-0"
  // cancelbutton.setAttribute("onclick","removeDOMforpills(event)")
  
  categorydom.appendChild(cancelbutton)
  catlist.appendChild(categorydom)
 
  
    cancelbutton.addEventListener("click",(e)=>{
       
        catlist.removeChild(categorydom)
        let index = list.indexOf(ele);
        console.log("Remove : " + list.splice(index) );
        
        adventures.filter((adv)=>categorylist.includes(adv.category))
    
})


})


 

  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
