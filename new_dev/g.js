const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");
let data = {};

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
        if(!error){
            const mt = cheerio.load(html);
            //project selector
            let projectDesc = mt(".f3.color-text-secondary.text-normal.lh-condensed .text-bold").slice(0,5);
            // console.log(name);
            console.log("------------------------------------------------");
            for(let x=0;x<projectDesc.length;x++){
                let projectName = mt(projectDesc[x]).text().trim();
                let projectLink = "https://github.com"+mt(projectDesc[x]).attr("href");
                if(!data[name]){
                    data[name] = [];
                    data[name].push({
                        name: projectName,
                    })
                }
                else{
                    data[name].push({
                        name: projectName,
                    })
                }
                projectProcessor(projectLink,name,projectName)
                // console.log(projectName);
                // console.log(projectLink);
            }
            // console.log("------------------------------------------------");
            fs.writeFileSync("data1.json",JSON.stringify(data));
        }
    });
}

function projectProcessor(projectUrl,topicName,ProjectName){
    projectUrl = projectUrl+"/issues";
    response(projectUrl,function(error,response,html){
        const mt = cheerio.load(html);

        let index = -1;

        let issueAnchors = mt(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title").slice(0,5);
        for(let i=0;i<issueAnchors.length;i++){
            let link = "https://github.com"+mt(issueAnchors[i]).attr("href").trim();
            let name = mt(issueAnchors[i]).text().trim();
        }
    });
}