db = connect( 'mongodb://localhost:27017/glossary' );
db.glossaries.deleteMany({})
db.glossaries.insertMany( [
  {
     word: 'Dinosaur',
     definition: "XYB",
  },
  {
     word: 'Unicorn',
     definition: "AL2",
  },
  {
     word: 'Mythical',
     definition: "ZNE",
  }

] )

//mongosh --file 1-glossary/server/createDummyData.js