const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/validation");
const validator = require("validator");
const User = require("../model/user");
const cookies = require("cookie-parser");
const { JSON } = require("mysql/lib/protocol/constants/types");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.get("/profile", auth, async (req, res) => {
  try {
    console.log(req.user);
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/profile/edit", auth, async (req, res) => {
  try {
    const request = req.body;
    const { firstName, lastName, age,password,about } = request;
    console.log("request is:-", request);
    const allowedUpdates = [
      "firstName",
      "lastName",
      "age",
      "password",
      "about",
    ];
    const isValid = Object.keys(request).every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValid) {
      throw new Error("Invalid Updates");
    }
    if (age < 18 || age > 100) {
      throw new Error("Age must be greater than 18 and less than 100");
    }

   
    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong");
    }
    if(about.length>100){
      throw new Error("About must be less than 100 characters");
    }

    const userId = req.user._id;
    console.log("User id is:- " + userId);

    const hashPassword = await bcrypt.hash(password, 10);

   await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      age,
      'password':hashPassword,
      about
    });
    res.status(200).send("Profile Updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
