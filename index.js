const parsers = require('./lib/parsers');
const mongoClient = require('mongodb').MongoClient;
const DBHelper = require('./lib/helpers/db.js');

let dbHelper = null;

DBHelper.connect()
  .then((helper) => {
    dbHelper = helper;
  })
  .then(() => {
    let parseActions = parsers.map((parser) => {
        return parser.run();
    });
    return Promise.all(parseActions);
  })
  .then(items => {
    items = items.reduce((items, set) => {
      return items.concat(set);
    }, []);
    
    let modifyActions = items.map((item) => {
      return dbHelper.updateItem(item.type, item);
    })

    return Promise.all(modifyActions);
  })
  .then((updates) => {
    updatedIds = updates.map((update) => {
      return update.value ? update.value._id : update.lastErrorObject.upserted
    });

    return dbHelper.removeItems(updatedIds);
  })
  .then(() => {
    console.log('Database has been updated!')
    dbHelper.closeConnection();
  })
  .catch((err) => {
    console.log(err);
  });
