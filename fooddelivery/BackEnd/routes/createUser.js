const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MyNameisSurbhitSinhaandIam25yearsold";

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

    const salt = await bcrypt.genSalt(10);
    let securepassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: securepassword,
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

      // comparing the passwords from the data coming from request and coming from mongo DB
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      // incorrect password
      if (!passwordCompare) {
        return res.status(400).json({ errors: "Incorrect password" });
      }

      // signature for JWT Token has to be an Object
      const data = {
        user: {
          id: userData.id,
        },
      };
      // creating auth token
      const authToken = jwt.sign(data, jwtSecret);

      // else returning success response
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
