//npm init -y
//npm i express
//npm i nodemon -g
//nodemon filename

const express = require('express');

//server creation
const app = express();
let port = '8080';

app.listen(port,function(){
    console.log(`server is listening on port ${port}`);
});

let obj = {
    'name': 'Abhishek'
}

//types of req -> get put post delete
app.get("/",(req,res) => {
    res.send("<h1>hello hi</h1>");
})
app.get("/user",(req,res) => {
    res.json(obj);
})
app.get("/home",(req,res) => {
    // console.log(__dirname);
    res.sendFile('./views/index.html',{root:__dirname});
})
// app.get("/home",(req,res)=>{
//     console.log(req.hostname);
//     console.log(req.path);
//     console.log(req.method);
//     console.log(req);
//     res.send("<h1>hello world</h1>");
//     res.end();
// })