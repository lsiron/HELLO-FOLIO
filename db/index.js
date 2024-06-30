const mongoose = require("mongoose");

const MongoConnect = async () => {
  try {
    mongoose.connect(process.env.DB_URL , {
      dbName: process.env.DB_NAME ,
    });
    console.log('MongoDB 연결됨!');
  } catch (error) {
    console.error('MongoDB 에러남!');
  }
};

module.exports = { MongoConnect }
