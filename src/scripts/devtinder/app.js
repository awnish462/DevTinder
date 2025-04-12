const express = require("express");

const app=express();

app.use(express.json())

// app.use("/",(req,res)=>{
//     res.send("Hello  server");
// });

// app.use("/test",(req,res)=>{
//     res.send("Hello from the test server");
// });  

// app.use("/hello",(req,res)=>{
//     res.send("Hello from hello end poing");
// })

app.get("/home",(req,res)=>{
    console.log("Inside home route")
    console.log(req.body);
    console.log("query is:- ",req.query)
    res.send("Welcome to home page");
})
app.post("/user",  (req, res) => {
    console.log(req.body);
    console.log("query is:- ",req.query)
    // saving data to DB
    res.send("Data successfully saved to the database!");
  });

app.get("/home/:homeId",(req,res)=>{
    console.log(req.params.homeId); 
    res.send("Getting data")
})

app.post("/home",(req,res)=>{
    res.semd("Posting the data");
})

app.listen(3000,()=>{
    console.log("Connection successful");
});