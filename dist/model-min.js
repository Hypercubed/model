!function(){function n(){s=[],d=[],l=0,h={}}function t(){return{nodes:s,links:d}}function r(n,t,r,o){var i=e(t);r.forEach(function(t){f(u(n,t),i)}),o.forEach(function(t){f(i,u(n,t))})}function e(n){return a(n,s,o)}function o(n){return{type:"lambda",index:n}}function u(n,t){var r=n+"."+t;return a(r,s,i(t))}function i(n){return function(t){return{type:"property",index:t,property:n}}}function f(n,t){var r=n.index,e=t.index,o=r+"-"+e;a(o,d,c(r,e))}function c(n,t){return function(){return{source:n,destination:t}}}function a(n,t,r){var e=h[n];return e||(e=h[n]=r(t.length),t.push(e)),e}function p(n){function t(n,t,i){var f=l++;i=i||this,n=n instanceof Array?n:[n];var c=e(function(){var e=n.map(function(n){return d[n]});o(e)&&(m={},t.apply(i,e),r(y,f,n,Object.keys(m)))});return c(),n.forEach(function(n){u(n,c)}),c}function e(n){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,n()},0))}}function o(n){return!n.some(function(n){return"undefined"==typeof n||null===n})}function u(n,t,r){r=r||this,i(n).push(t),f(n,r)}function i(n){return h[n]||(h[n]=[])}function f(n,t){n in v||(v[n]=!0,d[n]=s[n],Object.defineProperty(s,n,{get:function(){return d[n]},set:function(r){var e=d[n];d[n]=r,i(n).forEach(function(n){n.call(t,r,e)}),m[n]=!0}}))}function c(n){for(var t in h)a(t,n)}function a(n,t){h[n]=h[n].filter(function(n){return n!==t})}function p(n){for(var t in n)s[t]=n[t]}var s={},d={},h={},v={},y=l++,m={};return p(n),s.when=t,s.cancel=c,s.on=u,s.off=a,s.set=p,s}var s,d,l,h;n(),p.getFlowGraph=t,p.resetFlowGraph=n,"function"==typeof define&&define.amd?define([],function(){return p}):"object"==typeof exports?module.exports=p:this.Model=p}();