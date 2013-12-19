/*!
 * socket.io-node
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var util = require('./util')
  , toArray = util.toArray;

/**
 * Log levels.
 */

var levels = [
    'error'
  , 'warn'
  , 'info'
  , 'debug'
];

/**
 * Colors for log levels.
 */

var colors = [
    31
  , 33
  , 36
  , 90
];

var htmlcolors = [
    "#f00"
  , "#ff0"
  , "#00f"
  , "#0f0"
];

/**
 * Pads the nice output to the longest log level.
 */

function pad (str) {
  var max = 0;

  for (var i = 0, l = levels.length; i < l; i++)
    max = Math.max(max, levels[i].length);

  if (str.length < max)
    return str + new Array(max - str.length + 1).join(' ');

  return str;
};

/**
 * Logger (console).
 *
 * @api public
 */

var Logger = function (opts) {
  opts = opts || {}
  this.colors = false !== opts.colors;
  this.level = 3;
  this.enabled = true;
  this.container = null;
  
  this.write = function(string,type){
       var color = htmlcolors[levels.indexOf(type)];
       string = string.replace(/"/g,'');
       string = string.replace(/\\n /g,"<br/>");
       this.container.innerHTML += "<font style=\"color:"+color+"\">"+type+" - </font>"+string+"</br>";        
       this.container.scrollTop = this.container.scrollHeight;
  };
};

/**
 * Log method.
 *
 * @api public
 */

Logger.prototype.log = function (type) {
  var index = levels.indexOf(type);

  if (index > this.level || !this.enabled)
    return this;

  if(this.container == null){
    console.log.apply(
        console
      , [this.colors
          ? '   \033[' + colors[index] + 'm' + pad(type) + ' -\033[39m'
          : type + ':'
        ].concat(toArray(arguments).slice(1))
    );
  }else{
      this.write(pad(type) + " - " +JSON.stringify(arguments));
  }
    
    

  return this;
};

/**
 * Generate methods.
 */

levels.forEach(function (name) {
  Logger.prototype[name] = function () {      
    if(this.container == null){
        this.log.apply(this, [name].concat(toArray(arguments)));
    }else{
        this.write(JSON.stringify(arguments[0]),name);
    }    
  };
});

module.exports = new Logger();