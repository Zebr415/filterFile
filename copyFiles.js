var fs = require('fs-extra');
var argv = require('minimist')(process.argv.slice(2));

// fs.copy('./copyFiles/origin', './copyFiles/output', function (err) {
//   if (err) return console.error(err)
//   console.log("success!")
// }) // copies origin dir

var srcDir = argv["_"][0]
var destDir = argv["_"][1]
var suffixs = argv["_"].slice(2)
console.log("patterns: ", suffixs)

function hasSuffix(filename,suffixs){
	var match = false;
	for (var i = 0; i < suffixs.length; i++) {
		var _suffix = '[.]' + suffixs[i] + "$";
		var regExp =  new RegExp(_suffix,"g");
		if (regExp.test(filename)) {
			match = true;
			break;
		}
	}
	
	return match;
}
// var destConst = './output';
// console.log(hasSuffix("123.jpg",".jpg"));
function filterAndCopyFiles(src,dest,suffixs){
	var files = fs.readdirSync(src);
	for (var i in files){
		var name = src + '/' + files[i];
		if (fs.statSync(name).isDirectory()){
			filterAndCopyFiles(name,dest,suffixs);
		} else {
			if (hasSuffix(name,suffixs)){
				var destsrc = dest + '/' + files[i];
				fs.copySync(name,destsrc);
				console.log(name);
			}
		}
	}
}
filterAndCopyFiles(srcDir,destDir,suffixs);
console.log("success!");
