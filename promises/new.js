function f(){
    return new Promise(function executor(resolve,reject){
        setTimeout(function(){
            resolve(2);
        },2000);
    })
}

let p=f();

p.then(function(){
    console.log(1);
})

setTimeout(function(){
    p.then(function(){
        console.log(2);
    });
},3000)