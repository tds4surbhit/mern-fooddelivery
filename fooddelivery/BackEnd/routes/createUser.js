const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Post create for a user creation
router.post(
  "/createUser",
  [
    body("name", "Min Length of the user name can be 5").isLength({ min: 5 }),
    body("email", "Incorrect Email format").isEmail(),
    body("password", "Password to be 5 or more characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: req.body.password,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginUser",
  [
    body("email", "Incorrect Email format").isEmail(),
    body("password", "Password to be 5 or more characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let email = req.body.email;

    // checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let userData = await User.findOne({ email });

      // no user data
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Email ID doesn't exists please signup" });
      }

      // incorrect password
      if (req.body.password !== userData.password) {
        return res.status(400).json({ errors: "Incorrect password" });
      }

      // else returning success response
      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
