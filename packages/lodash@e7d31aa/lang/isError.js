function isError(r){return isObjectLike(r)&&"string"==typeof r.message&&objToString.call(r)==errorTag}var isObjectLike=require("../internal/isObjectLike"),errorTag="[object Error]",objectProto=Object.prototype,objToString=objectProto.toString;module.exports=isError;