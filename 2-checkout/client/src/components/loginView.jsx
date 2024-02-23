import React from 'react';
const LoginView = ({form, handleTextChange, nextStep})=>{
/*
{
    "sessionID": "testSessionID",
    "name": "Glen Coco",
    "email": "haha@gmail.com",
    "password": "123456"
}
*/
const handleChanges = (e)=>{
  handleTextChange(e)
 // console.log(e);
}

const handleNextStep = (e) => {
  let currentStep = 1;
  if(form.name && form.email && form.email && form.password){
  let body = {
    "sessionID": form.sessionID,
    "name": form.name,
    "email": form.email,
    "password": form.password
  }
  nextStep(e, body, currentStep)
  } else {
    alert("Please complete all fields")
  }
}

return(
<>
<label for="name">Name: </label><input id = "name" onChange={(e)=>{handleChanges(e)}}/><br></br>
<label for="email">Email: </label><input id = "email" onChange={(e)=>{handleChanges(e)}}/><br></br>
<label for="password">Password: </label><input id = "password" onChange={(e)=>{handleChanges(e)}}/><br></br>
<button id = "toAddress" onClick={(e)=>{handleNextStep(e)}}>Continue to shipping info</button>
</>
)
}
export default LoginView