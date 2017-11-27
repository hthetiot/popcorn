module.exports={reporter:function(e,r,o){"use strict";function s(e){for(var r in u)"undefined"!=typeof e&&(e=e.replace(new RegExp(r,"g"),u[r]));return e||""}var n,i,c,t,l={},a=[],u={"&":"&amp;",'"':"&quot;","'":"&apos;","<":"&lt;",">":"&gt;"};o=o||{},e.forEach(function(e){e.file=e.file.replace(/^\.\//,""),l[e.file]||(l[e.file]=[]),t=e.error.reason,o.verbose&&(t+=" ("+e.error.code+")");var r=e.error.code,s="";switch(r[0]){case"I":s="info";break;case"W":s="warning";break;case"E":s="error"}l[e.file].push({severity:s,line:e.error.line,column:e.error.character,message:t,source:"jshint."+e.error.code})}),a.push('<?xml version="1.0" encoding="utf-8"?>'),a.push('<checkstyle version="4.3">');for(n in l)if(l.hasOwnProperty(n)){for(a.push('\t<file name="'+n+'">'),i=0;i<l[n].length;i++)c=l[n][i],a.push('\t\t<error line="'+c.line+'" column="'+c.column+'" severity="'+c.severity+'" message="'+s(c.message)+'" source="'+s(c.source)+'" />');a.push("\t</file>")}a.push("</checkstyle>"),console.log(a.join("\n"))}};