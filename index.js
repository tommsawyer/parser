const parsers = require('./lib/parsers');
const mongoClient = require('mongodb').MongoClient;
const DBHelper = require('./lib/helpers/db.js');
const ProgressBar = require('progress');
const utils = require('./lib/helpers/utils.js');

let dbHelper = null;

// let bar = new ProgressBar('[:bar] :percent Затрачено времени :elapsed с', {total: 100, width: 50});

DBHelper.connect()
  .then(helper => {
    dbHelper = helper;

    let parseActions = parsers.map(parser => parser.run());
    return Promise.all(parseActions);
  })
  .then(items => {
    items = utils.flattenFirstLevel(items);
    
    let modifyActions = items.map(item => dbHelper.updateItem(item.type, item));

    return Promise.all(modifyActions);
  })
  .then((updates) => {
    let updatedIds = updates.map(update => dbHelper.getUpdatedItemId(update));
    return dbHelper.removeItems(updatedIds);
  })
  .then(() => {
    console.log('Database has been updated!')
    dbHelper.closeConnection();
  })
  .catch((err) => {
    console.error(err);
  });
