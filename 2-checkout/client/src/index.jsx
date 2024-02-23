import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import LoginView from "./components/loginView.jsx"
const Axios = require("axios").default;

const App = ()=>{
  //Please confirm if the state should be here? Should be here? No
  const [form, setForm] = useState({});

  //Do I even need these other two states?
  /*
  const [addressForm, setAddressForm] = useState({});
  const [paymentForm, setPaymentForm] = useState({});
  */

  const [currentView, setCurrentView] = useState(0)

  const handleLoginChange = (e)=>{
    let id = e.target.id;
    let text = e.target.value;
    setForm({
      ...form,
      [id]: text
    })
  }
  useEffect(()=>{
    Axios.get('/checkout', {params:{
      sessionID: document.cookie
    }})
    .then((data)=>{setForm(data.data)
    if(data.data.sessionID){
      setCurrentView(currentView+1)
    }})
    }
  ,[])

  const beginCheckout = (e)=>{
    e.target.hidden = true;
    setCurrentView(currentView+1);
    Axios.post('/checkout', {
      session: document.cookie
    })
    .then(()=>{
      return Axios.get('/checkout',{
        params: {
        sessionID:document.cookie
      }
    })
    })
    .then((data)=>{
      setForm(data.data);
      console.log(data);
    })
  }


  //Have id equal to name of property so we need way less handler functions.

  return(
    <>
    <p>Hello, World!</p>
    {currentView === 0 && <p><button id="checkout" hidden={false} onClick={(e)=>{beginCheckout(e)}}>Begin Checkout</button></p>}
    {currentView === 1 && <LoginView form = {form} handleLoginChange = {handleLoginChange}/>}
    <p><code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code></p>
    </>
  )
}

render(
  <div><App/></div>,
  document.getElementById("root")
);
