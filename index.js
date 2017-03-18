const parsers     = require('./lib/parsers');
const mongoClient = require('mongodb').MongoClient;
const DBHelper    = require('./lib/helpers/db.js');
const utils       = require('./lib/helpers/utils.js');

let dbHelper = null;

console.log('Connecting to a database...')
DBHelper.connect()
  .then(helper => {
    dbHelper = helper;
    console.log('\nConnected succesfully. Parsing pages...')

    let pagesCount = parsers.reduce((sum, parser) => sum + parser.getPageCount(), 0);
    let parsingProgressBar = utils.createProgressBar(pagesCount);

    let parseActions = parsers.map(parser => parser.run(() => parsingProgressBar.tick()));
    return Promise.all(parseActions);
  })
  .then(items => {
    console.log('\nPages succesfully parsed. Updating database...');
    items = utils.flattenFirstLevel(items);
    
    let modifyProgressBar = utils.createProgressBar(items.length);
    let modifyActions = items.map(item => {
      return dbHelper.updateItem(item.type, item, () => modifyProgressBar.tick());
    });

    return Promise.all(modifyActions);
  })
  .then(updates => {
    console.log(`\n${updates.length} items has been updated. Cleaning old items...`);

    let updatedIds = updates.map(update => dbHelper.getUpdatedItemId(update));
    return dbHelper.removeUnmodifiedItems(updatedIds);
  })
  .then(() => {
    console.log('\nDatabase has been updated!')
    dbHelper.closeConnection();
  })
  .catch(console.error);
