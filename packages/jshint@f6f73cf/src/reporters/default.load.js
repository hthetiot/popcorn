montageDefine("f6f73cf","src/reporters/default",{dependencies:[],factory:function(e,r,n){"use strict";n.exports={reporter:function(e,r,n){var o,c=e.length,t="";n=n||{},e.forEach(function(e){var r=e.file,c=e.error;o&&o!==r&&(t+="\n"),o=r,t+=r+": line "+c.line+", col "+c.character+", "+c.reason,n.verbose&&(t+=" ("+c.code+")"),t+="\n"}),t&&console.log(t+"\n"+c+" error"+(1===c?"":"s"))}}}});