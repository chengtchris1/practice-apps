require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");
const db = require("./db.js");
// Establishes connection to the database on server start/const db = require("./db");
const app = express();
app.use(express.json())

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.

app.use(sessionHandler);
// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);
// Serves up all static and generated assets in a specified folder.
console.log(path.join(__dirname, '../client/dist'))
app.use(express.static(path.join(__dirname, '../client/dist')));

//If entry does not exist
app.post('/checkout', (req, res)=>{
  console.log(req.body.session)
  db.addNewResponse(req.body.session)
  .then((data)=>{
    console.log(data)
    res.send(`Added session ${req.body.session} to database`);
    res.status(200);
  })
  .catch((data)=>{
    console.log(data)
    res.status(500)
  })
  .finally(()=>{
    res.end();
  })
})

//To update with new info was user scrolls through form.
app.get('/checkout', (req, res)=>{
  let id = req.query.sessionID
  db.get(req.query.sessionID)
  .then((data)=>{
    id === undefined ? res.send(data[0]) : res.send(data[0][0])
  })
  .catch((err)=>{
    res.status(400);
    res.send(err);
    console.log(err);})
  .finally(()=>{
    res.end()
  })
})

app.patch('/checkout/:sessionID/:formID', (req, res)=>{
  let id = req.params.sessionID;
  console.log(req.params.formID);
  if(req.params.formID === '1'){
    db.addLogin(id, req.body.name, req.body.email, req.body.password)
      .then((data)=>{
        res.send("Changed login info.")
        res.end();
      })
      .catch((err)=>{
        console.log(err);
      })

  } else if (req.params.formID === '2'){
    //sessionID, address1, address2, city, state, shipzip, phone
    db.addAddress(id, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.shipZip, req.body.phone)
    .then((data)=>{
      res.send("Changed address info.");
      res.end();
      res.end();
      console.log(data)}
      )
    .catch((err)=>{console.log(err)})

  } else if (req.params.formID === '3'){
    //(sessionID, creditCard, expirydate, cvv, billZip)
    db.addCreditCard(id, req.body.creditCard, req.body.expiryDate, req.body.cvv, req.body.billZip)
    .then((data)=>{
      res.send("Changed payment info")
      console.log(data)
      res.end();
    })
    .catch((err)=>{console.log(err)})
  } else {
    res.send("Error")
    res.status(400);
    res.end()
  }

  })

/*
app.get('/checkout', (req, res)=>{
res.send("Hello world")
res.end();

})*/
/****
 *
 *
 * Other routes here....
 *
 *
 */

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
