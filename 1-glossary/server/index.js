require("dotenv").config();
const express = require("express");
const db = require("./db")
const path = require("path");
const app = express();
//Fill me in = Client\dist or src foler,

// Serves up all static and generated assets in in a specified folder.
/*
console.log("Test", __dirname)
console.log(`mongodb://localhost:27017/${process.env.DB_NAME}`)*/
app.use(express.static(path.join(__dirname, /* FILL ME IN */)));
app.use(express.json())

app.get('/wordbank', (req, res)=>{
  //Need to somehow figure out if the get request from app.post is done.
  db.getAllWords()
  .then((data)=>{
    res.send(data)
    res.status(200)
  })
  .catch((err)=>{
    res.send(err)
    res.status(400)
  })
  .finally(()=>{
    res.end()
  })
})
app.patch('/wordbank', (req, res)=>{
  console.log(req.body);
  db.updateDef(req.body.definition, req.body.word, req.body.id)
  .then((data)=>{
    res.send(data)
    console.log('res', data)
  })
  .catch((err)=>{
    res.send(err)
    console.log('err', err)
  })
  .finally(()=>{
    res.end()
  })
})
app.post('/wordbank', (req, res)=>{
  console.log(req.body);
  db.addWord(req.body.word, req.body.definition)
  .then((data) => {
    res.send(data);
    console.log("res", data);
  })
  .catch((err)=>{
    res.send(err);
    console.log("err", err);
  })
  .finally(()=>{res.end()});
})
//Get request, provides a full list of words from server.
//Patch request, edits a word.
//Post request new word.


/****
 *
 *
 * Other routes here....
 *
 *
 */

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
