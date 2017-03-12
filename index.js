const parsers = require('./lib/parsers');
const mongoClient = require('mongodb').MongoClient;

let database = null;

mongoClient.connect('mongodb://localhost:27017/ivanovofood')
  .then((DB) => {
    database = DB;
    return database.collection('pizzas').drop();
  })
  .then(() => parsers[0].parse())
  .then(pizzas => {
    return database.collection('pizzas').insertMany(pizzas);
  })
  .then(() => {
    console.log('Database has been updated!')
    database.close();
  });
