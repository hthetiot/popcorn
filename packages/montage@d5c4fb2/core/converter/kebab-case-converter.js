var Converter=require("./converter").Converter,kebabCase=require("lodash.kebabcase"),singleton,KebabCaseConverter=exports.KebabCaseConverter=Converter.specialize({constructor:{value:function(){return this.constructor===KebabCaseConverter?(singleton||(singleton=this),singleton):this}},convert:{value:kebabCase}});Object.defineProperty(exports,"singleton",{get:function(){return singleton||(singleton=new KebabCaseConverter),singleton}});