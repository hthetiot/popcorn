montageDefine("e7d31aa","internal/shimIsPlainObject",{dependencies:["./baseForIn","./isObjectLike"],factory:function(t,e,n){function o(t){var e;if(!r(t)||f.call(t)!=i||!s.call(t,"constructor")&&(e=t.constructor,"function"==typeof e&&!(e instanceof e)))return!1;var n;return c(t,function(t,e){n=e}),void 0===n||s.call(t,n)}var c=t("./baseForIn"),r=t("./isObjectLike"),i="[object Object]",a=Object.prototype,s=a.hasOwnProperty,f=a.toString;n.exports=o}});