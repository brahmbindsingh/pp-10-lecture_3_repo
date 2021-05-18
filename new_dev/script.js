const request = require("request");
const fs = require('fs');
const cheerio = require('cheerio');
const { mainModule } = require("process");

request("https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard",callback);

// function callback(error,response,html){
//     if(!error) {    
//         // fs.writeFileSync("index.html",html);
//         const manipulationTool = cheerio.load(html);
//         let comment = manipulationTool(".col-14.col-md-15.col-lg-14 .match-comment-long-text p");
//         let reqCont = manipulationTool(comment[0]).text();
//         console.log(reqCont);
//     };
// }

function callback(error,response,html){
    const manipulationTool = cheerio.load(html);
    let bothTables = manipulationTool(".table.bowler");
    let table1 = manipulationTool(bothTables[0]);
    let row = manipulationTool(table1).find("tbody tr");
    let data = manipulationTool(row[0]).find("td");
    let maxn = manipulationTool(data[4]);
    let max = maxn.text();
    let player1="";
    
    for(let i=1;i<row.length;i++){
        let maxSelector = manipulationTool(row[i]).find("td");
        let maxChecker = manipulationTool(maxSelector[4]);
        if(maxChecker.text()>max){
            max = maxChecker.text();
            player1 = manipulationTool(maxSelector[0]);
        }
    }
    console.log(max,player.text());

    let table2 = manipulationTool(bothTables[1]);
    let row1 = manipulationTool(table2).find("tbody tr");
    let data1 = manipulationTool(row1[0]).find("td");
    let maxn1 = manipulationTool(data1[4]);
    let max1 = maxn1.text();
    let player2 = "";
    
    for(let i=1;i<row1.length;i++){
        let maxSelector1 = manipulationTool(row1[i]).find("td");
        let maxChecker1 = manipulationTool(maxSelector1[4]);
        if(maxChecker1.text()>max1){
            max1 = maxChecker1.text();
            player2 = manipulationTool(maxSelector1[0]);
        }
    }
    let max2;
    let player="";
    if(max>max1){
        max2=max;
        player = player1.text();
    }
    else{
        max2=max1;
        player = player2.text();
    }

    console.log(player,max2);
}