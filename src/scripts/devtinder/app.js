const express = require("express");
const { auth } = require("./midleware");
const { mongooseConnection } = require("./config/db");
const User = require("./model/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Aniket",
    lastName: "Kumar",
    email: "ankiket@gmail.com",
    city: "Aurangabad",
    age: "22",
    gender: "Male",
  });
  try {
    await user.save();
    res.status(200).send("User Added Successfully");
  } catch (error) {
    res.status(400).send("User Not Added Successfully");
  }
});

mongooseConnection()
  .then(() => {
    console.log("Database Connection Succesfully established");

    app.listen(3000, () => {
      console.log("Connection successful");
    });
  })
  .catch(() => {
    console.log("Database Connection Not Established");
  });
