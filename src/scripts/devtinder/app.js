const express = require("express");
const { auth } = require("./midleware");
const { mongooseConnection } = require("./config/db");
const User = require("./model/user");
const validator = require("validator");
const signUpValidator = require("../devtinder/utils/signupValidator");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    signUpValidator(req);

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await user.save();
    res.status(200).send("User Added Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      throw new Error("Email or password is required");
    }
    const user = await User.findOne({email});

    if(!user){
      throw new Error("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      throw new Error("Invalid Credentials");
    }else{
      var token = jwt.sign({_id:user._id }, 'Devtinder@#$123');
      res.cookie("jwt",token);
      res.status(200).send("Login Successfull");

    }
  }catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/getProfile",async (req,res)=>{
  console.log(req.cookies);
  const token = req.cookies.jwt;
 const jwtToken= jwt.verify(token,"Devtinder@#$123");
 console.log("JWT token is:- "+JSON.stringify(jwtToken));
 const userId = jwtToken._id;
 const profile=await User.findById(userId);
  res.status(200).send(profile);
})

app.get("/user", async (req, res) => {
  try {
    const data = await User.find({});
    console.log("data is:-", data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Somethind went wrong ");
  }
});

app.get("/userById", async (req, res) => {
  try {
    const userId = "67ff42060be7d662557b3752";
    const data = await User.findById(userId);
    console.log("data is:- ", data);
    res.status(200).send(data);
  } catch (error) {
    console.log("Error is:- ", error.message);
    res.status(500).send("Data Not found by this id");
  }
});

app.patch("/updateUser/:id", async (req, res) => {
  data = req.body;
  console.log(data);
  console.log(req.params.id);

  try {
    if (!validator.isEmail(data.email)) {
      throw new Error("Email is invalid");
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }

  try {
    const userId = req.params.id;

    const data = await User.findByIdAndUpdate(userId, req.body, {
      returnDocument: "after",
    });
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

app.delete("/deleteUser", async (req, res) => {
  try {
    await User.deleteOne({ firstName: "Aniket" });
    res.status(200).send("data deleted successfully");
  } catch (err) {
    res.status(500).send("Data not found with this id");
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
