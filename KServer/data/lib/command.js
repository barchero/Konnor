/* 
 * The MIT License
 *
 * Copyright 2013 Christian.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var Command = function(){   
    this.run = function(value){
        var console = k.console;
        value = value.toString().trim();
        value = value.replace(/ /g,'');
        value = value.replace(";","");
        value = value.split("=");
        stackTrace = value[0].split(".");
        var actual = k;
        for(var i = 0; i < stackTrace.length; i++){
            if(i == (stackTrace.length - 1)){                
                var start_pos = stackTrace[i].indexOf('(') + 1;
                var end_pos = stackTrace[i].indexOf(')',start_pos);
                var params = stackTrace[i].substring(start_pos,end_pos);
                stackTrace[i] = stackTrace[i].replace(/ *\([^)]*\) */g, "");
                var paramsArray = params.split(",");
                if(typeof actual[stackTrace[i]] === "function"){
                    if(paramsArray[0] != ""){
                        actual[stackTrace[i]](params);
                    }else{
                        actual[stackTrace[i]]();
                    }
                }else{
                    if(value.length == 2){
                       actual[stackTrace[i]] = value[1];
                       console.info("The value of '"+value[0]+"' has been changed to "+value[1]);
                    }else if(typeof actual[stackTrace[i]] !== "undefined"){
                        console.info(actual[stackTrace[i]]);
                    }else{
                        console.warn("The command can't be executed");
                    }
                }
            }else{
                if(stackTrace[i] in actual){
                    actual = actual[stackTrace[i]];
                }else{
                    console.warn("The function '"+value[0]+"' not exists");
                }
            }
        }
    };
    
};
module.exports = new Command();
