montageDefine("8c68c9f","tools/node",{dependencies:["path","fs","source-map"],factory:function(e,r,n){function o(e,r){r||(r={vars:[],props:[]});var n=t.readFileSync(e,"utf8");return n=JSON.parse(n),n.vars&&n.vars.forEach(function(e){i.push_uniq(r.vars,e)}),n.props&&n.props.forEach(function(e){i.push_uniq(r.props,e)}),r}[process.stdout,process.stderr].forEach(function(e){e._handle&&e._handle.setBlocking&&e._handle.setBlocking(!0)});var a=e("path"),t=e("fs"),s=r.FILES=["../lib/utils.js","../lib/ast.js","../lib/parse.js","../lib/transform.js","../lib/scope.js","../lib/output.js","../lib/compress.js","../lib/sourcemap.js","../lib/mozilla-ast.js","../lib/propmangle.js","./exports.js"].map(function(e){return t.realpathSync(a.join(a.dirname(__filename),e))}),i=r;new Function("MOZ_SourceMap","exports","DEBUG",s.map(function(e){return t.readFileSync(e,"utf8")}).join("\n\n"))(e("source-map"),i,!!global.UGLIFY_DEBUG),i.AST_Node.warn_function=function(e){console.error("WARN: %s",e)},r.minify=function(e,r){r=i.defaults(r,{spidermonkey:!1,outSourceMap:null,sourceRoot:null,inSourceMap:null,fromString:!1,warnings:!1,mangle:{},mangleProperties:!1,nameCache:null,output:null,compress:{},parse:{}}),i.base54.reset();var n=null,o={};if(r.spidermonkey?n=i.AST_Node.from_mozilla_ast(e):("string"==typeof e&&(e=[e]),e.forEach(function(e,a){var s=r.fromString?e:t.readFileSync(e,"utf8");o[e]=s,n=i.parse(s,{filename:r.fromString?a:e,toplevel:n,bare_returns:r.parse?r.parse.bare_returns:void 0})})),r.wrap&&(n=n.wrap_commonjs(r.wrap,r.exportAll)),r.compress){var a={warnings:r.warnings};i.merge(a,r.compress),n.figure_out_scope();var s=i.Compressor(a);n=s.compress(n)}(r.mangleProperties||r.nameCache)&&(r.mangleProperties.cache=i.readNameCache(r.nameCache,"props"),n=i.mangle_properties(n,r.mangleProperties),i.writeNameCache(r.nameCache,"props",r.mangleProperties.cache)),r.mangle&&(n.figure_out_scope(r.mangle),n.compute_char_frequency(r.mangle),n.mangle_names(r.mangle));var c=r.inSourceMap,p={};if("string"==typeof r.inSourceMap&&(c=t.readFileSync(r.inSourceMap,"utf8")),r.outSourceMap&&(p.source_map=i.SourceMap({file:r.outSourceMap,orig:c,root:r.sourceRoot}),r.sourceMapIncludeSources))for(var u in o)o.hasOwnProperty(u)&&p.source_map.get().setSourceContent(u,o[u]);r.output&&i.merge(p,r.output);var l=i.OutputStream(p);n.print(l),r.outSourceMap&&"string"==typeof r.outSourceMap&&(l+="\n//# sourceMappingURL="+r.outSourceMap);var f=p.source_map;return f&&(f+=""),{code:l+"",map:f}},r.describe_ast=function(){function e(n){r.print("AST_"+n.TYPE);var o=n.SELF_PROPS.filter(function(e){return!/^\$/.test(e)});o.length>0&&(r.space(),r.with_parens(function(){o.forEach(function(e,n){n&&r.space(),r.print(e)})})),n.documentation&&(r.space(),r.print_string(n.documentation)),n.SUBCLASSES.length>0&&(r.space(),r.with_block(function(){n.SUBCLASSES.forEach(function(n,o){r.indent(),e(n),r.newline()})}))}var r=i.OutputStream({beautify:!0});return e(i.AST_Node),r+""},r.readReservedFile=o,r.readDefaultReservedFile=function(e){return o(a.join(__dirname,"domprops.json"),e)},r.readNameCache=function(e,r){var n=null;if(e)try{var n=t.readFileSync(e,"utf8");if(n=JSON.parse(n)[r],!n)throw"init";n.props=i.Dictionary.fromObject(n.props)}catch(o){n={cname:-1,props:new i.Dictionary}}return n},r.writeNameCache=function(e,r,n){if(e){var o;try{o=t.readFileSync(e,"utf8"),o=JSON.parse(o)}catch(a){o={}}o[r]={cname:n.cname,props:n.props.toObject()},t.writeFileSync(e,JSON.stringify(o,null,2),"utf8")}}}});