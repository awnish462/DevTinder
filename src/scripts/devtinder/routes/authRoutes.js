const express=require("express");

const router=express.Router();
const bcrypt=require("bcrypt");
const User=require("../model/user");
const signUpValidator=require("../utils/signupValidator");

router.post("/auth/signup", async (req, res) => {
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

  router.post("/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if(!email || !password){
        throw new Error("Email or password is required");
      }
      const user = await User.findOne({email});
  
      if(!user){
        throw new Error("Invalid Credentials");
      }
  
      const isMatch = await user.verifyPassword(password);
  
      if(!isMatch){
        throw new Error("Invalid Credentials");
      }else{
        var token = await user.getJWT();
        res.cookie("jwt",token);
        res.status(200).send("Login Successfull");
  
      }
    }catch (error) {
      res.status(400).send(error.message);
    }
  });

  module.exports=router;