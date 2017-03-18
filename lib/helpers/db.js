const mongoClient = require('mongodb').MongoClient;
const MONGODB_URL = 'mongodb://localhost:27017/ivanovofood';

class DBHelper {
  static connect() {
    return mongoClient
      .connect(MONGODB_URL)
      .then(db => new DBHelper(db));
  }

  static get collections() {
    return {
      PIZZA    : "pizzas",
      SOUP     : "soups",
      ROLLS    : "rolls",
      NOODLES  : "noodles",
      PASTA    : "pasta",
      SUSHI    : "sushi",
      SALADS   : "salads",
      DRINKS   : "drinks",
      SAUCES   : "sauces",
      SNAKES   : "snakes",
      DESSERTS : "desserts"
    }
  }

  constructor(database) {
    this.db = database;
  }

  getUpdatedItemId(item) {
    return item.value ? 
      item.value._id :
      update.lastErrorObject.upserted;
  }

  updateItem(collection, item, onUpdate) {
    return this.db.collection(collection).findOneAndUpdate(
      { name: item.name },
      { $set: item },
      {
        upsert: true,
        projection: { name: true },
        returnNewDocument: true
      }
    ).then(result => {
      onUpdate();
      return result;
    });
  }

  removeUnmodifiedItems(modified) {
    let query = {
      _id: {
        $nin: modified
      }
    }

    let collections = Object.values(DBHelper.collections);
    let removeActions = collections.map(collectionName => this.db.collection(collectionName).remove(query));

    return Promise.all(removeActions);
  }

  closeConnection() {
    this.db.close();
  }
}

module.exports = DBHelper;
