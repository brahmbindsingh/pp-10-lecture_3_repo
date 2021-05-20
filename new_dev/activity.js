let cheerio = require("cheerio");
let fs = require("fs");
let request = require("request");
let jspsf = require("jspdf");
let topicLinks;

request("https://github.com/topics",callback);

function callback(error,response,html){
    if(!error){
        let manipulationTool = cheerio.load(html);
        let allAnchorTags = manipulationTool(".no-underline.d-flex.flex-column.flex-justify-center");
        for(let i=0;i<allAnchorTags.length;i++){
            let linkName = manipulationTool(manipulationTool(allAnchorTags[i]).find("p.f3")).text().trim();
            let singleLink = "https://github.com" + manipulationTool(allAnchorTags[i]).attr("href");
            topicProcesser(singleLink,linkName);

            // folderCreater("D:/pepwed/new_dev/pro_issue/"+linkName.text().trim());
            
        }
    }
}

// function folderCreater(name){
//     if(!fs.existsSync(name)){
//         fs.mkdirSync(name);
//     }
// }

function topicProcesser(url,topicName){
    request(url,function(error,response,html){
        if(!error){
            const manipulationTool = cheerio.load(html);
            let projectAtt = manipulationTool(".f3.color-text-secondary.text-normal.lh-condensed .text-bold");
            projectAtt =  projectAtt.slice(0,4);
            for(let i=0;i<projectAtt.length;i++){
                console.log(manipulationTool(projectAtt[i]).text());
                console.log(manipulationTool(projectAtt[i]).attr("href"));
            }
        }
    });
}


topicProcesser("https://github.com/topics/latex");