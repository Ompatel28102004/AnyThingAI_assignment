const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbName = "AnyThingAI_assignment";
    const uri = `${process.env.MONGO_URI}/${dbName}`;

    await mongoose.connect(uri);

    console.log(`MongoDB Connected → ${dbName}`);
  } catch (err) {
    console.log("Database connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
