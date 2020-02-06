const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connectedMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("connected to mongodb");
  } catch (error) {
    console.log("DB Error:", error.message);
    process.exit(1);
  }
}

module.exports = connectedMongoDB;
