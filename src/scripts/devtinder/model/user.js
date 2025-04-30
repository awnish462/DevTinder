const { timers } = require("jquery");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: { type: String , lowercase:true , trim:true , minlength:3, maxlength:10},
  lastName: { type: String, lowercase:true, trim:true, minlength:3, maxlength:10 },
  email: { type: String , lowercase:true, trim:true, unique:true , validate(e){
    if(!validator.isEmail(e)){
      throw new Error("Email is invalid");
    }
  }},
  city: { type: String, lowercase:true, trim:true, minlength:3, maxlength:10 },
  age: { type: Number, min:18, max:100 },
  gender: { type: String , enum:["male", "female"], lowercase:true, trim:true},
  password: { type: String , trim:true,
    validate(p){
      if(!validator.isStrongPassword(p)){
        throw new Error("Password is not strong enough");
      }
    }
  },

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
