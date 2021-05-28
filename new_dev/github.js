// import { jsPDF } from "jspdf";
const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");
// const doc = new jsPDF();
let data = {};



request("https://github.com/topics",callback);

function callback(error,response,html){
    if(!error){
        const mt = cheerio.load(html);
        let topicInfo = mt(".no-underline.d-flex.flex-column.flex-justify-center");
        for(let i=0;i<topicInfo.length;i++){
            let topicName = mt(mt(topicInfo[i]).find("p.f3")).text().trim();
            let topicLink = "https://github.com" + mt(topicInfo[i]).attr("href").trim();
            // console.log(topicName);
            // createFolder(topicName);
            projectFinder(topicName,topicLink);
        }
        // console.log("---------------------");
    }
}

function projectFinder(topicName,url){
    request(url,function(error,response,html){
        if(!error){
            const mt = cheerio.load(html);
            let projectList = mt(".f3.color-text-secondary.text-normal.lh-condensed .text-bold").slice(0,5);
            for(let i=0;i<projectList.length;i++){
                let projectName = mt(projectList[i]).text().trim();
                let projectLink = "https://github.com" + mt(projectList[i]).attr("href").trim();
                if(!data[topicName]){
                    data[topicName] = [];
                    data[topicName].push({
                        name: projectLink,
                    });
                }
                else{
                    data[topicName].push({
                        name: projectLink,
                    });
                }
                issueFinder(topicName,projectName,projectLink);
                // issueFinder(projectName,projectLink);
            }
        }
    });
}

function issueFinder(topicName,projectName,url){
    url = url+"/issues";
    request(url,function(error,response,html) {
        if(!error){
            const mt = cheerio.load(html);
            let issueList = mt(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title").slice(0,10);
            let index = -1;
            for(let j=0;j<data[topicName].length;j++){
                if(data[topicName][j].name == projectName){
                    index=j;
                    break;
                }
            }
            for(let i=0;i<issueList.length;i++){
                let issueName = mt(issueList[i]).text().trim();
                let issueLink = mt(issueList[i]).attr("href").trim();
                
                if(!data[topicName][index].issues){
                    data[topicName][index].issues = [];
                    data[topicName][index].issues.push({issueName,issueLink});
                } 
                else{
                    data[topicName][index].issues.push({issueName,issueLink});
                }
            }
            fs.writeFileSync("data2.json",JSON.stringify(data));
        }
    });
}

function createFolder(name){
    if(fs.existsSync(name)==true){
        console.log("already exists");
    }
    else{
        fs.mkdirSync(name);
    }
}
