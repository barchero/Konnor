      
var Thread = (function(socket){
    this.interval = null;
    this.fps = 120;
    this.socket = socket;
    this.startStreaming = function(){
       this.interval = setInterval(function(){
           socket.emit('stream',{data: "hello"+socket.id}); 
        }, 1000/this.fps);
        return this.interval;
    };
    this.stopStreaming = function(){
        clearInterval(this.interval);
        if(this.interval.ontimeout !== null){
            console.error("stopStreaming("+socket.id+")");
            return false;
        }else{
            return true;
        }        
    };
    return this;
});

module.exports = Thread;


