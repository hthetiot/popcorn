montageDefine("6d948bc","test/long",{dependencies:["tape","../"],factory:function(o,e,l){var t=o("tape"),p=o("../");t("long opts",function(o){o.deepEqual(p(["--bool"]),{bool:!0,_:[]},"long boolean"),o.deepEqual(p(["--pow","xixxle"]),{pow:"xixxle",_:[]},"long capture sp"),o.deepEqual(p(["--pow=xixxle"]),{pow:"xixxle",_:[]},"long capture eq"),o.deepEqual(p(["--host","localhost","--port","555"]),{host:"localhost",port:555,_:[]},"long captures sp"),o.deepEqual(p(["--host=localhost","--port=555"]),{host:"localhost",port:555,_:[]},"long captures eq"),o.end()})}});