montageDefine("d205cbb","lib/optimizer/level-2/properties/optimize",{dependencies:["./merge-into-shorthands","./override-properties","./populate-components","../restore-with-components","../../wrap-for-optimizing","../../remove-unused","../../restore-from-optimizing","../../../options/optimization-level"],factory:function(o,e,i){function t(o,e,i,d){var c,g,f,h=d.options.level[v.Two],u=a(o,!1,h.skipProperties);for(p(u,d.validator,d.warnings),g=0,f=u.length;g<f;g++)c=u[g],c.block&&t(c.value[0][1],e,i,d);i&&h.mergeIntoShorthands&&r(u,d.validator),e&&h.overrideProperties&&n(u,i,d.options.compatibility,d.validator),l(u,s),m(u)}var r=o("./merge-into-shorthands"),n=o("./override-properties"),p=o("./populate-components"),s=o("../restore-with-components"),a=o("../../wrap-for-optimizing").all,m=o("../../remove-unused"),l=o("../../restore-from-optimizing"),v=o("../../../options/optimization-level").OptimizationLevel;i.exports=t}});