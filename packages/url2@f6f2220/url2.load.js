montageDefine("f6f2220","url2",{dependencies:["url"],factory:function(e,t,r){function i(){var e=s.parse.apply(s,arguments);return e.pathname=e.pathname||"",e.root=!!e.pathname.length&&"/"===e.pathname[0],e.root?e.relative=e.pathname.slice(1):e.relative=e.pathname,e.relative.length?(e.directories=e.relative.split("/"),e.file=e.directories.pop()):(e.directories=[],e.file=null),e}function o(e){if("file"in e&&(e.directories.push(e.file),delete e.file),"directories"in e&&(e.relative=e.directories.join("/"),delete e.directories),"relative"in e&&(e.root?e.pathname="/"+e.relative:e.pathname=e.relative,delete e.relative),null!==e.path&&void 0!==e.path){var t=e.path.indexOf("?");t==-1?(e.pathname=e.path,e.search=""):(e.pathname=e.path.slice(0,t),e.search=e.path.slice(t))}return s.format(e)}function l(e,t){if(e=i(e),t=i(t),delete t.href,t.protocol===e.protocol&&t.slashes===e.slashes&&t.auth===e.auth&&t.host===e.host&&(delete t.protocol,delete t.slashes,delete t.auth,delete t.hostname,delete t.port,delete t.host,Boolean(t.root)===Boolean(e.root))){for(delete t.path,delete t.root;e.directories.length&&t.directories.length&&t.directories[0]==e.directories[0];)t.directories.shift(),e.directories.shift();for(;e.directories.length;)e.directories.shift(),t.directories.unshift("..");t.root||t.directories.length||t.file||!e.file||t.directories.push("."),0===t.directories.length&&null===t.file&&e.search&&(t.search=e.search)}return t}function a(e,t){return o(l(e,t))}var s=e("url");t.resolve=s.resolve,t.resolveObject=s.resolveObject,t.parse=i,t.format=o,t.relativeObject=l,t.relative=a}});