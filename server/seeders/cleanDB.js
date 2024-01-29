const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    const modelExists = await models[modelName].db.db.listCollections({ name: collectionName }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
      console.log(`Collection '${collectionName}' dropped successfully.`);
    } else {
      console.log(`Collection '${collectionName}' does not exist.`);
    }
  } catch (err) {
    console.error(`Error dropping collection '${collectionName}': ${err.message}`);
    // You may choose to throw the error here if you want to stop execution or handle it differently
  }
};
