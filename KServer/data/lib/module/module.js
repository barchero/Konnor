var fs = require("fs");
var modules = function(){
	
	var loadedModules = [];
	this.loadModules = function(callback){
		var console = global.k.console;
		fs.readdir("./modules",function(err,files){
			if(err){console.error("modules folder not exist"+err); return;}
			for(var i = 0; i<files.length; i++){
				global.k.modules[files[i]] = require("../../modules/"+files[i]+"/index.js");
				var execute = global.k.modules[files[i]].main();
				if(execute != true){
					console.error("Module '"+files[i]+"' has an error or function main() doesn't exists");
					break;
				}else{
					console.info("Module '"+files[i]+"' loaded");
				}
				if(i == (files.length-1)){
					console.info("All modules loaded");
					callback();
				}
			}
			

		});
	};
	
};






module.exports = new modules();