var translator=require("./translator.js").translator(),cleanInfo=require("./util.js").cleanInfo;exports.compress=function(r,e){return(new CSSOCompressor).compress(r,e)};