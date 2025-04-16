const mongoose = require("mongoose");

const mongooseConnection = async () => {
  await mongoose.connect(
    "mongodb+srv://awnishsinha462:pYSdq65TyEzdOqE7@cluster1.qnvruaq.mongodb.net/devTinder"
  );
};


module.exports={
    mongooseConnection
}