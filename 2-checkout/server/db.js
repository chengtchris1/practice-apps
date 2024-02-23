const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

// Three seperate tables or one table?
// Leaning towards one table.
// Should I worry about foreign keys/joins? Probably not because basic reqs dont have edit functionality.

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
    `CREATE TABLE IF NOT EXISTS responses (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      sessionID VARCHAR(256),
      name VARCHAR(256),
      email VARCHAR(256),
      password VARCHAR(256),
      address1 VARCHAR(256),
      address2 VARCHAR(256),
      city VARCHAR(256),
      shipZip VARCHAR(5),
      state VARCHAR(2),
      phone VARCHAR(20),
      creditCard VARCHAR(16),
      expiryDate VARCHAR(5),
      cvv VARCHAR(3),
      billZip VARCHAR(5)
      )`
    )
  )
  .catch((err) => console.log(err));


db.get = (sessionID)  => {
  return sessionID === undefined ?
  db.queryAsync(`select * from responses`) :
  db.queryAsync(`select * from responses where sessionID = "${sessionID}"`);
}
//On "checkout" button press
db.addNewResponse = (sessionID)=>{
  return db.queryAsync(`insert into responses (sessionID) values("${sessionID}")`)
}
//On form 1 submission
db.addLogin = (sessionID, name, email, password)=>{
  /*
  INCORRECT: Notice how I swapped the ordering:
  `update responses where sessionID = ${sessionID} set name = ${name}, email =${email} 'password' = ${password}`
  */
  return db.queryAsync(
    `update responses set name = "${name}",
    email = "${email}", password = "${password}"

    where sessionID = "${sessionID}"`);
}
//On form 2 submission
db.addAddress = (sessionID, address1, address2, city, state, shipZip, phone)=>{
  return db.queryAsync(`
  update responses
  set
  address1 = "${address1}",
  address2 = "${address2}",
  city = "${city}",
  state = "${state}",
  shipZip = "${shipZip}",
  phone="${phone}"
  where
  sessionID = "${sessionID}"`);
}
//On form 3 submission
db.addCreditCard = (sessionID, creditCard, expiryDate, cvv, billZip) =>{
  return db.queryAsync(`
  update responses

  set
  creditCard = "${creditCard}",
  expiryDate = "${expiryDate}",
  cvv = "${cvv}",
  billZip = "${billZip}"

  where
  sessionID = "${sessionID}"`);
}

module.exports = db;
