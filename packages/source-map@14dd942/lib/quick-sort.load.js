montageDefine("14dd942","lib/quick-sort",{dependencies:[],factory:function(n,t,o){function r(n,t,o){var r=n[t];n[t]=n[o],n[o]=r}function i(n,t){return Math.round(n+Math.random()*(t-n))}function a(n,t,o,c){if(o<c){var e=i(o,c),f=o-1;r(n,e,c);for(var u=n[c],d=o;d<c;d++)t(n[d],u)<=0&&(f+=1,r(n,f,d));r(n,f+1,d);var v=f+1;a(n,t,o,v-1),a(n,t,v+1,c)}}t.quickSort=function(n,t){a(n,t,0,n.length-1)}}});