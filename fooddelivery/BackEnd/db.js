const mongoose = require("mongoose");

const MongoURI =
  "mongodb+srv://surbhit4zeracing:RAra78su%24%23@cluster0.t7xhu4q.mongodb.net/GoFood";

async function connectToDatabase() {
  try {
    await mongoose.connect(MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    const fetchedData = await mongoose.connection.db.collection("FoodItems");
    fetchedData.find({}).toArray(function (err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = {
  connectToDatabase,
};
