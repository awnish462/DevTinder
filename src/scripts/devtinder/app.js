const express = require("express");

const { mongooseConnection } = require("./config/db");

const cookieParser = require("cookie-parser");
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const userRouter=require("./routes/user");
const connectionRouter=require("./routes/connectionReq");



const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",userRouter);
app.use("/",connectionRouter);




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
