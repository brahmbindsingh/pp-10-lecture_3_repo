const express = require('express');
const app = express();
let port = '5000';

app.listen(port,function(){
    console.log(`start listening at ${port}`);
})

app.use(express.json());

let user = {};

//get request
//client <- server
app.get("/user",(req,res)=>{
    res.json(user);
})

app.get("/",(req,res)=>{
    res.send("Home Page");
})

//post request
//client -> server
app.post("/user",(req,res)=>{
    user=req.body;
    // console.log(req.body);
    res.send("data has been added successfully");
})

app.patch("/user",(req,res)=>{
    let obj = req.body;
    for(let key in obj){
        user[key]=obj[key];
    }
    res.json(user);
})

app.delete("/user",(req,res)=>{
    user={};
    res.json(user);
})