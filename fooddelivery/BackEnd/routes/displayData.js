const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    console.log("Global Variables", global.food_items);
    res.send(global.food_items);
  } catch (Error) {
    console.log(Error);
    return res.send("Server Error");
  }
});

module.exports = router;
