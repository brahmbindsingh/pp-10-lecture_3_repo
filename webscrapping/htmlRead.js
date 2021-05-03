const fs = require("fs");
const cheerio = require("cheerio");

let htmlKaData = fs.readFileSync("./index.html").toString();
//console.log(htmlKaData);

let ch = cheerio.load(htmlKaData);

// <h1>Heading 1</h1> => object form !!
//let liKaObject = ch("p");

//console.log(liKaObject);

let h1KaData = ch("h1").text();
//console.log(h1KaData);

let pTags = ch("p");

//ch dala kyoki .text sirf outer obj ko padhta hai isse vo inner obj ko bhi padega
//console.log(ch(pTags["2"]).text()); 

let pLiKeAndar = ch("li>p").text();
console.log(pLiKeAndar);