const express= require("express");
const router=express.Router();
const {auth}=require("../middleware/auth")


router.get("/profile",auth,async (req,res)=>{
    try{
      console.log(req.user);
      res.status(200).send(req.user);
    }catch(error){
      res.status(400).send(error.message);
    }
   
  })

  module.exports=router;