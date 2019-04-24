var fs = require('fs');
var allText = JSON.parse(fs.readFileSync('./ROM-all-text.json', 'utf8'));
var length = Object.keys(allText).length;
var files = {
    runeByTypeBranch : '../src/data/runeByTypeBranch.json',
    runeSpecial : '../src/data/runeSpecial.json',
    runeSpecialDesc : '../src/data/runeSpecialDesc.json',
};

var fileDatas = {};
for (var i in files){
    fileDatas[i] = fs.readFileSync(files[i], 'utf8');
}

var counter = 1;
for (var cnText in allText) {
    console.log((counter++) + "/" + length);
    var enText = allText[cnText] + "";
    enText = enText.replace(/\"/g, "\\\"");
    cnText = cnText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var cnRegx = new RegExp("\"" + cnText + "\"", 'g');
    for (var i in fileDatas) {
        fileDatas[i] = fileDatas[i].replace(cnRegx, '"' + enText + '"');
    }
}

/* 
//Test 1 text
//Error: (表情落寞）我离开仙山已经太久了，如果还不能找到我的小狐狸，我就要回去了。
var cnText = "元素扩散-强效";
var enText = "Element Diffusion -Enpower";
var cnRegx = new RegExp("\"" + cnText + "\"", 'g');
for (var i in fileDatas) {
    fileDatas[i] = fileDatas[i].replace(cnRegx, '"' + enText + '"');
}
*/
for (var i in files){
    fs.writeFileSync(files[i], fileDatas[i], 'utf8');
}

console.log("DONE!!!");