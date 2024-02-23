import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import LoginView from "./components/loginView.jsx"
import AddressView from "./components/addressView.jsx"
import PaymentView from "./components/paymentView.jsx"
import SummaryView from "./components/summaryView.jsx"
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

  const handleTextChange = (e)=>{
    let id = e.target.id;
    let text = e.target.value;
    setForm({
      ...form,
      [id]: text
    })
    console.log(`${id}: ${form[id]}`);
  }

  const nextStep = (e, body, currentStep)=>{
    console.log(e.target.id)
    console.log("BOD", body)
    Axios.patch(`/checkout/${document.cookie}/${currentStep}`, body)
  .then(()=>(Axios.get('/checkout', {params:{sessionID: document.cookie}})))
  .then((data)=>{
    console.log(data);
    setForm(data.data);
    setCurrentView(currentView+1);
  })
  }
/*
  {
    "sessionID": "testSessionID",
    "name": "Glen Coco",
    "email": "haha@gmail.com",
    "password": "123456"
}

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
  useEffect(()=>{
    Axios.get('/checkout', {params:{
      sessionID: document.cookie
    }})
    .then((data)=>{
    let checkoutStarted = !!data.data.sessionID;
    let loginCompleted = data.data.sessionID && data.data.name && data.data.email && data.data.password;
    let shippingCompleted = data.data.address1 && data.data.address2 && data.data.city && data.data.shipZip && data.data.state && data.data.phone;
    let paymentCompleted = data.data.creditCard && data.data.expiryDate && data.data.cvv && data.data.billZip;


    checkoutStarted && setCurrentView(1)
    loginCompleted &&  setCurrentView(2)
    shippingCompleted && setCurrentView(3)
    paymentCompleted && setCurrentView(4)

    setForm(data.data);

    })

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
    {currentView === 1 && <LoginView form = {form} handleTextChange = {handleTextChange} nextStep={nextStep}/>}
    {currentView === 2 && <AddressView form = {form} handleTextChange = {handleTextChange} nextStep={nextStep}/>}
    {currentView === 3 && <PaymentView form = {form} handleTextChange = {handleTextChange} nextStep={nextStep}/>}
    {currentView === 4 && <SummaryView form = {form}/>}
    <p><code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code></p>
    </>
  )
}

render(
  <div><App/></div>,
  document.getElementById("root")
);
