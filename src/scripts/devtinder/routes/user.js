const express=require("express");

const router=express.Router();
const User=require("../model/user");
const validator=require("validator");


router.get("/user", async (req, res) => {
    try {
      const data = await User.find({});
      console.log("data is:-", data);
      res.status(200).send(data);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Somethind went wrong ");
    }
  });
  
  router.get("/userById", async (req, res) => {
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
  
  router.patch("/updateUser/:id", async (req, res) => {
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
  
  router.delete("/deleteUser", async (req, res) => {
    try {
      await User.deleteOne({ firstName: "Aniket" });
      res.status(200).send("data deleted successfully");
    } catch (err) {
      res.status(500).send("Data not found with this id");
    }
  });

  module.exports = router;