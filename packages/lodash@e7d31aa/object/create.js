function create(e,a,r){var t=baseCreate(e);return r&&isIterateeCall(e,a,r)&&(a=null),a?baseAssign(t,a):t}var baseAssign=require("../internal/baseAssign"),baseCreate=require("../internal/baseCreate"),isIterateeCall=require("../internal/isIterateeCall");module.exports=create;