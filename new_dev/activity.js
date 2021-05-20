let cheerio = require("cheerio");
let fs = require("fs");
let request = require("request");

request("https://github.com/topics",callback);

function callback(error,response,html){
    if(!error){
        let manipulationTool = cheerio.load(html);
        let allAnchorTags = manipulationTool(".no-underline.d-flex.flex-column.flex-justify-center");
        for(let i=0;i<allAnchorTags.length;i++){
            let linkName = manipulationTool(allAnchorTags[i]).find("p.f3");
            let singleLink = "https://github.com" + manipulationTool(allAnchorTags[i]).attr("href");
            
            console.log(linkName.text(),singleLink.text());
        }
    }
}