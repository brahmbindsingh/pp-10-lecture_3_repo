let fs = require("fs");

function f(path){
    return new Promise(function executor(resolve,reject){
        fs.readFile(path,function(error,data){
            if(error) reject(error);
            else resolve(data);
        });    
    });
}

let p1 = f("f.txt");

p1.then(function (data) {
    console.log(data+"");
});

p1.then(function (data) {
    console.log(1);
});

p1.then(function (data) {
    console.log("hello");
})