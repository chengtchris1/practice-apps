import React from 'react';
/*
{
    "sessionID": "testSessionID",
    "address1": "999 state street",
    "address2": null,
    "city": "Santa Barbara",
    "shipZip": "93177",
    "state": "CA",
    "phone": "510-555-5555"
}
*/
const AddressView = ({form, handleTextChange, nextStep})=>{

const handleChanges = (e)=>{
handleTextChange(e)
}

const handleNextStep = (e) => {
    let currentStep = 2;
    if(form.address1 && form.city && form.shipZip && form.state && form.phone){
    let body = {
        "address1": form.address1,
        "address2": form.address2,
        "city": form.city,
        "shipZip": form.shipZip,
        "state": form.state,
        "phone": form.phone
    }
    nextStep(e, body, currentStep)
    } else {
      alert("Please complete all fields")
    }
  }

return(
<>
<label>Address Line 1: </label><input id = "address1" onChange={(e)=>{handleChanges(e)}}></input><br></br>
<label>Address Line 2:  </label><input id = "address2" onChange={(e)=>{handleChanges(e)}}></input><br></br>
<label>City: </label><input id="city" onChange={(e)=>{handleChanges(e)}}></input><br></br>
<label>Shipping Zip Code: </label><input id="shipZip" onChange={(e)=>{handleChanges(e)}}></input><br></br>
<label>State:</label><input id="state" onChange={(e)=>{handleChanges(e)}}></input><br></br>
<label>Phone:</label><input id="phone" onChange={(e)=>{handleChanges(e)}}></input><br></br>
<button id = "toPayment" onClick = {(e)=>{handleNextStep(e)}}>Continue to payment:</button>
</>
)
}
export default AddressView;