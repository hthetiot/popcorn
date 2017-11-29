montageDefine("a6a7572","data/service/expression-data-mapping",{dependencies:["./data-mapping","frb/assign","frb/compile-evaluator","core/meta/object-descriptor-reference","frb/parse","data/service/mapping-rule","core/promise","frb/scope","collections/set"],factory:function(e,r,t){var a=e("./data-mapping").DataMapping,i=(e("frb/assign"),e("frb/compile-evaluator")),n=e("core/meta/object-descriptor-reference").ObjectDescriptorReference,s=e("frb/parse"),o=e("data/service/mapping-rule").MappingRule,p=e("core/promise").Promise,c=e("frb/scope"),u=e("collections/set"),l="<-",v="<->";r.ExpressionDataMapping=a.specialize({serializeSelf:{value:function(e){}},deserializeSelf:{value:function(e){var r=e.getProperty("objectDescriptor");r instanceof n?this.objectDescriptorReference=r:this.objectDescriptor=r,this.schemaReference=e.getProperty("schema"),r=e.getProperty("objectMapping"),r&&(this._objectMappingRules=r.rules),r=e.getProperty("rawDataMapping"),r&&(this._rawDataMappingRules=r.rules),r=e.getProperty("requisitePropertyNames"),r&&this.addRequisitePropertyName.apply(this,r),r=e.getProperty("rawDataPrimaryKeys"),r&&(this.rawDataPrimaryKeys=r)}},initWithServiceObjectDescriptorAndSchema:{value:function(e,r,t){return this.service=e,this.objectDescriptor=r,this.schemaDescriptor=t,this}},resolveReferences:{value:function(){var e=this;return this._resolveObjectDescriptorReferenceIfNecessary().then(function(){return e._resolveSchemaReferenceIfNecessary()})}},_resolveObjectDescriptorReferenceIfNecessary:{value:function(){var r=this,t=!this.objectDescriptor&&this.objectDescriptorReference,a=t?this.objectDescriptorReference.promise(e):p.resolve(null);return a.then(function(e){return e&&(r.objectDescriptor=e),null})}},_resolveSchemaReferenceIfNecessary:{value:function(){var r=this,t=!this.schemaDescriptor&&this.schemaDescriptorReference,a=t?this.schemaReference.promise(e):p.resolve(null);return a.then(function(e){return e&&(r.schemaDescriptor=e),null})}},objectDescriptor:{get:function(){return this._objectDescriptor},set:function(e){this._objectDescriptor=e,this._objectDescriptorReference=(new n).initWithValue(e)}},schemaDescriptor:{get:function(){return this._schemaDescriptor},set:function(e){this._schemaDescriptor=e,this._schemaDescriptorReference=(new n).initWithValue(e)}},objectDescriptorReference:{get:function(){return this._objectDescriptorReference?this._objectDescriptorReference.promise(e):p.resolve(null)},set:function(e){this._objectDescriptorReference=e}},schemaDescriptorReference:{get:function(){return this._schemaDescriptorReference?this._schemaDescriptorReference.promise(e):p.resolve(null)},set:function(e){this._schemaDescriptorReference=e}},service:{value:void 0},addRequisitePropertyName:{value:function(){var e,r,t;for(e=0,r=arguments.length;e<r;e+=1)t=arguments[e],this._requisitePropertyNames.has(t)||this._requisitePropertyNames.add(t)}},requisitePropertyNames:{get:function(){return this._requisitePropertyNames}},addObjectMappingRule:{value:function(e,r){var t={};t[e]=r,this._mapObjectMappingRules(t,!0),this._mapRawDataMappingRules(t)}},addRawDataMappingRule:{value:function(e,r){var t={};t[e]=r,this._mapRawDataMappingRules(t,!0),this._mapObjectMappingRules(t)}},mapRawDataToObject:{value:function(e,r){var t,a,i,n=this.requisitePropertyNames,s=n.values();if(n.size){for(t=[];a=s.next().value;)t.push(this.mapRawDataToObjectProperty(e,r,a));i=p.all(t)}else i=p.resolve(null);return i}},mapObjectToRawData:{value:function(e,r){var t,a,i=this._compiledRawDataMappingRules,n=[],s=Object.keys(i);for(a=0;t=s[a];++a)n.push(this.mapObjectToRawDataProperty(e,r,t));return n&&n.length&&p.all(n)||p.resolve(null)}},mapObjectToCriteriaSourceForProperty:{value:function(e,r,t){var a,i=this._compiledRawDataMappingRules,n=this._compiledObjectMappingRules[t],s=n?n.requirements:[],o=new u(s),c=[];for(a in i)i.hasOwnProperty(a)&&o.has(a)&&c.push(this._getAndMapObjectProperty(e,r,a,t));return c&&c.length&&p.all(c)||p.resolve(null)}},_propertiesRequestedForLayer:{get:function(){return this.__propertiesRequestedForLayer||(this.__propertiesRequestedForLayer=new Map),this.__propertiesRequestedForLayer}},_getAndMapObjectProperty:{value:function(e,r,t){var a,i=this,n=this._compiledRawDataMappingRules,s=n[t],o=s?s.requirements:[];return a=this.service.rootService.getObjectPropertyExpressions(e,o),a&&"function"==typeof a.then?a.then(function(){return i.mapObjectToRawDataProperty(e,r,t)}):this.mapObjectToRawDataProperty(e,r,t)}},mapObjectToRawDataProperty:{value:function(e,r,t){var a,i=this,n=this._compiledRawDataMappingRules,s=new c(e),o=n[t],u=o&&o.propertyDescriptor;return a=u?u.valueDescriptor.then(function(r){return i._prepareObjectToRawDataRule(o),r&&o.converter?i._convertRelationshipToRawData(e,u,o,s):i._parse(o,s)}):p.resolve(this._parse(o,s)),a&&a.then(function(e){r[t]=e})||p.resolve(null)}},_prepareObjectToRawDataRule:{value:function(e){var r=e.converter,t=e.propertyDescriptor;r&&(r.expression=r.expression||e.expression,r.foreignDescriptor=r.foreignDescriptor||t.valueDescriptor)}},serviceIdentifierForProperty:{value:function(e){var r=this._compiledObjectMappingRules[e];return r&&r.serviceIdentifier}},_compiledObjectMappingRules:{get:function(){return this.__compiledObjectMappingRules||(this.__compiledObjectMappingRules={},this._mapObjectMappingRules(this._rawDataMappingRules),this._mapObjectMappingRules(this._objectMappingRules,!0)),this.__compiledObjectMappingRules}},_compiledRawDataMappingRules:{get:function(){return this.__compiledRawDataMappingRules||(this.__compiledRawDataMappingRules={},this._mapRawDataMappingRules(this._objectMappingRules),this._mapRawDataMappingRules(this._rawDataMappingRules,!0)),this.__compiledRawDataMappingRules}},_rawDataMappingRules:{value:void 0},rawDataPrimaryKeys:{value:void 0},_requisitePropertyNames:{get:function(){return this.__requisitePropertyNames||(this.__requisitePropertyNames=new u),this.__requisitePropertyNames}},_mapObjectMappingRules:{value:function(e,r){var t,a,i,n,s=this._compiledObjectMappingRules,o=e?Object.keys(e):[];for(n=0;t=o[n];++n)a=e[t],this._shouldMapRule(a,r)&&(i=this._makeRuleFromRawRule(a,t,r),s[i.targetPath]=i)}},_mapRawDataMappingRules:{value:function(e,r){var t,a,i,n,s=this._compiledRawDataMappingRules,o=e?Object.keys(e):[];for(n=0;t=o[n];++n)a=e[t],this._shouldMapRule(a,r)&&(i=this._makeRuleFromRawRule(a,t,r),s[i.targetPath]=i)}},_makeRuleFromRawRule:{value:function(e,r,t){var a=t?e[l]||e[v]:r,i=this.objectDescriptor.propertyDescriptorForName(a),n=t?e[l]||e[v]:r,s=t&&r||e[v],p=this._compileRuleExpression(n),c=new o;return c.converter=e.converter||this._defaultConverter(n,s),c.expression=p.expression,c.inversePropertyName=e.inversePropertyName,c.isReverter=e.converter&&!t,c.propertyDescriptor=i,c.requirements=this._parseRequirementsFromParsedExpression(p.parsed),c.serviceIdentifier=e.serviceIdentifier,c.targetPath=s,c}},_convertRelationshipToRawData:{value:function(e,r,t,a){return t.converter.revert||console.log("Converter does not have a revert function for property ("+r.name+")"),t.converter.revert(t.expression(a))}},__scope:{value:null},_scope:{get:function(){return this.__scope||new c}},mapRawDataToObjectProperty:{value:function(e,r,t){var a,i=this._compiledObjectMappingRules,n=i.hasOwnProperty(t)&&i[t],s=n&&this.objectDescriptor.propertyDescriptorForName(t),o=this._scope,c=this;return o.value=e,a=!s||s.definition?p.resolve(null):s.valueDescriptor.then(function(e){var t=!!e;return c._prepareRawDataToObjectRule(n,s),t?c._resolveRelationship(r,s,n,o):c._resolvePrimitive(r,s,n,o)})}},_prepareRawDataToObjectRule:{value:function(e,r){var t=e.converter;t&&(t.expression=t.expression||e.expression,t.foreignDescriptor=t.foreignDescriptor||r.valueDescriptor,t.objectDescriptor=this.objectDescriptor,t.serviceIdentifier=e.serviceIdentifier)}},resolvePrerequisitesForProperty:{value:function(e,r){var t=this._compiledObjectMappingRules[r],a=t&&t.prerequisitePropertyNames||null;return t||console.log("No Rule For:",r),a?this.service.rootService.getObjectProperties(e,a):p.resolve(null)}},_resolvePrimitive:{value:function(e,r,t,a){var i=this._parse(t,a),n=this;return new p(function(t,a){n._isThenable(i)?i.then(function(a){n._assignDataToObjectProperty(e,r,a),t(null)}):(e[r.name]=i,t(null))})}},_isThenable:{value:function(e){return e&&e.then&&"function"==typeof e.then}},_assignDataToObjectProperty:{value:function(e,r,t){var a=t&&t.length,i=1!==r.cardinality,n=r.name;if(Array.isArray(t)){if(i&&Array.isArray(e[n]))e[n].splice.apply(e[n],[0,1/0].concat(t));else if(i)e[n]=t;else if(a){if(t.length&&t.length>1)throw new Error('ExpressionDataMapping for property "'+this.objectDescriptor.name+"."+n+"\" expects a cardinality of 1 but data to map doesn't match: "+t);e[n]=t[0]}}else e[n]=t}},_assignObjectToDataInverseProperty:{value:function(e,r,t,a){return r.valueDescriptor.then(function(r){var i=r.propertyDescriptorForName(a);return 1===i.cardinality&&t.forEach(function(r){r[a]=e}),null})}},_resolveRelationship:{value:function(e,r,t,a){var i=this;return t.converter.convert(t.expression(a)).then(function(a){return i._assignDataToObjectProperty(e,r,a),t.inversePropertyName&&a&&a.length?i._assignObjectToDataInverseProperty(e,r,a,t.inversePropertyName):null})}},_compileRuleExpression:{value:function(e){var r=s(e),t=i(r);return{parsed:r,expression:t}}},_parseRequirementsFromParsedExpression:{value:function(e,r){var t=e.args,a=e.type;if(r=r||[],"property"===a&&"value"===t[0].type)r.push(t[1].value);else if("property"===a&&"property"===t[0].type){var i=[t[1].value];this._parseRequirementsFromParsedExpression(t[0],i),r.push(i.reverse().join("."))}else"record"===a&&this._parseRequirementsFromParsedRecord(e,r);return r}},_parseRequirementsFromParsedRecord:{value:function(e,r){var t=this,a=e.args,i=Object.keys(a);i.forEach(function(e){t._parseRequirementsFromParsedExpression(a[e],r)})}},_parse:{value:function(e,r){var t=e.expression(r);return e.converter?e.isReverter?e.converter.revert(t):e.converter.convert(t):t}},_parseObject:{value:function(e,r){var t=e.expression(r);return e.converter&&e.converter.revert(t)||t}},_shouldMapRule:{value:function(e,r){var t=e.hasOwnProperty(l),a=!t&&e.hasOwnProperty(v);return t&&r||a}},_defaultConverter:{value:function(e,r,t){var a=t?this.schemaDescriptor:this.objectDescriptor,i=t?this.objectDescriptor:this.schemaDescriptor,n=a&&a.propertyDescriptorForName(e),s=i&&i.propertyDescriptorForName(r),o=n&&n.valueType,p=s&&s.valueType,c=n&&s&&o!==p;return c?this._converterForValueTypes(p,o):null}},_converterForValueTypes:{value:function(e,t){var a=r.ExpressionDataMapping.defaultConverters;return a[e]&&a[e][t]||null}},mapFromRawData:{value:function(e,r,t){return this.mapRawDataToObject(r,e,t)}},mapToRawData:{value:function(e,r){this.mapObjectToRawData(e,r)}}},{defaultConverters:{get:function(){if(!r.ExpressionDataMapping._defaultConverters){var e={};r.ExpressionDataMapping._addDefaultConvertersToMap(e),r.ExpressionDataMapping._defaultConverters=e}return r.ExpressionDataMapping._defaultConverters}},_addDefaultConvertersToMap:{value:function(e){r.ExpressionDataMapping._addDefaultBooleanConvertersToConverters(e),r.ExpressionDataMapping._addDefaultNumberConvertersToConverters(e),r.ExpressionDataMapping._addDefaultStringConvertersToConverters(e)}},_addDefaultBooleanConvertersToConverters:{value:function(e){var r={};r.string=Object.create({},{convert:{value:function(e){return Boolean(e)}},revert:{value:function(e){return String(e)}}}),r.number=Object.create({},{convert:{value:function(e){return Boolean(e)}},revert:{value:function(e){return Number(e)}}}),e["boolean"]=r}},_addDefaultNumberConvertersToConverters:{value:function(e){var r={};r.string=Object.create({},{convert:{value:function(e){return Number(e)}},revert:{value:function(e){return String(e)}}}),r["boolean"]=Object.create({},{convert:{value:function(e){return Number(e)}},revert:{value:function(e){return Boolean(e)}}}),e.number=r}},_addDefaultStringConvertersToConverters:{value:function(e){var r={};r.number=Object.create({},{convert:{value:function(e){return String(e)}},revert:{value:function(e){return Number(e)}}}),r["boolean"]=Object.create({},{convert:{value:function(e){return String(e)}},revert:{value:function(e){return Boolean(e)}}}),e.string=r}}})}});