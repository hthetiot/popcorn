function trunc(e,r,i){i&&isIterateeCall(e,r,i)&&(r=null);var l=DEFAULT_TRUNC_LENGTH,n=DEFAULT_TRUNC_OMISSION;if(null!=r)if(isObject(r)){var s="separator"in r?r.separator:s;l="length"in r?+r.length||0:l,n="omission"in r?baseToString(r.omission):n}else l=+r||0;if(e=baseToString(e),l>=e.length)return e;var a=l-n.length;if(a<1)return n;var t=e.slice(0,a);if(null==s)return t+n;if(isRegExp(s)){if(e.slice(a).search(s)){var g,u,o=e.slice(0,a);for(s.global||(s=RegExp(s.source,(reFlags.exec(s)||"")+"g")),s.lastIndex=0;g=s.exec(o);)u=g.index;t=t.slice(0,null==u?a:u)}}else if(e.indexOf(s,a)!=a){var c=t.lastIndexOf(s);c>-1&&(t=t.slice(0,c))}return t+n}var baseToString=require("../internal/baseToString"),isIterateeCall=require("../internal/isIterateeCall"),isObject=require("../lang/isObject"),isRegExp=require("../lang/isRegExp"),DEFAULT_TRUNC_LENGTH=30,DEFAULT_TRUNC_OMISSION="...",reFlags=/\w*$/;module.exports=trunc;