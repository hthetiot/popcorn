montageDefine("a6a7572","ui/montage-studio-loader.reel/montage-studio-loader",{dependencies:["../loader.reel"],factory:function(t,e,i){var a=t("../loader.reel").Loader,n="off",s="ani",l="tri",o=0,r=1,u=2;e.MontageStudioLoader=a.specialize({hasTemplate:{value:!0},_state:{value:null},_shouldRotate:{value:!1},animationInterval:{value:3500},minimumFirstLoadingDuration:{value:6e3},state:{set:function(t){this._state!==t&&(this._state=t)},get:function(){return null===this._state&&(this._state=o),this._state}},enterDocument:{value:function(t){a.prototype.enterDocument.call(this,t),t&&this.startAnimation()}},exitDocument:{value:function(){this.state===r&&this.stopAnimation()}},startAnimation:{value:function(){if(this.state!==u){var t=this;this._animationIntervalTimeoutID=setTimeout(function(){t.state!==u&&(t.state=r,t.needsDraw=!0)},this.animationInterval)}}},stopAnimation:{value:function(){this.state===r&&(this._animationIntervalTimeoutID&&(clearTimeout(this._animationIntervalTimeoutID),this._animationIntervalTimeoutID=null),this.state=u,this.needsDraw=!0)}},draw:{value:function(){if(a.prototype.draw.call(this),this.state===r){this._logoTrianglesElement.classList.remove(n),this._logoWtrianglesElement.classList.remove(n),this._logoSVGContainerElement.classList.add(s),this._logoWtrianglesElement.classList.add(s),this._logoLinesElement.classList.add(n);for(var t=document.getElementsByClassName(l),e="t",i=0;i<t.length;i++)t[i].classList.add(e+(i+1))}else this.state===u&&(this._logoTrianglesElement=null,this._logoWtrianglesElement=null,this._logoSVGContainerElement=null,this._logoWtrianglesElement=null,this._logoLinesElement=null,this.element.classList.add(n))}}})}});