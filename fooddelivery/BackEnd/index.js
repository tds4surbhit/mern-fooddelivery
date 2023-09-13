const express = require("express");
const app = express();
const port = 9000;
const MongoDB = require("./db");

MongoDB.connectToDatabase();

// Starting the server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware
app.use(express.json());
app.use("/api/", require("./routes/createUser"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
