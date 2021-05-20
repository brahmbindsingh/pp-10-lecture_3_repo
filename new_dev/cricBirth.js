const cheerio = require("cheerio");
const request = require('request');
const fs = require("fs");
let data = {};

request("https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard", callback);

function callback(error,response,html) {
    if(!error){
        const manipulationTool = cheerio.load(html);
        let allPlayerAnchors = manipulationTool(".Collapsible__contentInner tbody a.small");
        for(let i=0;i<allPlayerAnchors.length;i++){
            let playerName = manipulationTool(allPlayerAnchors[i]).text();
            let playerHref = manipulationTool(allPlayerAnchors[i]).attr("href");
            bdayFind(playerName,"https://www.espncricinfo.com/"+playerHref);
        }
    }
}

// function bdayFind(name,url){
//     request(url,function(error,response,html){
//         const manipulationTool = cheerio.load(html);
//         let allInfo = manipulationTool(".player-card-description.gray-900");
//         let dayInfo = manipulationTool(allInfo[1]);
//         console.log(name,dayInfo.text());
//     })
    
    
// }

function bdayFind(name,url){
    request(url,function(error,response,html){
        const manipulationTool = cheerio.load(html);
        let allInfo = manipulationTool(".player-card-description.gray-900");
        data[name] = manipulationTool(allInfo[1]).text();
        fs.writeFileSync("data.json", JSON.stringify(data));
    });   
}