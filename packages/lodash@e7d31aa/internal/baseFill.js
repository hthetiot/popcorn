function baseFill(l,e,n,o){var r=l.length;for(n=null==n?0:+n||0,n<0&&(n=-n>r?0:r+n),o=void 0===o||o>r?r:+o||0,o<0&&(o+=r),r=n>o?0:o>>>0,n>>>=0;n<r;)l[n++]=e;return l}module.exports=baseFill;