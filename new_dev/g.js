const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");

request("https://github.com/topics",callback);

function callback(error,response,html){
    const mt = cheerio.load(html);
    
    //class of three topics
    let classOfThreeTopics = mt(".no-underline.d-flex.flex-column.flex-justify-center");
    
    //fetching link and name of topics
    for(let i=0;i<classOfThreeTopics.length;i++){
        let topicName = mt(mt(classOfThreeTopics[i]).find("p.f3")).text().trim();
        let topicLink = "https://github.com" + mt(classOfThreeTopics[i]).attr("href");
        projectSelector(topicName,topicLink);
    }
}

function projectSelector(name,url){
    request(url,function(error,response,html){
        const mt = cheerio.load(html);
        //project selector
        let projectDesc = mt(".f3.color-text-secondary.text-normal.lh-condensed .text-bold").slice(0,5);
        console.log(name);
        console.log("------------------------------------------------");
        for(let x=0;x<projectDesc.length;x++){
            let projectName = mt(projectDesc[x]).text().trim();
            let projectLink = mt(projectDesc[x]).attr("href");
            console.log(projectName);
            console.log(projectLink);
        }
        console.log("------------------------------------------------");
    });
}