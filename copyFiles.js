var fs = require('fs-extra');
var argv = require('minimist')(process.argv.slice(2));

// fs.copy('./copyFiles/origin', './copyFiles/output', function (err) {
//   if (err) return console.error(err)
//   console.log("success!")
// }) // copies origin dir

var srcDir = argv["_"][0]
var destDir = argv["_"][1]
var suffix = argv["_"][2]

function hasSuffix(filename,suffix){
	var _suffix = '[.]' + suffix + "$";
	var regExp =  new RegExp(_suffix,"g");
	return regExp.test(filename);
}
// var destConst = './output';
// console.log(hasSuffix("123.jpg",".jpg"));
function filterAndCopyFiles(src,dest,suffix){
	var files = fs.readdirSync(src);
	for (var i in files){
		var name = src + '/' + files[i];
		if (fs.statSync(name).isDirectory()){
			filterAndCopyFiles(name,dest,suffix);
		} else {
			if (hasSuffix(name,suffix)){
				var destsrc = dest + '/' + files[i];
				fs.copySync(name,destsrc);
				console.log(name);
			}
		}
	}
}
filterAndCopyFiles(srcDir,destDir,suffix);
console.log("success!");
