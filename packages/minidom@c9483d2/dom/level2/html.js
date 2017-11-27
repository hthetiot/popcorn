function resolveHref(e,t){var n=URL.resolve(e,t),o=URL.resolve(n,"#"),r=URL.parse(n),i=o.slice(0,-1)+(r.hash||"");return/^file\:\/\/\/[a-z]\:\//i.test(e)&&/^file\:\/\/\//.test(i)&&!/^file\:\/\/\/[a-z]\:\//i.test(i)&&(i=i.replace(/^file\:\/\/\//,e.substring(0,11))),i}function define(e,t){var n=t.tagName,o=t.tagNames||(n?[n]:[]),r=t.parentClass||core.HTMLElement,i=t.attributes||[],a=t.proto||{},c=core[e]=function(e,t){r.call(this,e,t||n.toUpperCase()),c._init&&c._init.call(this)};c._init=t.init,c.prototype=a,c.prototype.__proto__=r.prototype,i.forEach(function(e){var t=e.prop||e,n=e.attr||t.toLowerCase();e.prop&&e.read===!1||c.prototype.__defineGetter__(t,function(){var t=this.getAttribute(n);return e.type&&"boolean"===e.type?null!==t:e.type&&"long"===e.type?+t:"object"==typeof e&&e.normalize?e.normalize(t):t}),e.prop&&e.write===!1||c.prototype.__defineSetter__(t,function(t){if(t){var o=t.toString();e.normalize&&(o=e.normalize(o)),this.setAttribute(n,o)}else this.removeAttribute(n)})}),o.forEach(function(e){core.Document.prototype._elementBuilders[e.toLowerCase()]=function(e,n){var o=new c(e,n);return t.elementBuilder?t.elementBuilder(o,e,n):o}})}function closest(e,t){for(t=t.toUpperCase();e;){if(e.nodeName.toUpperCase()===t||e.tagName&&e.tagName.toUpperCase()===t)return e;e=e._parentNode}return null}function descendants(e,t,n){var o=n?e._ownerDocument||e:e;return new core.HTMLCollection(o,core.mapper(e,function(e){return e.nodeName===t&&"undefined"==typeof e._publicId},n))}function firstChild(e,t){if(!e)return null;var n=descendants(e,t,!1);return n.length>0?n[0]:null}function ResourceQueue(e){this.paused=!!e}function loadFrame(e){e._contentDocument&&(e._contentDocument._parentWindow?e._contentDocument.parentWindow.close():delete e._contentDocument);var t=e.src,n=e._ownerDocument,o=core.resourceLoader.resolve(n,t),r=e._contentDocument=new core.HTMLDocument({url:o,documentRoot:Path.dirname(o)});applyDocumentFeatures(r,n.implementation._features);var i=n.parentWindow,a=r.parentWindow;a.parent=i,a.top=i.top,core.resourceLoader.load(e,o,function(e,t){r.write(e),r.close()})}var core=require("./core").dom.level2.core,events=require("./core").dom.level2.events,applyDocumentFeatures=require("../browser/documentfeatures").applyDocumentFeatures,URL=require("url"),Path=require("path"),fs=require("fs"),http=require("http"),https=require("https");core=Object.create(core),core.languageProcessors={javascript:require("./languages/javascript").javascript},core.resourceLoader={load:function(e,t,n){var o=e._ownerDocument.implementation;if(o.hasFeature("FetchExternalResources",e.tagName.toLowerCase())){var r=this.resolve(e._ownerDocument,t),i=URL.parse(r);if(o.hasFeature("SkipExternalResources",r))return!1;i.hostname?this.download(i,e._ownerDocument._cookie,e._ownerDocument._cookieDomain,this.baseUrl(e._ownerDocument),this.enqueue(e,n,r)):this.readFile(i.pathname,this.enqueue(e,n,r))}},enqueue:function(e,t,n){var o=e.nodeType===core.Node.DOCUMENT_NODE?e:e._ownerDocument;return o._queue?o._queue.push(function(r,i){var a=o.createEvent("HTMLEvents");if(!r)try{t.call(e,i,n||o.URL),a.initEvent("load",!1,!1)}catch(c){r=c}r&&(a.initEvent("error",!1,!1),a.error=r),e.dispatchEvent(a)}):function(){}},baseUrl:function(e){var t=e.getElementsByTagName("base"),n=e.URL;if(t.length>0){var o=t.item(0).href;o&&(n=resolveHref(n,o))}return n},resolve:function(e,t){if(null===t)return"";var n=this.baseUrl(e);return resolveHref(n,t)},download:function(e,t,n,o,r){var i,a=e.pathname+(e.search||""),c={method:"GET",host:e.hostname,path:a};if("https:"===e.protocol?(c.port=e.port||443,i=https.request(c)):(c.port=e.port||80,i=http.request(c)),o&&i.setHeader("Referer",o),t){var s=e.host.split(":")[0];s.indexOf(n,s.length-n.length)!==-1&&i.setHeader("cookie",t)}i.on("response",function(i){function a(){if([301,302,303,307].indexOf(i.statusCode)>-1){var a=URL.resolve(e,i.headers.location);core.resourceLoader.download(URL.parse(a),t,n,o,r)}else r(null,c)}var c="";i.setEncoding("utf8"),i.on("data",function(e){c+=e.toString()}),i.on("end",function(){i.removeAllListeners("close"),a()}),i.on("close",function(e){e?r(e):a()})}),i.on("error",r),i.end()},readFile:function(e,t){fs.readFile(e.replace(/^file:\/\//,"").replace(/^\/([a-z]):\//i,"$1:/").replace(/%20/g," "),"utf8",t)}},core.HTMLCollection=function(e,t){this._keys=[],core.NodeList.call(this,e,t)},core.HTMLCollection.prototype={namedItem:function(e){if(Object.prototype.hasOwnProperty.call(this,e))return this[e];for(var t,n=this._toArray(),o=n.length,r=null,i=0;i<o;i++){if(t=n[i],t.getAttribute("id")===e)return t;t.getAttribute("name")===e&&(r=t)}return r},toString:function(){return"[ jsdom HTMLCollection ]: contains "+this.length+" items"},_resetTo:function(e){function t(e,t){var n=e.getAttribute(t);n&&!Object.prototype.hasOwnProperty.call(o,n)&&(o[n]=e,o._keys.push(n))}var n,o=this;for(n=0;n<this._keys.length;++n)delete this[this._keys[n]];for(this._keys=[],core.NodeList.prototype._resetTo.apply(this,arguments),n=0;n<e.length;++n)t(e[n],"id");for(n=0;n<e.length;++n)t(e[n],"name")}},Object.defineProperty(core.HTMLCollection.prototype,"constructor",{value:core.NodeList,writable:!0,configurable:!0}),core.HTMLCollection.prototype.__proto__=core.NodeList.prototype,core.HTMLOptionsCollection=core.HTMLCollection,ResourceQueue.prototype={push:function(e){var t=this,n={prev:t.tail,check:function(){t.paused||this.prev||!this.fired||(e(this.err,this.data),this.next?(this.next.prev=null,this.next.check()):t.tail=null)}};return t.tail&&(t.tail.next=n),t.tail=n,function(e,t){n.fired=1,n.err=e,n.data=t,n.check()}},resume:function(){if(this.paused){this.paused=!1;for(var e=this.tail;e&&e.prev;)e=e.prev;e&&e.check()}}},core.HTMLDocument=function(e){e=e||{},e.contentType||(e.contentType="text/html"),core.Document.call(this,e),this._referrer=e.referrer,this._cookie=e.cookie,this._cookieDomain=e.cookieDomain||"127.0.0.1",this._URL=e.url||"/",this._documentRoot=e.documentRoot||Path.dirname(this._URL),this._queue=new ResourceQueue(e.deferClose),this.readyState="loading",this.implementation.addFeature("core","2.0"),this.implementation.addFeature("html","2.0"),this.implementation.addFeature("xhtml","2.0"),this.implementation.addFeature("xml","2.0")},core.HTMLDocument.prototype={_referrer:"",get referrer(){return this._referrer||""},get domain(){return""},_URL:"",get URL(){return this._URL},get images(){return this.getElementsByTagName("IMG")},get applets(){return new core.HTMLCollection(this,core.mapper(this,function(e){if(e&&e.tagName){var t=e.tagName.toUpperCase();if("APPLET"===t)return!0;if("OBJECT"===t&&e.getElementsByTagName("APPLET").length>0)return!0}}))},get links(){return new core.HTMLCollection(this,core.mapper(this,function(e){if(e&&e.tagName){var t=e.tagName.toUpperCase();if("AREA"===t||"A"===t&&e.href)return!0}}))},get forms(){return this.getElementsByTagName("FORM")},get anchors(){return this.getElementsByTagName("A")},open:function(){this._childNodes=new core.NodeList,this._documentElement=null,this._modified()},close:function(){this._queue.resume(),core.resourceLoader.enqueue(this,function(){this.readyState="complete";var e=this.createEvent("HTMLEvents");e.initEvent("DOMContentLoaded",!1,!1),this.dispatchEvent(e)})(null,!0)},write:function(e){if(this._writeAfterElement){var t=this.createElement("div");t.innerHTML=e;for(var n=t.firstChild,o=this._writeAfterElement,r=this._writeAfterElement.parentNode;n;){var i=n;n=n.nextSibling,r.insertBefore(i,o.nextSibling),o=i}}else if("loading"===this.readyState){for(var i=this;i.lastChild&&i.lastChild.nodeType===this.ELEMENT_NODE;)i=i.lastChild;i.innerHTML=e}else this.innerHTML=e},writeln:function(e){this.write(e+"\n")},getElementsByName:function(e){return new core.HTMLCollection(this,core.mapper(this,function(t){return t.getAttribute&&t.getAttribute("name")===e}))},get title(){var e=this.head,t=e?firstChild(e,"TITLE"):null;return t?t.textContent:""},set title(e){var t=firstChild(this.head,"TITLE");if(!t){t=this.createElement("TITLE");var n=this.head;n||(n=this.createElement("HEAD"),this.documentElement.insertBefore(n,this.documentElement.firstChild)),n.appendChild(t)}t.textContent=e},get head(){return firstChild(this.documentElement,"HEAD")},set head(e){},get body(){var e=firstChild(this.documentElement,"BODY");return e||(e=firstChild(this.documentElement,"FRAMESET")),e},get documentElement(){return this._documentElement||(this._documentElement=firstChild(this,"HTML")),this._documentElement},_cookie:"",get cookie(){return this._cookie||""},set cookie(e){this._cookie=e}},core.HTMLDocument.prototype.__proto__=core.Document.prototype,define("HTMLElement",{parentClass:core.Element,proto:{dispatchEvent:function(e){var t=core.Node.prototype.dispatchEvent.call(this,e);return!e._preventDefault&&e.target._eventDefaults[e.type]&&"function"==typeof e.target._eventDefaults[e.type]&&e.target._eventDefaults[e.type](e),t},_eventDefaults:{}},attributes:["id","title","lang","dir",{prop:"className",attr:"class",normalize:function(e){return e||""}}]}),core.Document.prototype._defaultElementBuilder=function(e,t){return new core.HTMLElement(e,t)};var listedElements=/button|fieldset|input|keygen|object|select|textarea/i;define("HTMLFormElement",{tagName:"FORM",proto:{get elements(){return new core.HTMLCollection(this._ownerDocument,core.mapper(this,function(e){return listedElements.test(e.nodeName)}))},get length(){return this.elements.length},_dispatchSubmitEvent:function(){var e=this._ownerDocument.createEvent("HTMLEvents");e.initEvent("submit",!0,!0),this.dispatchEvent(e)||this.submit()},submit:function(){},reset:function(){this.elements._toArray().forEach(function(e){e.value=e.defaultValue})}},attributes:["name",{prop:"acceptCharset",attr:"accept-charset"},"action","enctype","method","target"]}),define("HTMLLinkElement",{tagName:"LINK",proto:{get href(){return core.resourceLoader.resolve(this._ownerDocument,this.getAttribute("href"))}},attributes:[{prop:"disabled",type:"boolean"},"charset","href","hreflang","media","rel","rev","target","type"]}),define("HTMLMetaElement",{tagName:"META",attributes:["content",{prop:"httpEquiv",attr:"http-equiv"},"name","scheme"]}),define("HTMLHtmlElement",{tagName:"HTML",attributes:["version"]}),define("HTMLHeadElement",{tagName:"HEAD",attributes:["profile"]}),define("HTMLTitleElement",{tagName:"TITLE",proto:{get text(){return this.innerHTML},set text(e){this.innerHTML=e}}}),define("HTMLBaseElement",{tagName:"BASE",attributes:["href","target"]}),define("HTMLIsIndexElement",{tagName:"ISINDEX",parentClass:core.Element,proto:{get form(){return closest(this,"FORM")}},attributes:["prompt"]}),define("HTMLStyleElement",{tagName:"STYLE",attributes:[{prop:"disabled",type:"boolean"},"media","type"]}),define("HTMLBodyElement",{proto:function(){var e={};return["onafterprint","onbeforeprint","onbeforeunload","onblur","onerror","onfocus","onhashchange","onload","onmessage","onoffline","ononline","onpagehide","onpageshow","onpopstate","onresize","onscroll","onstorage","onunload"].forEach(function(t){e.__defineSetter__(t,function(e){this._ownerDocument.parentWindow[t]=e}),e.__defineGetter__(t,function(){return this._ownerDocument.parentWindow[t]})}),e}(),tagName:"BODY",attributes:["aLink","background","bgColor","link","text","vLink"]}),define("HTMLSelectElement",{tagName:"SELECT",proto:{get options(){return new core.HTMLOptionsCollection(this,core.mapper(this,function(e){return"OPTION"===e.nodeName}))},get length(){return this.options.length},get selectedIndex(){return this.options._toArray().reduceRight(function(e,t,n){return t.selected?n:e},-1)},set selectedIndex(e){this.options._toArray().forEach(function(t,n){t.selected=n===e})},get value(){var e=this.selectedIndex;return this.options.length&&e===-1&&(e=0),e===-1?"":this.options[e].value},set value(e){var t=this;this.options._toArray().forEach(function(n){n.value===e?n.selected=!0:t.hasAttribute("multiple")||(n.selected=!1)})},get form(){return closest(this,"FORM")},get type(){return this.multiple?"select-multiple":"select-one"},add:function(e,t){t?this.insertBefore(e,t):this.appendChild(e)},remove:function(e){var t=this.options._toArray();if(e>=0&&e<t.length){var n=t[e];n._parentNode.removeChild(n)}},blur:function(){this._ownerDocument.activeElement=this._ownerDocument.body},focus:function(){this._ownerDocument.activeElement=this}},attributes:[{prop:"disabled",type:"boolean"},{prop:"multiple",type:"boolean"},"name",{prop:"size",type:"long"},{prop:"tabIndex",type:"long"}]}),define("HTMLOptGroupElement",{tagName:"OPTGROUP",attributes:[{prop:"disabled",type:"boolean"},"label"]}),define("HTMLOptionElement",{tagName:"OPTION",proto:{_attrModified:function(e,t){"selected"===e&&(this.selected=this.defaultSelected),core.HTMLElement.prototype._attrModified.call(this,arguments)},get form(){return closest(this,"FORM")},get defaultSelected(){return null!==this.getAttribute("selected")},set defaultSelected(e){e?this.setAttribute("selected","selected"):this.removeAttribute("selected")},get text(){return this.innerHTML},get value(){return this.hasAttribute("value")?this.getAttribute("value"):this.innerHTML},set value(e){this.setAttribute("value",e)},get index(){return closest(this,"SELECT").options._toArray().indexOf(this)},get selected(){if(void 0===this._selected&&(this._selected=this.defaultSelected),!this._selected&&this.parentNode){var e=closest(this,"SELECT");if(e){var t=e.options;if(t.item(0)===this&&!e.hasAttribute("multiple")){for(var n=t._toArray(),o=1,r=n.length;o<r;o++)if(n[o]._selected)return!1;return!0}}}return this._selected},set selected(e){if(this._selected=!!e,e){var t=this._parentNode;if(!t)return;if("SELECT"!==t.nodeName){if(t=t._parentNode,!t)return;if("SELECT"!==t.nodeName)return}if(!t.multiple)for(var n=t.options,o=0;o<n.length;o++)n[o]!==this&&(n[o].selected=!1)}}},attributes:[{prop:"disabled",type:"boolean"},"label"]}),define("HTMLInputElement",{tagName:"INPUT",init:function(){this.hasAttribute("type")||this.setAttribute("type","text")},proto:{_initDefaultValue:function(){if(void 0===this._defaultValue){var e=this.getAttributeNode("value");this._defaultValue=e?e.value:null}return this._defaultValue},_initDefaultChecked:function(){return void 0===this._defaultChecked&&(this._defaultChecked=!!this.getAttribute("checked")),this._defaultChecked},get form(){return closest(this,"FORM")},get defaultValue(){return this._initDefaultValue()},get defaultChecked(){return this._initDefaultChecked()},get checked(){return!!this._attributes.getNamedItem("checked")},set checked(e){if(this._initDefaultChecked(),e){if(this.setAttribute("checked","checked"),"radio"===this.type)for(var t=this._ownerDocument.getElementsByName(this.name),n=0;n<t.length;n++)t[n]!==this&&"INPUT"===t[n].tagName&&"radio"===t[n].type&&(t[n].checked=!1)}else this.removeAttribute("checked")},get value(){return this.getAttribute("value")},set value(e){this._initDefaultValue(),null===e?this.removeAttribute("value"):this.setAttribute("value",e)},blur:function(){this._ownerDocument.activeElement=this._ownerDocument.body},focus:function(){this._ownerDocument.activeElement=this},select:function(){},_dispatchClickEvent:function(){var e=this._ownerDocument.createEvent("HTMLEvents");e.initEvent("click",!0,!0),this.dispatchEvent(e)},click:function(){if("checkbox"===this.type)this.checked=!this.checked;else if("radio"===this.type)this.checked=!0;else if("submit"===this.type){var e=this.form;e&&e._dispatchSubmitEvent()}this._dispatchClickEvent()}},attributes:["accept","accessKey","align","alt",{prop:"disabled",type:"boolean"},{prop:"maxLength",type:"long"},"name",{prop:"readOnly",type:"boolean"},{prop:"size",type:"long"},"src",{prop:"tabIndex",type:"long"},{prop:"type",normalize:function(e){return e?e.toLowerCase():"text"}},"useMap"]}),define("HTMLTextAreaElement",{tagName:"TEXTAREA",proto:{_initDefaultValue:function(){return void 0===this._defaultValue&&(this._defaultValue=this.textContent),this._defaultValue},get form(){return closest(this,"FORM")},get defaultValue(){return this._initDefaultValue()},get value(){return this.textContent},set value(e){this._initDefaultValue(),this.textContent=e},get type(){return"textarea"},blur:function(){this._ownerDocument.activeElement=this._ownerDocument.body},focus:function(){this._ownerDocument.activeElement=this},select:function(){}},attributes:["accessKey",{prop:"cols",type:"long"},{prop:"disabled",type:"boolean"},{prop:"maxLength",type:"long"},"name",{prop:"readOnly",type:"boolean"},{prop:"rows",type:"long"},{prop:"tabIndex",type:"long"}]}),define("HTMLButtonElement",{tagName:"BUTTON",proto:{get form(){return closest(this,"FORM")},focus:function(){this._ownerDocument.activeElement=this},blur:function(){this._ownerDocument.activeElement=this._ownerDocument.body}},attributes:["accessKey",{prop:"disabled",type:"boolean"},"name",{prop:"tabIndex",type:"long"},"type","value"]}),define("HTMLLabelElement",{tagName:"LABEL",proto:{get form(){return closest(this,"FORM")}},attributes:["accessKey",{prop:"htmlFor",attr:"for"}]}),define("HTMLFieldSetElement",{tagName:"FIELDSET",proto:{get form(){return closest(this,"FORM")}}}),define("HTMLLegendElement",{tagName:"LEGEND",proto:{get form(){return closest(this,"FORM")}},attributes:["accessKey","align"]}),define("HTMLUListElement",{tagName:"UL",attributes:[{prop:"compact",type:"boolean"},"type"]}),define("HTMLOListElement",{tagName:"OL",attributes:[{prop:"compact",type:"boolean"},{prop:"start",type:"long"},"type"]}),define("HTMLDListElement",{tagName:"DL",attributes:[{prop:"compact",type:"boolean"}]}),define("HTMLDirectoryElement",{tagName:"DIR",attributes:[{prop:"compact",type:"boolean"}]}),define("HTMLMenuElement",{tagName:"MENU",attributes:[{prop:"compact",type:"boolean"}]}),define("HTMLLIElement",{tagName:"LI",attributes:["type",{prop:"value",type:"long"}]}),define("HTMLCanvasElement",{tagName:"CANVAS",attributes:["align"],elementBuilder:function(e){try{var t=new(require("canvas"))(0,0);for(var n in e)t[n]||(t[n]=e[n]);return t}catch(o){return e}}}),define("HTMLDivElement",{tagName:"DIV",attributes:["align"]}),define("HTMLParagraphElement",{tagName:"P",attributes:["align"]}),define("HTMLHeadingElement",{tagNames:["H1","H2","H3","H4","H5","H6"],attributes:["align"]}),define("HTMLQuoteElement",{tagNames:["Q","BLOCKQUOTE"],attributes:["cite"]}),define("HTMLPreElement",{tagName:"PRE",attributes:[{prop:"width",type:"long"}]}),define("HTMLBRElement",{tagName:"BR",attributes:["clear"]}),define("HTMLBaseFontElement",{tagName:"BASEFONT",attributes:["color","face",{prop:"size",type:"long"}]}),define("HTMLFontElement",{tagName:"FONT",attributes:["color","face","size"]}),define("HTMLHRElement",{tagName:"HR",attributes:["align",{prop:"noShade",type:"boolean"},"size","width"]}),define("HTMLModElement",{tagNames:["INS","DEL"],attributes:["cite","dateTime"]}),define("HTMLAnchorElement",{tagName:"A",proto:{blur:function(){this._ownerDocument.activeElement=this._ownerDocument.body},focus:function(){this._ownerDocument.activeElement=this},get href(){return core.resourceLoader.resolve(this._ownerDocument,this.getAttribute("href"))},get hostname(){return URL.parse(this.href).hostname},get pathname(){return URL.parse(this.href).pathname}},attributes:["accessKey","charset","coords",{prop:"href",type:"string",read:!1},"hreflang","name","rel","rev","shape",{prop:"tabIndex",type:"long"},"target","type"]}),define("HTMLImageElement",{tagName:"IMG",proto:{_attrModified:function(e,t,n){"src"==e&&t!==n&&core.resourceLoader.enqueue(this,function(){})()},get src(){return core.resourceLoader.resolve(this._ownerDocument,this.getAttribute("src"))}},attributes:["name","align","alt","border",{prop:"height",type:"long"},{prop:"hspace",type:"long"},{prop:"isMap",type:"boolean"},"longDesc",{prop:"src",type:"string",read:!1},"useMap",{prop:"vspace",type:"long"},{prop:"width",type:"long"}]}),define("HTMLObjectElement",{tagName:"OBJECT",proto:{get form(){return closest(this,"FORM")},get contentDocument(){return null}},attributes:["code","align","archive","border","codeBase","codeType","data",{prop:"declare",type:"boolean"},{prop:"height",type:"long"},{prop:"hspace",type:"long"},"name","standby",{prop:"tabIndex",type:"long"},"type","useMap",{prop:"vspace",type:"long"},{prop:"width",type:"long"}]}),define("HTMLParamElement",{tagName:"PARAM",attributes:["name","type","value","valueType"]}),define("HTMLAppletElement",{tagName:"APPLET",attributes:["align","alt","archive","code","codeBase","height",{prop:"hspace",type:"long"},"name","object",{prop:"vspace",type:"long"},"width"]}),define("HTMLMapElement",{tagName:"MAP",proto:{get areas(){return this.getElementsByTagName("AREA")}},attributes:["name"]}),define("HTMLAreaElement",{tagName:"AREA",attributes:["accessKey","alt","coords","href",{prop:"noHref",type:"boolean"},"shape",{prop:"tabIndex",type:"long"},"target"]}),define("HTMLScriptElement",{tagName:"SCRIPT",init:function(){this.addEventListener("DOMNodeInsertedIntoDocument",function(){if(this.src)core.resourceLoader.load(this,this.src,this._eval);else{var e=this.sourceLocation||{},t=e.file||this._ownerDocument.URL;e&&(t+=":"+e.line+":"+e.col),t+="<script>",core.resourceLoader.enqueue(this,this._eval,t)(null,this.text)}})},proto:{_eval:function(e,t){this._ownerDocument.implementation.hasFeature("ProcessExternalResources","script")&&this.language&&core.languageProcessors[this.language]&&(this._ownerDocument._writeAfterElement=this,core.languageProcessors[this.language](this,e,t),delete this._ownerDocument._writeAfterElement)},get language(){var e=this.type||"text/javascript";return e.split("/").pop().toLowerCase()},get text(){var e=0,t=this.childNodes,n=t.length,o=[];for(e;e<n;e++)o.push(t.item(e).nodeValue);return o.join("")},set text(e){for(;this.childNodes.length;)this.removeChild(this.childNodes[0]);this.appendChild(this._ownerDocument.createTextNode(e))}},attributes:[{prop:"defer",type:"boolean"},"htmlFor","event","charset","type","src"]}),define("HTMLTableElement",{tagName:"TABLE",proto:{get caption(){return firstChild(this,"CAPTION")},get tHead(){return firstChild(this,"THEAD")},get tFoot(){return firstChild(this,"TFOOT")},get rows(){if(!this._rows){var e=this;this._rows=new core.HTMLCollection(this._ownerDocument,function(){var t=[e.tHead].concat(e.tBodies._toArray(),e.tFoot).filter(function(e){return!!e});return 0===t.length?core.mapDOMNodes(e,!1,function(e){return"TR"===e.tagName}):t.reduce(function(e,t){return e.concat(t.rows._toArray())},[])})}return this._rows},get tBodies(){return this._tBodies||(this._tBodies=descendants(this,"TBODY",!1)),this._tBodies},createTHead:function(){var e=this.tHead;return e||(e=this._ownerDocument.createElement("THEAD"),this.appendChild(e)),e},deleteTHead:function(){var e=this.tHead;e&&e._parentNode.removeChild(e)},createTFoot:function(){var e=this.tFoot;return e||(e=this._ownerDocument.createElement("TFOOT"),this.appendChild(e)),e},deleteTFoot:function(){var e=this.tFoot;e&&e._parentNode.removeChild(e)},createCaption:function(){var e=this.caption;return e||(e=this._ownerDocument.createElement("CAPTION"),this.appendChild(e)),e},deleteCaption:function(){var e=this.caption;e&&e._parentNode.removeChild(e)},insertRow:function(e){var t=this._ownerDocument.createElement("TR");0===this.childNodes.length&&this.appendChild(this._ownerDocument.createElement("TBODY"));var n=this.rows._toArray();if(e<-1||e>n.length)throw new core.DOMException(core.INDEX_SIZE_ERR);if(e===-1||0===e&&0===n.length)this.tBodies.item(0).appendChild(t);else if(e===n.length){var o=n[e-1];o._parentNode.appendChild(t)}else{var o=n[e];o._parentNode.insertBefore(t,o)}return t},deleteRow:function(e){var t=this.rows._toArray(),n=t.length;if(e===-1&&(e=n-1),e<0||e>=n)throw new core.DOMException(core.INDEX_SIZE_ERR);var o=t[e];o._parentNode.removeChild(o)}},attributes:["align","bgColor","border","cellPadding","cellSpacing","frame","rules","summary","width"]}),define("HTMLTableCaptionElement",{tagName:"CAPTION",attributes:["align"]}),define("HTMLTableColElement",{tagNames:["COL","COLGROUP"],attributes:["align",{prop:"ch",attr:"char"},{prop:"chOff",attr:"charoff"},{prop:"span",type:"long"},"vAlign","width"]}),define("HTMLTableSectionElement",{tagNames:["THEAD","TBODY","TFOOT"],proto:{get rows(){return this._rows||(this._rows=descendants(this,"TR",!1)),this._rows},insertRow:function(e){var t=this._ownerDocument.createElement("TR"),n=this.rows._toArray();if(e<-1||e>n.length)throw new core.DOMException(core.INDEX_SIZE_ERR);if(e===-1||e===n.length)this.appendChild(t);else{var o=n[e];this.insertBefore(t,o)}return t},deleteRow:function(e){var t=this.rows._toArray();if(e===-1&&(e=t.length-1),e<0||e>=t.length)throw new core.DOMException(core.INDEX_SIZE_ERR);var n=this.rows[e];this.removeChild(n)}},attributes:["align",{prop:"ch",attr:"char"},{prop:"chOff",attr:"charoff"},{prop:"span",type:"long"},"vAlign","width"]}),define("HTMLTableRowElement",{tagName:"TR",proto:{get cells(){return this._cells||(this._cells=new core.HTMLCollection(this,core.mapper(this,function(e){return"TD"===e.nodeName||"TH"===e.nodeName},!1))),this._cells},get rowIndex(){var e=closest(this,"TABLE");return e?e.rows._toArray().indexOf(this):-1},get sectionRowIndex(){return this._parentNode.rows._toArray().indexOf(this)},insertCell:function(e){var t=this._ownerDocument.createElement("TD"),n=this.cells._toArray();if(e<-1||e>n.length)throw new core.DOMException(core.INDEX_SIZE_ERR);if(e===-1||e===n.length)this.appendChild(t);else{var o=n[e];this.insertBefore(t,o)}return t},deleteCell:function(e){var t=this.cells._toArray();if(e===-1&&(e=t.length-1),e<0||e>=t.length)throw new core.DOMException(core.INDEX_SIZE_ERR);var n=this.cells[e];this.removeChild(n)}},attributes:["align","bgColor",{prop:"ch",attr:"char"},{prop:"chOff",attr:"charoff"},"vAlign"]}),define("HTMLTableCellElement",{tagNames:["TH","TD"],proto:{_headers:null,set headers(e){return""===e?void(this._headers=null):(e instanceof Array||(e=[e]),void(this._headers=e))},get headers(){if(this._headers)return this._headers.join(" ");for(var e=this.cellIndex,t=[],n=this._parentNode.getElementsByTagName(this.tagName),o=0;o<n.length&&!(n.item(o).cellIndex>=e);o++)t.push(n.item(o).id);return this._headers=t,t.join(" ")},get cellIndex(){return closest(this,"TR").cells._toArray().indexOf(this)}},attributes:["abbr","align","axis","bgColor",{prop:"ch",attr:"char"},{prop:"chOff",attr:"charoff"},{prop:"colSpan",type:"long"},"height",{prop:"noWrap",type:"boolean"},{prop:"rowSpan",type:"long"},"scope","vAlign","width"]}),define("HTMLFrameSetElement",{tagName:"FRAMESET",attributes:["cols","rows"]}),define("HTMLFrameElement",{tagName:"FRAME",init:function(){var e=this._ownerDocument.parentWindow,t=e._length++,n=this;e.__defineGetter__(t,function(){return n.contentWindow}),this._initInsertListener=this.addEventListener("DOMNodeInsertedIntoDocument",function(){var t=n._ownerDocument,o=n.contentDocument;applyDocumentFeatures(o,t.implementation._features);var r=n.contentWindow;r.parent=e,r.top=e.top},!1)},proto:{_attrModified:function(e,t,n){core.HTMLElement.prototype._attrModified.call(this,e,t,n);var o=this;"name"===e?(n&&this._ownerDocument.parentWindow._frame(n),t&&this._ownerDocument.parentWindow._frame(t,this)):"src"===e&&(this._attachedToDocument?loadFrame(o):this._waitingOnInsert||(this.removeEventListener("DOMNodeInsertedIntoDocument",this._initInsertListener,!1),this.addEventListener("DOMNodeInsertedIntoDocument",function r(){o.removeEventListener("DOMNodeInsertedIntoDocument",r,!1),this._waitingOnInsert=!1,loadFrame(o)},!1),this._waitingOnInsert=!0))},_contentDocument:null,get contentDocument(){return null==this._contentDocument&&(this._contentDocument=new core.HTMLDocument),this._contentDocument},get contentWindow(){return this.contentDocument.parentWindow}},attributes:["frameBorder","longDesc","marginHeight","marginWidth","name",{prop:"noResize",type:"boolean"},"scrolling",{prop:"src",type:"string",write:!1}]}),define("HTMLIFrameElement",{tagName:"IFRAME",parentClass:core.HTMLFrameElement,attributes:["align","frameBorder","height","longDesc","marginHeight","marginWidth","name","scrolling","src","width"]}),exports.define=define,exports.dom={level2:{html:core}};