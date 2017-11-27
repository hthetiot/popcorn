var Target=require("./target").Target,Template=require("./template"),MontageWindow=require("../window-loader/montage-window").MontageWindow,Slot;require("./dom");var FIRST_LOAD_KEY_SUFFIX="-is-first-load",Application=exports.Application=Target.specialize({eventManager:{value:null},parentApplication:{value:null},name:{value:null},_isFirstLoad:{value:null},isFirstLoad:{get:function(){return this._isFirstLoad}},mainApplication:{get:function(){for(var t=this;t.parentApplication;)t=t.parentApplication;return t}},_windowsSortOrder:{value:"reverse-z-order"},windowsSortOrder:{get:function(){return null===this.parentApplication?this._windowsSortOrder:this.mainApplication.windowsSortOrder},set:function(t){null===this.parentApplication?["z-order","reverse-z-order","z-order","reverse-open-order"].indexOf(t)!==-1&&(this._windowsSortOrder=t):this.mainApplication.windowsSortOrder=t}},windows:{get:function(){if(null===this.parentApplication){if(!this._windows){var t=new MontageWindow;t.application=this,t.window=window,this.window=t,this._windows=[this.window],this._multipleWindow=!0}return this._windows}return this.mainApplication.windows}},_window:{value:null},window:{get:function(){if(!this._window&&this===this.mainApplication){var t=new MontageWindow;t.application=this,t.window=window,this._window=t}return this._window},set:function(t){this._window||(this._window=t)}},attachedWindows:{value:[]},eventManagerForWindow:{value:function(t){return t.defaultEventMananger}},focusWindow:{get:function(){var t=this.windows,n=this.windowsSortOrder;if("z-order"===n)return t[0];if("reverse-z-order"===n)return t[t.length-1];for(var e in t)if(t[e].focused)return t[e]}},delegate:{value:null},nextTarget:{get:function(){return this.delegate}},openWindow:{value:function(t,n,e){var i,o,a=this,r=new MontageWindow,l={location:!1,menubar:!1,resizable:!0,scrollbars:!0,status:!1,titlebar:!0,toolbar:!1},p={module:t,name:n,parent:window,callback:function(t,n){var e;i=t.document.application,r.window=t,r.application=i,r.component=n,i.window=r,a.attachedWindows.push(r),e=a.mainApplication.windowsSortOrder,"z-order"===e||"reverse-open-order"===e?a.windows.unshift(r):a.windows.push(r),o=document.createEvent("CustomEvent"),o.initCustomEvent("load",!0,!0,null),r.dispatchEvent(o)}};if(this===this.mainApplication&&!this._multipleWindow){this.window}var s,u,d="",c="";if("object"==typeof e)for(s in e)e.hasOwnProperty(s)&&(l[s]=e[s]);var w=["name"];for(s in l)w.indexOf(s)===-1&&(u=l[s],"boolean"==typeof u?u=u?"yes":"no":(u=String(u),u.match(/[ ,"]/)&&(u='"'+u.replace(/"/g,'\\"')+'"')),c+=d+s+"="+u,d=",");return global.require.loadPackage({name:"montage"}).then(function(t){var n=window.open(t.location+"window-loader/index.html","_blank",c);n.loadInfo=p}),r}},attachWindow:{value:function(t){var n,e=t.application.parentApplication;return e!==this&&(e&&e.detachWindow(t),t.parentApplication=this,this.attachedWindows.push(t),n=this.mainApplication.windowsSortOrder,"z-order"===n||"reverse-open-order"===n?this.windows.unshift(t):this.windows.push(t),t.focus()),t}},detachWindow:{value:function(t){var n,e,i=this.windows;return void 0===t&&(t=this.window),e=t.application.parentApplication,e===this?(n=this.attachedWindows.indexOf(t),n!==-1&&this.attachedWindows.splice(n,1),n=i.indexOf(t),n!==-1&&i.splice(n,1),t.application.parentApplication=null):e&&e.detachWindow(t),t}},constructor:{value:function(){"undefined"!=typeof window&&window.loadInfo&&!this.parentApplication&&(this.parentApplication=window.loadInfo.parent.document.application)}},_load:{value:function(t,n){var e,i=this;return this.name=t.packageDescription.name,this._loadApplicationContext(),exports.application=i,require.async("ui/component").then(function(n){if(e=n.__root__,"undefined"!=typeof document)return e.element=document,Template.instantiateDocument(document,t)}).then(function(t){return i.callDelegateMethod("willFinishLoading",i),e.needsDraw=!0,n&&n(i),i})}},_loadApplicationContext:{value:function(){if(null===this._isFirstLoad){var t,n=this.name+FIRST_LOAD_KEY_SUFFIX;if("undefined"!=typeof localStorage&&(localStorage.getItem(n),null===t))try{localStorage.setItem(n,!0)}catch(e){}this._isFirstLoad=!t}}},_alertPopup:{value:null,enumerable:!1},_confirmPopup:{value:null,enumerable:!1},_notifyPopup:{value:null,enumerable:!1},_zIndex:{value:null},_isSystemPopup:{value:function(t){return"alert"===t||"confirm"===t||"notify"===t}},_createPopupSlot:{value:function(t){var n=document.createElement("div");document.body.appendChild(n),n.style.zIndex=t,n.style.position="absolute";var e=new Slot;return e.element=n,e.attachToParentComponent(),e}},getPopupSlot:{value:function(t,n,e){var i=this;require.async("ui/slot.reel/slot").then(function(o){Slot=Slot||o.Slot,t=t||"custom";var a,r,l=i._isSystemPopup(t);if(i.popupSlots=i.popupSlots||{},l)switch(t){case"alert":a=19004;break;case"confirm":a=19003;break;case"notify":a=19002}else i._zIndex?i._zIndex=i._zIndex+1:i._zIndex=17e3,a=i._zIndex;r=i.popupSlots[t],r||(r=i.popupSlots[t]=i._createPopupSlot(a)),l||(r.element.style.zIndex=a),r.content=n,e.call(this,r)})}},returnPopupSlot:{value:function(t){var n=this;if(n.popupSlots&&n.popupSlots[t]){var e=n.popupSlots[t];e.content=null}}},_getActivePopupSlots:{value:function(){var t=[];if(this.popupSlots){var n=Object.keys(this.popupSlots);if(n&&n.length>0){var e,i,o=n.length;for(e=0;e<o;e++)i=this.popupSlots[n[e]],i&&null!==i.content&&t.push(i)}}return t}}});