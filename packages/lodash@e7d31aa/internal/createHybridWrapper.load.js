montageDefine("e7d31aa","internal/createHybridWrapper",{dependencies:["./arrayCopy","./composeArgs","./composeArgsRight","./createCtorWrapper","./isLaziable","./reorder","./replaceHolders","./setData"],factory:function(r,e,a){function t(r,e,a,C,D,H,W,x,z,L){function R(){for(var u=arguments.length,f=u,v=Array(u);f--;)v[f]=arguments[f];if(C&&(v=o(v,C,D)),H&&(v=n(v,H,W)),q||B){var A=R.placeholder,G=c(v,A);if(u-=G.length,u<L){var I=x?l(x):null,J=b(L-u,0),K=q?G:null,N=q?null:G,O=q?v:null,P=q?null:v;e|=q?y:m,e&=~(q?m:y),w||(e&=~(g|d));var Q=[r,e,a,O,K,P,N,I,z,J],S=t.apply(void 0,Q);return i(r)&&h(S,Q),S.placeholder=A,S}}var T=j?a:this;k&&(r=T[F]),x&&(v=s(v,x)),M&&z<v.length&&(v.length=z);var U=this&&this!==global&&this instanceof R?E||p(r):r;return U.apply(T,v)}var M=e&A,j=e&g,k=e&d,q=e&f,w=e&u,B=e&v,E=!k&&p(r),F=r;return R}var l=r("./arrayCopy"),o=r("./composeArgs"),n=r("./composeArgsRight"),p=r("./createCtorWrapper"),i=r("./isLaziable"),s=r("./reorder"),c=r("./replaceHolders"),h=r("./setData"),g=1,d=2,u=4,f=8,v=16,y=32,m=64,A=128,b=Math.max;a.exports=t}});