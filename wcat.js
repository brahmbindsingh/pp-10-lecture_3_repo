let fs = require('fs');

let input = process.argv.slice(2);
let options = [];
let filePaths = [];

for(let i=0;i<input.length;i++){

    if(input[i]=='-s' || input[i]=='-b' || input[i]=='-n'){
        options.push(input[i]);
    }
    else{
        filePaths.push(input[i]);
    }

}

//console.log('options', options);
//console.log('filepath', filePaths);

for(let i=0;i<filePaths.length;i++){
    let isFilePresent = fs.existsSync(filePaths[i]);
    if(isFilePresent==false){
        console.log('filepath', filePaths[i],'does not exist');
        return;
    }
}


let totalContent = '';
for(let i in filePaths){
    let data = fs.readFileSync(filePaths[i]);
    totalContent+=data+"\r\n";
}

let isSoption = options.includes('-s');
if(isSoption==true){
    let outputArr = totalContent.split("\r\n");
    //console.log(output);
    let tempArr = [];
    for(let i in outputArr){
        let isElementValid=outputArr[i]!=='';
        if(isElementValid){
            tempArr.push(outputArr[i]);
        }
    }
    totalContent = tempArr.join('\r\n');
}


let isN=options.includes('-n');
let isB = options.includes('-b');

let finalOption;
if(isN==true){
    if(isB==true){
        let idxB = options.indexOf('-b');
        let idxN = options.indexOf('-n');
        finalOption = idxB<idxN?'-b':'-n';
    }
    else{
        finalOption='-n';
    }
}
else if(isB==true){
    finalOption='-b';
}



if(finalOption=='-n'){
    let count=1;
    let contentArr = totalContent.split("\r\n");
    for(let i in contentArr){
        contentArr[i]=count + '. ' + contentArr[i];
        count++;
    }
    totalContent=contentArr.join('\r\n');
}

if(finalOption=='-b'){
    let count=1;
    let contentArr = totalContent.split("\r\n");
    for(let i in contentArr){
        if(contentArr[i]!=''){
            contentArr[i]=count + '. ' + contentArr[i];
            count++;
        }
    }
    totalContent=contentArr.join('\r\n');
}

console.log(totalContent);