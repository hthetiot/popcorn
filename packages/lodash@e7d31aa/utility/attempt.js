var isError=require("../lang/isError"),restParam=require("../function/restParam"),attempt=restParam(function(r,t){try{return r.apply(void 0,t)}catch(e){return isError(e)?e:new Error(e)}});module.exports=attempt;