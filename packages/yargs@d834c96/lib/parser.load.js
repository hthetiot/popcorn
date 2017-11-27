montageDefine("d834c96","lib/parser",{dependencies:["camelcase","path"],factory:function(n,t,r){function o(n){return void 0!==n?n+1:0}var a=n("camelcase"),e=n("path");r.exports=function(t,r){function c(n,t,o){var a=v(t,r.narg);if(o.length-(n+1)<a)throw Error("not enough arguments following: "+t);for(var e=n+1;e<a+n+1;e++)s(t,o[e]);return n+a}function i(n,t,r){for(var o=n+1;o<r.length&&!/^-/.test(r[o]);o++)n=o,s(t,r[o]);return n}function s(n,t){if((v(n,d.bools)||v(n,d.counts))&&"string"==typeof t&&(t="true"===t),/-/.test(n)&&(!E[n]||!E[n].length)){var r=a(n);E[n]=[r],p[r]=!0}var c=!v(n,d.strings)&&b(t)?Number(t):t;v(n,d.counts)&&(c=o);var i=n.split(".");h(_,i,c),(E[i[0]]||[]).forEach(function(n){if(n=n.split("."),i.length>1){var t=[].concat(i);t.shift(),n=n.concat(t)}h(_,n,c)});for(var s=[n].concat(E[n]||[]),f=0,l=s.length;f<l;f++)if(d.normalize[s[f]]){s.forEach(function(n){_.__defineSetter__(n,function(n){t=e.normalize(n)}),_.__defineGetter__(n,function(){return"string"==typeof t?e.normalize(t):t})});break}}function f(t){var r={};l(r,E,k),Object.keys(d.configs).forEach(function(o){var a=t[o]||r[o];if(a)try{var c=n(e.resolve(process.cwd(),a));Object.keys(c).forEach(function(n){void 0===t[n]&&(delete t[n],s(n,c[n]))})}catch(i){throw Error("invalid json config file: "+a)}})}function l(n,t,r){Object.keys(r).forEach(function(o){u(n,o.split("."))||(h(n,o.split("."),r[o]),(t[o]||[]).forEach(function(t){h(n,t.split("."),r[o])}))})}function u(n,t){var r=n;t.slice(0,-1).forEach(function(n){r=r[n]||{}});var o=t[t.length-1];return o in r}function h(n,t,r){var a=n;t.slice(0,-1).forEach(function(n){void 0===a[n]&&(a[n]={}),a=a[n]});var e=t[t.length-1];r===o?a[e]=o(a[e]):void 0===a[e]&&v(e,d.arrays)?a[e]=Array.isArray(r)?r:[r]:void 0===a[e]||"boolean"==typeof a[e]?a[e]=r:Array.isArray(a[e])?a[e].push(r):a[e]=[a[e],r]}function g(n){Object.keys(n||{}).forEach(function(n){E[n]=[].concat(r.alias[n]||[]),E[n].concat(n).forEach(function(t){if(/-/.test(t)){var r=a(t);E[n].push(r),p[r]=!0}}),E[n].forEach(function(t){E[t]=[n].concat(E[n].filter(function(n){return t!==n}))})})}function v(n,t){var r=!1,o=[].concat(E[n]||[],n);return o.forEach(function(n){t[n]&&(r=t[n])}),r}function y(n){var t={"boolean":!0,string:"",array:[]};return t[n]}function m(n,t){var r="boolean";return t.strings&&t.strings[n]?r="string":t.arrays&&t.arrays[n]&&(r="array"),r}function b(n){return"number"==typeof n||(!!/^0x[0-9a-f]+$/i.test(n)||/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(n))}r||(r={});var d={arrays:{},bools:{},strings:{},counts:{},normalize:{},configs:{}};[].concat(r.array).filter(Boolean).forEach(function(n){d.arrays[n]=!0}),[].concat(r["boolean"]).filter(Boolean).forEach(function(n){d.bools[n]=!0}),[].concat(r.string).filter(Boolean).forEach(function(n){d.strings[n]=!0}),[].concat(r.count).filter(Boolean).forEach(function(n){d.counts[n]=!0}),[].concat(r.normalize).filter(Boolean).forEach(function(n){d.normalize[n]=!0}),[].concat(r.config).filter(Boolean).forEach(function(n){d.configs[n]=!0});var E={},p={};g(r.key),g(r.alias);var k=r["default"]||{};Object.keys(k).forEach(function(n){/-/.test(n)&&!r.alias[n]&&(E[n]=E[n]||[]),(E[n]||[]).forEach(function(t){k[t]=k[n]})});var _={_:[]};Object.keys(d.bools).forEach(function(n){s(n,n in k&&k[n])});var O=[];t.indexOf("--")!==-1&&(O=t.slice(t.indexOf("--")+1),t=t.slice(0,t.indexOf("--")));for(var j=0;j<t.length;j++){var z,A,B,$,w,x,S=t[j];if(S.match(/^--.+=/))$=S.match(/^--([^=]+)=([\s\S]*)$/),v($[1],r.narg)?(t.splice(j+1,$[1],$[2]),j=c(j,$[1],t)):v($[1],d.arrays)&&t.length>j+1?(t.splice(j+1,$[1],$[2]),j=i(j,$[1],t)):s($[1],$[2]);else if(S.match(/^--no-.+/))A=S.match(/^--no-(.+)/)[1],s(A,!1);else if(S.match(/^--.+/))A=S.match(/^--(.+)/)[1],v(A,r.narg)?j=c(j,A,t):v(A,d.arrays)&&t.length>j+1?j=i(j,A,t):(w=t[j+1],void 0===w||w.match(/^-/)||v(A,d.bools)||v(A,d.counts)?/^(true|false)$/.test(w)?(s(A,w),j++):s(A,y(m(A,d))):(s(A,w),j++));else if(S.match(/^-.\..+=/))$=S.match(/^-([^=]+)=([\s\S]*)$/),s($[1],$[2]);else if(S.match(/^-.\..+/))w=t[j+1],A=S.match(/^-(.\..+)/)[1],void 0===w||w.match(/^-/)||v(A,d.bools)||v(A,d.counts)?s(A,y(m(A,d))):(s(A,w),j++);else if(S.match(/^-[^-]+/)){B=S.slice(1,-1).split(""),z=!1;for(var N=0;N<B.length;N++){if(w=S.slice(N+2),B[N+1]&&"="===B[N+1]){x=S.slice(N+3),A=B[N],v(B[N],r.narg)?(t.splice(j+1,0,x),j=c(j,A,t)):v(A,d.arrays)&&t.length>j+1?(t.splice(j+1,0,x),j=i(j,A,t)):s(A,x),z=!0;break}if("-"!==w){if(/[A-Za-z]/.test(B[N])&&/-?\d+(\.\d*)?(e-?\d+)?$/.test(w)){s(B[N],w),z=!0;break}if(B[N+1]&&B[N+1].match(/\W/)){s(B[N],S.slice(N+2)),z=!0;break}s(B[N],y(m(B[N],d)))}else s(B[N],w)}A=S.slice(-1)[0],z||"-"===A||(v(A,r.narg)?j=c(j,A,t):v(A,d.arrays)&&t.length>j+1?j=i(j,A,t):!t[j+1]||/^(-|--)[^-]/.test(t[j+1])||v(A,d.bools)||v(A,d.counts)?t[j+1]&&/true|false/.test(t[j+1])?(s(A,t[j+1]),j++):s(A,y(m(A,d))):(s(A,t[j+1]),j++))}else _._.push(d.strings._||!b(S)?S:Number(S))}return f(_),l(_,E,k),Object.keys(d.counts).forEach(function(n){s(n,k[n])}),O.forEach(function(n){_._.push(n)}),{argv:_,aliases:E,newAliases:p}}}});