import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
    let search_id =new  URLSearchParams(search)
    return search_id.get("adventure");


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let detailfetch = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`)
    let res  =  await detailfetch.json();
   
    return res;
  }
catch(e){
  return null;
}
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventurename = document.getElementById("adventure-name")
  adventurename.innerHTML=adventure.name;
  
  let subtitle = document.getElementById("adventure-subtitle")
  subtitle.innerHTML=adventure.subtitle;
  

  let gallery = adventure.images;
//   gallery.forEach(element => {
//     let img = document.createElement("div")
//     let img_gallery = document.getElementById("photo-gallery")
//     img.innerHTML=`<img src="${element}" class="activity-card-image"/>`
//     img_gallery.appendChild(img)
//   });

  let adv_content = document.getElementById("adventure-content")
  adv_content.innerText=adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let gallery = document.getElementById("photo-gallery")
  gallery.className="carousel slide";
  gallery.setAttribute("data-bs-ride","carousel")
  gallery.id="carouselExampleIndicators";
 
  let corousel_div = document.createElement("div")
  corousel_div.className="carousel-indicators";
  corousel_div.id="indicator";
  gallery.appendChild(corousel_div);
  let corousel_inner = document.createElement("div");
  corousel_inner.id ="inner";
  corousel_inner.className="carousel-inner";
  gallery.appendChild(corousel_inner);
  

  images.forEach((ele,idx)=>{
   
    let fix=(idx===0)?"active":""
    let aria=(idx===0)?"true":""
 
    let cor = document.getElementById("indicator")
    cor.innerHTML=cor.innerHTML+`<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${idx}" class="${fix}" aria-current="${aria}" aria-label="Slide ${idx+1}"></button>`

    let inner = document.getElementById("inner");
    inner.innerHTML=inner.innerHTML+` <div class="carousel-item ${fix}">
            <img src="${ele}" class="d-block w-100 object-fit" id="imgtag" alt="...">
          </div>`
})


//  <div class="carousel-inner">
//        <div class="carousel-item ${fix}">
//          <img src="${ele}" class="d-block w-100" alt="...">
//        </div>
//     </div> 



let cor = document.getElementById("carouselExampleIndicators")
cor.innerHTML= cor.innerHTML+`
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
</button>`

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    
    document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";

  }
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.


}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field


  if(persons){
  let price =("price",adventure.costPerHead)
  let cost=  parseInt(persons)*price
document.getElementById("reservation-cost").innerHTML=cost
}
  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  let formElement  = document.getElementById('myForm');
  formElement.addEventListener('submit',async(event) => {
    console.log(event);
    event.preventDefault();
    try{
      let newReservationUrl = config.backendEndpoint + "/reservations/new";
      let res = await fetch(newReservationUrl, {
        method: "POST",
        body: JSON.stringify({
          name: formElement.elements['name'].value,
          date: formElement.elements['date'].value,
          person: formElement.elements["person"].value,
          adventure: adventure.id
        }),
        headers: {
          "Content-type": "application/json"
        }
      });
      if(res.ok){
        alert("Success!");
        console.log(res);
        window.location.reload();
      }else{
        let data = await res.json();
        alert(`Failed - ${data.message}`);
      }
    }catch(err){
      alert(err);
    }
});
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if(adventure.reserved){
 document.getElementById("reserved-banner").style.display="block";

}
else{
  document.getElementById("reserved-banner").style.display="none";
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
