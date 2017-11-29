var ComponentModule=require("../component"),Component=ComponentModule.Component,RootComponent=ComponentModule.__root__,logger=require("../../core/logger").logger("loader"),defaultEventManager=require("../../core/event/event-manager").defaultEventManager,MONTAGE_LOADER_ELEMENT_ID="montage-app-loader",BOOTSTRAPPING_CLASS_NAME="montage-app-bootstrapping",LOADING_CLASS_NAME="montage-app-loading",FIRST_LOADING_CLASS_NAME="montage-app-first-load",LOADED_CLASS_NAME="montage-app-loaded",BOOTSTRAPPING=0,LOADING=1,LOADED=2;exports.Loader=Component.specialize({mainModule:{value:"ui/main.reel"},mainName:{value:"Main"},includeFrameworkModules:{value:!1},minimumBootstrappingDuration:{value:0},minimumLoadingDuration:{value:0},minimumFirstLoadingDuration:{value:null},minimumFirstBootstrappingDuration:{value:null},_initializedModules:{value:null},element:{get:function(){if(!this._element){var e=document.getElementsByClassName("loading")[0];e||(e=document.createElement("div"),document.body.appendChild(e)),this.element=e}return this._element},set:function(e){Object.getOwnPropertyDescriptor(Component.prototype,"element").set.call(this,e)}},initializedModules:{dependencies:["includeFrameworkModules"],enumerable:!1,get:function(){return!this._initializedModules||this.includeFrameworkModules?this._initializedModules:this._initializedModules.slice(this._frameworkModuleCount-1)},set:function(e){this._initializedModules=e}},_requiredModules:{value:null},requiredModules:{dependencies:["includeFrameworkModules"],enumerable:!1,get:function(){return!this._requiredModules||this.includeFrameworkModules?this._requiredModules:this._requiredModules.slice(this._frameworkModuleCount-1)},set:function(e){this._requiredModules=e}},_currentStage:{value:BOOTSTRAPPING},currentStage:{get:function(){return this._currentStage},set:function(e){e!==this._currentStage&&(logger.isDebug&&logger.debug(this,"CURRENT STAGE: "+e),this._currentStage=e,LOADING===e?(RootComponent.classList.remove(BOOTSTRAPPING_CLASS_NAME),RootComponent.classList.add(LOADING_CLASS_NAME)):LOADED===e&&(RootComponent.classList.remove(BOOTSTRAPPING_CLASS_NAME),RootComponent.classList.remove(LOADING_CLASS_NAME),RootComponent.classList.add(LOADED_CLASS_NAME),this.needsDraw=!0))}},_readyToShowLoader:{value:!1},isLoadingMainComponent:{value:null},readyToShowLoader:{get:function(){return this._readyToShowLoader},set:function(e){e===this._readyToShowLoader&&(this._readyToShowLoader=e,this.needsDraw=!0)}},readyToShowMainComponent:{get:function(){return!!this._mainComponent}},_frameworkModuleCount:{enumerable:!1,value:null},hasTemplate:{enumerable:!1,value:!1},_mainComponent:{value:null},_mainComponentEnterDocument:{value:null},_showLoadingTimeout:{enumerable:!1,value:null},_showMainComponentTimeout:{enumerable:!1,value:null},enterDocument:{value:function(){logger.isDebug&&logger.debug(this,"enterDocument"),this._loadLoaderContext(),this._loadMainComponent(),this.readyToShowLoader=!0;var e=document._montageTiming,n=Date.now(),t=this.minimumBootstrappingDuration-(n-e.bootstrappingStartTime);if(t>0){logger.isDebug&&logger.debug(this,"still need to show bootstrapper for another "+t+"ms");var o=this;this._showLoadingTimeout=setTimeout(function(){e.bootstrappingEndTime=Date.now(),o._showLoadingTimeout=null,o._revealLoader()},t)}else e.bootstrappingEndTime=n,this._revealLoader()}},_loadLoaderContext:{value:function(){this.application.isFirstLoad&&(RootComponent.classList.add(FIRST_LOADING_CLASS_NAME),null!==this.minimumFirstLoadingDuration&&(this.minimumLoadingDuration=this.minimumFirstLoadingDuration),null!==this.minimumFirstBootstrappingDuration&&(this.minimumBootstrappingDuration=this.minimumFirstBootstrappingDuration))}},_revealLoader:{value:function(){logger.isDebug&&logger.debug(this,"_revealLoader"),document._montageTiming.loadingStartTime=Date.now(),this.currentStage=LOADING,this._waitForLoadingIndicatorIfNeeded();var e,n,t,o,i=document.getElementById(MONTAGE_LOADER_ELEMENT_ID);if(i)for(n=i.children,e=0;t=n[e];e++)(o=t.component)&&(o.attachToParentComponent(),o.needsDraw=!0)}},_revealMainComponent:{value:function(){logger.isDebug&&logger.debug(this,"_revealMainComponent"),this.currentStage=LOADED}},_loadMainComponent:{value:function(){logger.isDebug&&logger.debug(this,"_loadMainComponent"),this.isLoadingMainComponent=!0;var e=this;return global.require.async(this.mainModule).then(function(n){if(!(e.mainName in n))throw new Error(e.mainName+" was not found in "+e.mainModule);return e._mainLoadedCallback(n)})}},_mainLoadedCallback:{value:function(e){return logger.isDebug&&logger.debug(this,"_mainLoadedCallback"),this._mainComponent=new e[this.mainName],this._mainComponentEnterDocument=this._mainComponent.enterDocument,this._mainComponent.enterDocument=this.mainComponentEnterDocument.bind(this),this._mainComponent.setElementWithParentComponent(document.createElement("div"),this),this._mainComponent.attachToParentComponent(),this._mainComponent._canDrawOutsideDocument=!0,this._mainComponent.needsDraw=!0,this}},mainComponentEnterDocument:{value:function(){var e=this._mainComponent;if(logger.isDebug&&logger.debug(this,"main preparing to draw"),this.isLoadingMainComponent=!1,this.childComponents=[this._mainComponent],this.element.parentElement.appendChild(this._mainComponent.element),this._waitForLoadingIndicatorIfNeeded(),defaultEventManager.unregisterEventHandlerForElement(this.element),e.attachToParentComponent(),e.enterDocument=this._mainComponentEnterDocument,e.enterDocument)return e.enterDocument.apply(e,arguments)}},_waitForLoadingIndicatorIfNeeded:{value:function(){if(!this._showMainComponentTimeout&&!this.isLoadingMainComponent&&!this._showLoadingTimeout){var e=document._montageTiming,n=Date.now(),t=this,o=this.minimumLoadingDuration-(n-e.loadingStartTime);o>0?(logger.isDebug&&logger.debug(this,"show loader for another "+o+"ms"),this._showMainComponentTimeout=setTimeout(function(){logger.isDebug&&logger.debug(this,"ok, shown loader long enough"),e.loadingEndTime=Date.now(),t._revealMainComponent()},o)):(e.loadingEndTime=n,this._revealMainComponent())}}},draw:{value:function(){LOADED===this._currentStage&&(this._dispatchLoadEvent(),this.detachFromParentComponent(),this.element.parentElement.removeChild(this.element))}},_dispatchLoadEvent:{value:function(){var e=document.createEvent("CustomEvent");e.initCustomEvent("componentLoaded",!0,!0,this._mainComponent),this.dispatchEvent(e,!0,!0)}}});