global.$ = $;
var gui = require('nw.gui');
var win = gui.Window.get();
win.showDevTools();

var Konnor = function(){
    this.console = require("../../lib/console/console.js");
    this.socket = require("../../lib/socket/server.js");
    this.command = require("../../lib/command/command.js");
    this.moduleLoader = require("../../lib/module/module.js");
    this.modules = [];
    
    
    //this.mongo = require("./lib/mongo.js");
    
    this.start = function(){
        global.k.moduleLoader.loadModules(function(){
        	document.getElementById("command").disabled = "";
        	document.getElementById("btn_execute").disabled = "";    	
        	});
    };
    
  };

$(document).ready(function(){
	//console.log("hello");
	global.k = new Konnor();
	global.k.console.container = document.getElementById("consoleContainer");
	process.on("uncaughtException", function(err) { global.k.console.error(err.stack);});
	
	//global.k.console.info("hello");
	//global.window.k.server.start();
	//global.k.mongo.execute();
	/*try{
		global.k.modules.loadModules();
	}catch(err){
		console.log("Error:"+err);
	}*/
	
	
});

