montageDefine("4603523","index",{dependencies:["fs","stream","stream","util","source-map"],factory:function(n,r,e){"use strict";function t(r){if(!/tools\/node\.js$/.test(r.replace(/\\/g,"/")))return new s;if(u[r])return o(u[r]);var e=n(r),t='var sys = require("util");\nvar MOZ_SourceMap = require("source-map");\nvar UglifyJS = exports;\n'+e.FILES.map(function(n){return i.readFileSync(n,"utf8")}).join("\n"),f=e.parse(t);f.figure_out_scope();var a=f.variables.map(function(n,r){return r});return t+="\n\n"+a.map(function(n){return"exports."+n+" = "+n+";"}).join("\n")+"\n\n",t+='exports.AST_Node.warn_function = function (txt) { if (typeof console != "undefined" && typeof console.warn === "function") console.warn(txt) }\n\n',t+="exports.minify = "+e.minify.toString()+";\n\n",t+="exports.describe_ast = "+e.describe_ast.toString()+";",t=t.replace(/"for"/g,'"fo" + "r"'),u[r]=t,o(t)}function o(n){var r=new f;return r._transform=function(n,r,e){e()},r._flush=function(e){r.push(n),e()},r}var i=n("fs"),s=n("stream").PassThrough,f=n("stream").Transform;if("undefined"==typeof f)throw new Error("UglifyJS only supports browserify when using node >= 0.10.x");var u={};e.exports=t}});