var Server = function(){
    this.status = 0;
    this.threads = new Array();
    this.sockets = new Array();
    this.io = null;    
    //this.Thread = require("./thread.js");
    

    
    this.start = function(){
        var console = global.k.console;

        
        
        
        
        
        
        
        
        
        
        //Starting modules
        //global.k.modules.loadModules(function(err){
        	/*if(err){
            	error = 1;
            	console.error(err.message);
            	return false;
        	}*/

        	//	this.io = require('socket.io').listen(80);

        		//console.error("Socket can't start");
        //});


        	//console.error("Module loader can't start any module");
        /*}
        finally{
        	//Starting Socket.IO
            try{
            	console.info("Starting socket on port 8080");
                
                console.info("Socket started");
                
            }
            catch(err){
            	error = 1;
                console.error("Socket can't start: "+err);
            } 
            finally{
                if(error == 1){
                	//this.stop();
                	console.error("Fatal error, server can't be started");
                	
                }else{
                	this.status=1;
                	console.info("Server fully loaded");
                };
            	
            }
        }*/

    	
    	
    	
    	
      
        
        


        
        
        
        this.io.set('log level', 0);

        this.io.sockets.on('connection', function (socket) {
          if(k.server.status == 1){
              socket.emit('load', { will: 'be received by everyone'});
          }
          

          socket.on('loaded', function () {
              var Thread = k.server.Thread;
              if(typeof k.server.threads[socket.id] === "undefined"){
                k.server.sockets.push(socket);
                k.server.threads[socket.id] = new Thread(socket);
                k.server.threads[socket.id].startStreaming();
                console.info("Client connected: "+socket.id);
              }
          });

          socket.on('disconnect', function () {
             if(k.server.threads[socket.id].stopStreaming()){
                k.server.threads.splice(socket.id, 1);
                console.info("Client disconected: "+socket.id);
            }
          });
        });
    };
    this.stop = function(){
        var console = global.k.console;
        try{
            k.server.sockets.forEach(function(socket){
                k.server.threads[socket.id].stopStreaming();
                console.info("Client kicked: "+socket.id);
            });
            k.server.sockets = [];
            k.server.status = 0;
            console.info("Server closed");
        }
        catch(err){
            console.error("Server can't stop: "+err);
        }
    }
};
module.exports = new Server();




