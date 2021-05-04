const request = require("request");
const cheerio = require("cheerio");

function getAllMatches(link){
    request(link,function(error,response,data){
        processData(data);
    })
}

function processData(html){
    let ch = cheerio.load(html);
    let allATages = ch('a[data-hover="Scorecard"]');

    for(let i=0;i<allATages.length;i++){
        let matchLink = "https://www.espncricinfo.com"+ch(allATages[i]).attr("href");
        console.log(matchLink);
    }
}

module.exports = getAllMatches;