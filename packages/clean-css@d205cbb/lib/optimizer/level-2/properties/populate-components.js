function populateComponents(o,e,n){for(var t,r,a,p=o.length-1;p>=0;p--){var c=o[p],m=compactable[c.name];if(m&&m.shorthand){c.shorthand=!0,c.dirty=!0;try{if(c.components=m.breakUp(c,compactable,e),m.shorthandComponents)for(r=0,a=c.components.length;r<a;r++)t=c.components[r],t.components=compactable[t.name].breakUp(t,compactable,e)}catch(l){if(!(l instanceof InvalidPropertyError))throw l;c.components=[],n.push(l.message)}c.components.length>0?c.multiplex=c.components[0].multiplex:c.unused=!0}}}var compactable=require("../compactable"),InvalidPropertyError=require("../invalid-property-error");module.exports=populateComponents;