montageDefine("2950c1f","http-apps/cookie",{dependencies:["q","../http-cookie"],factory:function(e,t,r){function n(e){var t=f.exec(e);return t?[t[1],t[2]]:[e,""]}function a(e){var t=n(e),r=t[0],a=t[1];if(u.test(r))return[r+a];if("localhost"===r)return[r+a];for(var t=r.split("."),o=[];t.length>1;)o.push("."+t.join(".")+a),t.shift();return o}function o(e,t){var r=n(e),a=r[0],o=r[1],s=n(t),i=s[0],h=s[1];return o===h&&(u.test(a)||u.test(i)?a===i:/^\./.test(a)?i.lastIndexOf(a)===i.length-a.length||a.slice(1)===i:a===i)}function s(e,t){return/^\/$/.test(e)?0===t.indexOf(e):t===e||0===t.indexOf(e+"/")}function i(e){return[].concat.apply([],e)}var h=e("q"),c=e("../http-cookie");h.longStackSupport=!0,t.CookieJar=function(e){var t={};return function(r){if(!r.headers.host)throw new Error("Requests must have a host header");var f=(a(r.headers.host),new Date);for(var d in t){var p=t[d];for(var v in p){var l=p[v];for(var k in l){var y=l[k];y.expires&&y.expires>f&&delete y[k]}}}var g=i(Object.keys(t).map(function(e){if(!o(e,r.headers.host))return[];var n=t[e];return i(Object.keys(n).map(function(e){if(!s(e,r.path))return[];var t=n[e];return Object.keys(t).map(function(e){return t[e]}).filter(function(e){return!e.secure||r.ssl})}))}));return g.length&&(r.headers.cookie=g.map(function(e){return c.stringify(e.key,e.value)}).join("; ")),h.when(e.apply(this,arguments),function(e){if(e.headers=e.headers||{},e.headers["set-cookie"]){var a=r.headers.host,s=n(a),i=s[0],h=u.test(i)?a:"."+a;Array.isArray(e.headers["set-cookie"])||(e.headers["set-cookie"]=[e.headers["set-cookie"]]),e.headers["set-cookie"].forEach(function(r){var n=e.headers.date?new Date(e.headers.date):new Date;r=c.parse(r,n),r.host&&!o(h,r.host)&&delete r.host;var a=h||r.host,s=r.path||"/",i=t[a]=t[a]||{},u=i[s]=i[s]||{};u[r.key]=r}),delete e.headers["set-cookie"]}return e})}};var u=/^\d+\.\d+\.\d+\.\d+$/,f=/^(.*)(:\d+)$/}});