var metaMap=require("./metaMap"),noop=require("../utility/noop"),getData=metaMap?function(e){return metaMap.get(e)}:noop;module.exports=getData;