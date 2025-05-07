const mongoose = require('mongoose');

const connectionSchema=new mongoose.Schema({
    toUserId:{
        type:mongoose.Schema.Types.ObjectID,
    },
    fromUserId:{
        type:mongoose.Schema.Types.ObjectID,
    },
    status:{
        type:String,
        enum:["Ignored","Pending","Intrested","Accepted"]
    }
})


module.exports=mongoose.model("connection",connectionSchema);