import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
 try{
  let response=await fetch(config.backendEndpoint+"/reservations")
  let data= await response.json()
 
  return data;
 }
 catch(e){
 
  return null;
 }

  // Place holder for functionality to work in the Stubs
 
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  console.log()
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  // console.log(document.getElementById(ele.id).children[0].href)
  if(reservations.length>0){



    document.getElementById('no-reservation-banner').style.display="none";
    document.getElementById("reservation-table-parent").style.display="block"
    let body=document.getElementById("reservation-table");

  reservations.forEach(element => {
    

   
   let tr=document.createElement("tr")
   tr.id=element.id
   
   const bookDate = new Date(element.time).toLocaleString("en-IN", {
    dateStyle: "long",
  });
  const bookTime = new Date(element.time).toLocaleString("en-IN", {
    timeStyle: "medium",
  });
  const finalBookTime = bookDate + ", " + bookTime;
    tr.innerHTML=` <a href="../detail/?adventure=${element.adventure}><td scope="col" ">${element.id}</td></a>
   
    <td scope="col">${element.name}</td>
    <td scope="col">${element.adventureName}</td>
    <td scope="col">${element.person}</td>
    <td scope="col">${new Date(element.date).toLocaleDateString("en-IN")}</td>
    <td scope="col">${element.price}</td>
    <td scope="col">${finalBookTime}</td>
    <td scope="col">  <a href="../detail/?adventure=${element.adventure}"><button class="reservation-visit-button">View Adventure</button></a></td>
    
`
   body.appendChild(tr)
  });
  //Conditionally render the no-reservation-banner and reservation-table-parent
  
  }
  else{
    document.getElementById('no-reservation-banner').style.display="block";
    document.getElementById("reservation-table-parent").style.display="none"
  }
  reservations.map((ele, idx) => {
         let chk= document.getElementById(ele.id).children[0].href
         console.log(chk)
  })
  // reservations.map((ele, idx) => {
  //   expect(document.getElementById(ele.id).children[0].href).toEqual(
  //     expect.stringContaining(`detail/?adventure=${ele.adventure}`)
  //   );
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
