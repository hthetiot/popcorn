function understandable(e,r,a,s,n){return!!sameVendorPrefixes(r,a)&&(!n||e.isVariable(r)===e.isVariable(a))}var sameVendorPrefixes=require("./vendor-prefixes").same;module.exports=understandable;