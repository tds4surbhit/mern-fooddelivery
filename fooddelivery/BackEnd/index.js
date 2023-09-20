const express = require("express");
const app = express();
const port = 9000;
const MongoDB = require("./db");

MongoDB.connectToDatabase();

// Starting the server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Removing the cors errors
// Setting up CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Middleware
app.use(express.json());
app.use("/api/", require("./routes/createUser"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
