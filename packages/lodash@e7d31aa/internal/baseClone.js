function baseClone(a,e,r,o,n,t,g){var l;if(r&&(l=n?r(a,o,n):r(a)),void 0!==l)return l;if(!isObject(a))return a;var T=isArray(a);if(T){if(l=initCloneArray(a),!e)return arrayCopy(a,l)}else{var b=objToString.call(a),c=b==funcTag;if(b!=objectTag&&b!=argsTag&&(!c||n))return cloneableTags[b]?initCloneByTag(a,b,e):n?a:{};if(l=initCloneObject(c?{}:a),!e)return baseAssign(l,a)}t||(t=[]),g||(g=[]);for(var i=t.length;i--;)if(t[i]==a)return g[i];return t.push(a),g.push(l),(T?arrayEach:baseForOwn)(a,function(o,n){l[n]=baseClone(o,e,r,n,a,t,g)}),l}var arrayCopy=require("./arrayCopy"),arrayEach=require("./arrayEach"),baseAssign=require("./baseAssign"),baseForOwn=require("./baseForOwn"),initCloneArray=require("./initCloneArray"),initCloneByTag=require("./initCloneByTag"),initCloneObject=require("./initCloneObject"),isArray=require("../lang/isArray"),isObject=require("../lang/isObject"),argsTag="[object Arguments]",arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",mapTag="[object Map]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",weakMapTag="[object WeakMap]",arrayBufferTag="[object ArrayBuffer]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",cloneableTags={};cloneableTags[argsTag]=cloneableTags[arrayTag]=cloneableTags[arrayBufferTag]=cloneableTags[boolTag]=cloneableTags[dateTag]=cloneableTags[float32Tag]=cloneableTags[float64Tag]=cloneableTags[int8Tag]=cloneableTags[int16Tag]=cloneableTags[int32Tag]=cloneableTags[numberTag]=cloneableTags[objectTag]=cloneableTags[regexpTag]=cloneableTags[stringTag]=cloneableTags[uint8Tag]=cloneableTags[uint8ClampedTag]=cloneableTags[uint16Tag]=cloneableTags[uint32Tag]=!0,cloneableTags[errorTag]=cloneableTags[funcTag]=cloneableTags[mapTag]=cloneableTags[setTag]=cloneableTags[weakMapTag]=!1;var objectProto=Object.prototype,objToString=objectProto.toString;module.exports=baseClone;