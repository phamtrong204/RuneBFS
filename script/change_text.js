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
    for (var i in fileDatas) {
        fileDatas[i] = fileDatas[i].replace('"' + cnText + '"', '"' + enText + '"');
    }
}

for (var i in files){
    fs.writeFileSync(files[i], fileDatas[i], 'utf8');
}

console.log("DONE!!!");