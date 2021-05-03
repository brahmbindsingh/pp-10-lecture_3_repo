const fs = require("fs");

console.log("start");

fs.readFile("./f1.txt",giveMeData);

function giveMeData(error,data){
    console.log("i am inside");
    console.log(data.toString());
}