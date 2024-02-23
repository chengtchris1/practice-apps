import React from 'react';
const LoginView = ({form, handleLoginChange})=>{
/*
{
    "sessionID": "testSessionID",
    "name": "Glen Coco",
    "email": "haha@gmail.com",
    "password": "123456"
}
*/

const handleChanges = (e)=>{
  handleLoginChange(e)
 // console.log(e);
}


return(
<>
<label for="name">Name: </label><input id = "name" onChange={(e)=>{handleChanges(e)}}/>
<label for="email">Email: </label><input id = "email" onChange={(e)=>{handleChanges(e)}}/>
<label for="password">Password: </label><input id = "password" onChange={(e)=>{handleChanges(e)}}/>
<button id = "toAddress" onClick={()=>{alert(JSON.stringify(form))}}>Next</button>
</>
)
}
export default LoginView