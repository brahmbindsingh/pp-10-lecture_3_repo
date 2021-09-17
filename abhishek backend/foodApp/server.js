const express = require('express');
const app = express();
let port = '5000';

app.listen(port,function(){
    console.log(`start listening at ${port}`);
})

app.use(express.json());
const userRouter = express.Router();
app.use('/user',userRouter);

userRouter
.route('/')
.get()
.post()
.patch()
.delete();

let user = {};

//get request
//client <- server

//crud - create read update delete
//read
app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.get("/user",(req,res)=>{
    res.json(user);
})


//post request
//client -> server
//create
app.post("/user",(req,res)=>{
    user=req.body;
    // console.log(req.body);
    res.send("data has been added successfully");
})

//update
app.patch("/user",(req,res)=>{
    let obj = req.body;
    for(let key in obj){
        user[key]=obj[key];
    }
    res.json(user);
})

//delete
app.delete("/user",(req,res)=>{
    user={};
    res.json(user);
})

//param route
app.get('/user/:id',(req,res)=>{
    console.log(req.params);
    // res.send(req.params.id);
    res.json(req.params.id);
})