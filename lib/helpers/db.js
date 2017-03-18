const mongoClient = require('mongodb').MongoClient;
const types = require('../types');
const MONGODB_URL = 'mongodb://localhost:27017/ivanovofood';

class DBHelper {
  static connect() {
    return mongoClient.connect(MONGODB_URL).then((db) => {
      return new DBHelper(db);
    });
  }

  constructor(database) {
    this.db = database;
  }

  getUpdatedItemId(item) {
    return item.value ? item.value._id :
      update.lastErrorObject.upserted;
  }

  updateItem(collection, item) {
    return this.db.collection(collection).findOneAndUpdate(
      { name: item.name },
      { $set: item },
      {
        upsert: true,
        projection: { name: true },
        returnNewDocument: true
      }
    );
  }

  removeItems(updatedIds) {
    let query = {
      _id: {
        $nin: updatedIds
      }
    }

    return Promise.all(Object.keys(types).map((key) => {
      return this.db.collection(types[key]).remove(query);
    }));
  }

  closeConnection() {
    this.db.close();
  }
}

module.exports = DBHelper;
