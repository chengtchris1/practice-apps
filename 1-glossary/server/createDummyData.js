db = connect( 'mongodb://localhost:27017/glossary' );
//db.glossaries.deleteMany({})
db.glossaries.insertMany( [
  {
     word: 'Word1',
     definition: "Definition1",
  },
  {
     word: 'Word2',
     definition: "Definition2",
  },
  {
     word: 'Word3',
     definition: "Definition3",
  }

] )

//mongosh --file 1-glossary/server/createDummyData.js