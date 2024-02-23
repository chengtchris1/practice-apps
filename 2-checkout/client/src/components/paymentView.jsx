import React from 'react';
const PaymentView = ({form, handleTextChange, nextStep})=>{
  const handleChanges = (e)=>{
    handleTextChange(e)
   // console.log(e);
  }

  const handleNextStep = (e) => {
    let currentStep = 3;
    if(form.creditCard && form.expiryDate && form.cvv && form.billZip){
    let body = {
      "creditCard": form.creditCard,
      "expiryDate": form.expiryDate,
      "cvv": form.cvv,
      "billZip": form.billZip
    }
    nextStep(e, body, currentStep)
    } else {
      alert("Please complete all fields")
    }
  }
return(
<>
<label for="creditCard">CC number: </label><input id = "creditCard" onChange={(e)=>{handleChanges(e)}}/><br></br>
<label for="expiryDate">expiryDate: </label><input id = "expiryDate" onChange={(e)=>{handleChanges(e)}}/><br></br>
<label for="cvv">cvv: </label><input id = "cvv" onChange={(e)=>{handleChanges(e)}}/><br></br>
<label for="billZip">billZip: </label><input id = "billZip" onChange={(e)=>{handleChanges(e)}}/><br></br>
<button id = "toSummary" onClick = {(e)=>{handleNextStep(e)}}>Continue to summary</button>
</>
)
}
export default PaymentView;