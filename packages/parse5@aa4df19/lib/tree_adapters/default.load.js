montageDefine("aa4df19","lib/tree_adapters/default",{dependencies:[],factory:function(e,t,n){"use strict";t.createDocument=function(){return{nodeName:"#document",quirksMode:!1,childNodes:[]}},t.createDocumentFragment=function(){return{nodeName:"#document-fragment",quirksMode:!1,childNodes:[]}},t.createElement=function(e,t,n){return{nodeName:e,tagName:e,attrs:n,namespaceURI:t,childNodes:[],parentNode:null}},t.createCommentNode=function(e){return{nodeName:"#comment",data:e,parentNode:null}};var o=function(e){return{nodeName:"#text",value:e,parentNode:null}};t.setDocumentType=function(e,t,n,o){for(var r=null,u=0;u<e.childNodes.length;u++)if("#documentType"===e.childNodes[u].nodeName){r=e.childNodes[u];break}r?(r.name=t,r.publicId=n,r.systemId=o):d(e,{nodeName:"#documentType",name:t,publicId:n,systemId:o})},t.setQuirksMode=function(e){e.quirksMode=!0},t.isQuirksMode=function(e){return e.quirksMode};var d=t.appendChild=function(e,t){e.childNodes.push(t),t.parentNode=e},r=t.insertBefore=function(e,t,n){var o=e.childNodes.indexOf(n);e.childNodes.splice(o,0,t),t.parentNode=e};t.detachNode=function(e){if(e.parentNode){var t=e.parentNode.childNodes.indexOf(e);e.parentNode.childNodes.splice(t,1),e.parentNode=null}},t.insertText=function(e,t){if(e.childNodes.length){var n=e.childNodes[e.childNodes.length-1];if("#text"===n.nodeName)return void(n.value+=t)}d(e,o(t))},t.insertTextBefore=function(e,t,n){var d=e.childNodes[e.childNodes.indexOf(n)-1];d&&"#text"===d.nodeName?d.value+=t:r(e,o(t),n)},t.adoptAttributes=function(e,t){for(var n=[],o=0;o<e.attrs.length;o++)n.push(e.attrs[o].name);for(var d=0;d<t.length;d++)n.indexOf(t[d].name)===-1&&e.attrs.push(t[d])},t.getFirstChild=function(e){return e.childNodes[0]},t.getChildNodes=function(e){return e.childNodes},t.getParentNode=function(e){return e.parentNode},t.getAttrList=function(e){return e.attrs},t.getTagName=function(e){return e.tagName},t.getNamespaceURI=function(e){return e.namespaceURI},t.getTextNodeContent=function(e){return e.value},t.getCommentNodeContent=function(e){return e.data},t.getDocumentTypeNodeName=function(e){return e.name},t.getDocumentTypeNodePublicId=function(e){return e.publicId},t.getDocumentTypeNodeSystemId=function(e){return e.systemId},t.isTextNode=function(e){return"#text"===e.nodeName},t.isCommentNode=function(e){return"#comment"===e.nodeName},t.isDocumentTypeNode=function(e){return"#documentType"===e.nodeName},t.isElementNode=function(e){return!!e.tagName}}});