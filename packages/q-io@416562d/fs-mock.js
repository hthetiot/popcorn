function MockFs(t,r){return this instanceof MockFs?(this._root=new DirectoryNode(this,"/"),Common.update(this,function(){return r}),r=r||this.ROOT,void(t&&this._init(t))):new MockFs(t,r)}function mock(t,r){return Q.when(t.listTree(r),function(e){var o={};return Q.all(e.map(function(e){var i=t.join(r,e),n=t.relativeFromDirectory(r,i);return Q.when(t.stat(i),function(r){if(r.isFile())return Q.when(t.read(e,"rb"),function(t){o[n]=t})})})).then(function(){return MockFs(o)})})}function Node(t){if(!t)throw new Error("FS required argument");this._fs=t,this.atime=this.mtime=Date.now(),this.mode=parseInt("0644",8),this._owner=null}function FileNode(t){Node.call(this,t),this._chunks=[]}function DirectoryNode(t){Node.call(this,t),this._entries=Object.create(null),this.mode=parseInt("0755",8)}function LinkNode(t,r){Node.call(this,t),this._link=r}var Q=require("q"),Boot=require("./fs-boot"),Common=require("./fs-common"),BufferStream=require("./buffer-stream"),Reader=require("./reader"),Set=require("collections/set");module.exports=MockFs,MockFs.prototype=Object.create(Boot),MockFs.prototype._init=function(t,r){r=r||this.ROOT,Object.keys(t).forEach(function(e){var o=t[e];e=this.join(r,e);var i=this.directory(e),n=this.base(e),s=this._root._walk(i,!0),a=new FileNode(this);if(!(o instanceof Buffer)){if("object"==typeof o)return this._root._walk(e,!0),void this._init(o,e);o=new Buffer(String(o),"utf-8")}s._entries[n]=a,a._chunks=[o]},this)},MockFs.prototype.list=function(t){var r=this;return Q.fcall(function(){t=r.absolute(t);var e=r._root._walk(t)._follow(t);return e.isDirectory()||new Error("Can't list non-directory: "+JSON.stringify(t)),Object.keys(e._entries).sort()})},MockFs.prototype.open=function(t,r,e,o){var i=this;return Q.fcall(function(){t=i.absolute(t);var n=i.directory(t),s=i.base(t),a=i._root._walk(n);if(!a.isDirectory())throw new Error("Can't find "+t+" because "+n+" is not a directory");"object"==typeof r?(o=r,r=o.flags,e=o.charset):o=o||{},r=r||"r";var c=r.indexOf("b")>=0,f=r.indexOf("w")>=0,l=r.indexOf("a")>=0;if(c||(e=e||"utf-8"),f||l){a._entries[s]||(a._entries[s]=new FileNode(this),"mode"in o&&(a._entries[s].mode=o.mode));var u=a._entries[s]._follow(t);if(!u.isFile())throw new Error("Can't write non-file "+t);return u.mtime=Date.now(),u.atime=Date.now(),l||(u._chunks.length=0),new BufferStream(u._chunks,e)}if(!a._entries[s])throw new Error("Can't read non-existant "+t);var u=a._entries[s]._follow(t);if(!u.isFile())throw new Error("Can't read non-file "+t);if(u.atime=Date.now(),"begin"in o&&"end"in o)return new BufferStream([Reader.join(u._chunks).slice(o.begin,o.end)],e);var _=u._chunks.slice();return new BufferStream(_,e)})},MockFs.prototype.remove=function(t){var r=this;return Q.fcall(function(){t=r.absolute(t);var e=r.directory(t),o=r.base(t),i=r._root._walk(e);if(!i.isDirectory())throw new Error("Can't remove file from non-directory: "+t);if(!i._entries[o])throw new Error("Can't remove non-existant file: "+t);if(i._entries[o].isDirectory())throw new Error("Can't remove directory. Use removeDirectory: "+t);delete i._entries[o]})},MockFs.prototype.makeDirectory=function(t,r){var e=this;return Q.fcall(function(){t=e.absolute(t);var o=e.directory(t),i=e.base(t),n=e._root._walk(o);if(!n.isDirectory()){var s=new Error("Can't make directory in non-directory: "+t);throw s.code="EEXISTS",s.exists=!0,s}if(n._entries[i]){var s=new Error("Can't make directory. Entry exists: "+t);throw s.code="EISDIR",s.exists=!0,s.isDirectory=!0,s}n._entries[i]=new DirectoryNode(e),r&&(n._entries[i].mode=r)})},MockFs.prototype.removeDirectory=function(t){var r=this;return Q.fcall(function(){t=r.absolute(t);var e=r.directory(t),o=r.base(t),i=r._root._walk(e);if(!i.isDirectory())throw new Error("Can't remove directory from non-directory: "+t);if(!i._entries[o])throw new Error("Can't remove non-existant directory: "+t);if(!i._entries[o].isDirectory())throw new Error("Can't remove non-directory: "+t);delete i._entries[o]})},MockFs.prototype.stat=function(t){var r=this;return Q.fcall(function(){return t=r.absolute(t),new r.Stats(r._root._walk(t)._follow(t))})},MockFs.prototype.statLink=function(t){var r=this;return Q.fcall(function(){return t=r.absolute(t),new r.Stats(r._root._walk(t))})},MockFs.prototype.link=function(t,r){var e=this;return Q.fcall(function(){t=e.absolute(t),r=e.absolute(r);var o=e._root._walk(t)._follow(t);if(!o.isFile())throw new Error("Can't link non-file: "+t);var i=e.directory(r),n=e.base(r),s=e._root._walk(i)._follow(i);if(!s.isDirectory())throw new Error("Can't create link in non-directory: "+r);if(s._entries[n]&&s._entries[n].isDirectory())throw new Error("Can't overwrite existing directory with hard link: "+r);s._entries[n]=o})},MockFs.prototype.symbolicLink=function(t,r,e){var o=this;return Q.fcall(function(){t=o.absolute(t);var e=o.directory(t),i=o.base(t),n=o._root._walk(e);if(n._entries[i]&&n._entries[i].isDirectory())throw new Error("Can't overwrite existing directory with symbolic link: "+t);n._entries[i]=new LinkNode(o,r)})},MockFs.prototype.chown=function(t,r){var e=this;return Q.fcall(function(){t=e.absolute(t),e._root._walk(t)._follow(t)._owner=r})},MockFs.prototype.chmod=function(t,r){var e=this;return Q.fcall(function(){t=e.absolute(t),e._root._walk(t)._follow(t).mode=r})},MockFs.prototype.rename=function(t,r){var e=this;return Q.fcall(function(){t=e.absolute(t),r=e.absolute(r);var o=e.directory(t),i=e._root._walk(o)._follow(o),n=e.base(t),s=i._entries[n];if(!s){var a=new Error("Can't copy non-existent file: "+t);throw a.code="ENOENT",a}if(s=s._follow(t),!s){var a=new Error("Can't copy non-existent file: "+t);throw a.code="ENOENT",a}var c=e.directory(r),f=e._root._walk(c)._follow(c),l=e.base(r),u=f._entries[l];if(u&&(u=u._follow(r)),u&&u.isDirectory()){var a=new Error("Can't copy over existing directory: "+r);throw a.code="EISDIR",a}u!==s&&(f._entries[l]=s,delete i._entries[n])})},MockFs.prototype.readLink=function(t){var r=this;return Q.fcall(function(){t=r.absolute(t);var e=r._root._walk(t);if(!r.isSymbolicLink())throw new Error("Can't read non-symbolic link: "+t);return e._link})},MockFs.prototype.canonical=function(t){var r=this;return Q.fcall(function(){return t=r.absolute(t),r._root._canonical(t)})},MockFs.mock=mock,Node.prototype._walk=function(t,r,e){var o=this._fs.split(t);return this._fs.isAbsolute(t)?(o.shift(),this._fs._root._walkParts(o,r,this._fs.ROOT)):this._walkParts(o,r,e||this._fs.ROOT)},Node.prototype._walkParts=function(t,r,e){if(0===t.length)return this;var o=t.shift();if(""===o)return this._walkParts(t,r,this._fs.join(e,o));var i=new Error("Can't find "+JSON.stringify(this._fs.resolve(o,this._fs.join(t)))+" via "+JSON.stringify(e));throw i.code="ENOENT",i},Node.prototype._canonical=function(t){if(!this._fs.isAbsolute(t))throw new Error("Path must be absolute for _canonical: "+t);var r=this._fs.split(t);r.shift();var e=this._fs.ROOT;return e+this._fs._root._canonicalParts(r,e)},Node.prototype._canonicalParts=function(t,r){return 0===t.length?r:this._fs.join(r,this._fs.join(t))},Node.prototype._follow=function(){return this},Node.prototype._touch=function(){this.mtime=Date.now()};var stats=["isDirectory","isFile","isBlockDevice","isCharacterDevice","isSymbolicLink","isFIFO","isSocket"];stats.forEach(function(t){Node.prototype[t]=function(){return!1}}),Node.prototype.lastAccessed=function(){return this.atime},Node.prototype.lastModified=function(){return this.mtime},FileNode.prototype=Object.create(Node.prototype),FileNode.prototype.isFile=function(){return!0},Object.defineProperty(FileNode.prototype,"size",{configurable:!0,enumerable:!0,get:function(){return this._chunks.reduce(function(t,r){return t+=r.length},0)}}),DirectoryNode.prototype=Object.create(Node.prototype),DirectoryNode.prototype.isDirectory=function(){return!0},DirectoryNode.prototype._walkParts=function(t,r,e){if(e=e||this._fs.ROOT,0===t.length)return this;var o=t.shift();if(""===o)return this._walkParts(t,r,this._fs.join(e,o));if(!this._entries[o]){if(!r){var i=new Error("Can't find "+JSON.stringify(this._fs.join(t))+" via "+JSON.stringify(e));throw i.code="ENOENT",i}this._entries[o]=new DirectoryNode(this._fs)}return this._entries[o]._walkParts(t,r,this._fs.join(e,o))},DirectoryNode.prototype._canonicalParts=function(t,r){if(0===t.length)return r;var e=t.shift();return""===e?r:(r===this._fs.ROOT&&(r=""),this._entries[e]?this._entries[e]._canonicalParts(t,this._fs.join(r,e)):this._fs.join(r,e,this._fs.join(t)))},LinkNode.prototype=Object.create(Node.prototype),LinkNode.prototype.isSymbolicLink=function(){return!0},LinkNode.prototype._follow=function(t,r){if(r=r||Set(),r.has(this)){var e=new Error("Can't follow symbolic link cycle at "+JSON.stringify(t));throw e.code="ELOOP",e}r.add(this);var o=this._fs.join(t,"..",this._link);return this._walk(o,null,"<link>")._follow(o,r)},LinkNode.prototype._canonicalParts=function(t,r){return this._fs.relativeFromDirectory(this._fs.ROOT,this._fs._root._canonical(this._fs.absolute(this._fs.join(r,"..",this._link))))};var FS=require("./fs");