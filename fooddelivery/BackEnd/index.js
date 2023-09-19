const express = require("express");
const app = express();
const port = 9000;
const MongoDB = require("./db");
const cors = require("cors");

MongoDB.connectToDatabase();

// Starting the server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Removing the cors errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Origin",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());
app.use("/api/", require("./routes/createUser"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
