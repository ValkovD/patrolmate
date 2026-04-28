const mongoose = require("mongoose");
const db = process.env.MONGOURI;

const connectMongoDb = async () => {

  try {
    await mongoose.connect(db);
    console.log("MongoDB Connected....");
  } catch (err) {
    console.log("Mongo DB UNABLE TO CONNECT")
    console.error(err.message);
    console.error(err);
    // to stop the server
    process.exit(1);
  }
};
module.exports = connectMongoDb;
