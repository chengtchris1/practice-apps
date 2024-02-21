const mongoose = require("mongoose");
const _ = require('underscore');
require("dotenv").config();


console.log(`mongodb://localhost:27017/${process.env.DB_NAME}`)
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {useNewUrlParser: true});
// 1. Use mongoose to establish a connection to MongoDB
// Connect to Mongoose db
const glossarySchema = new mongoose.Schema({
  word: String,
  definition: String
}
)
const Glossary = mongoose.model('Glossary', glossarySchema)
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them
//Schema: unique_id: String, force to be unique. //ID is already provided by default
      //Word: String
      //Definition: String
module.exports.addWord = (word, definition) => {
  return Glossary.create({word: word, definition: definition})
}
module.exports.getAllWords = () => {
  //MyModel.find({ name: /john/i }, 'name friends').exec();
  return Glossary.find({}).exec();
}
module.exports.updateDef = (definition, word, id) => {
  //MyModel.find({ name: /john/i }, 'name friends').exec();

  return id !== undefined ?
  Glossary.findOneAndUpdate({word: word, _id:id}, {definition: definition}, {useFindAndModify: false}).exec() :
  Glossary.findOneAndUpdate({word: word}, {definition: definition}, {useFindAndModify: false}).exec()
}
/*
module.exports.searchWords = (term) => {
  let searchWords = Glossary.find({word: `/${term}/i`})
  let searchDef =  Glossary.find({definition: `/${term}/i`})
  Promise.all([searchWords, searchDef])
  .then(result)
  //MyModel.find({ name: /john/i }, 'name friends').exec();
  //return Glossary.create({word: word, definition: definition})
}
*/


