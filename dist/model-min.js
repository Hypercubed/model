!function(){function t(t){var e=!1;return function(){e||(e=!0,setTimeout(function(){e=!1,t()},0))}}function e(t){return!t.some(function(t){return"undefined"==typeof t||null===t})}function o(t){return this instanceof o?(r.call(this),this.observe(),void this.set(t)):new o(t)}function n(t){t.forEach(function(t){var e=t.name,o=t.object[e]||void 0,n=t.oldValue?t.oldValue[t.name]:void 0;t.object.emit(e,o,n)})}var r=require("events").EventEmitter;o.prototype.on=r.prototype.on,o.prototype.off=r.prototype.removeListener,o.prototype.emit=r.prototype.emit,o.prototype.observe=function(){Object.observe(this,n)},o.prototype.unobserve=function(){Object.unobserve(this,n)},o.prototype.set=function(t){for(var e in t)this[e]=t[e]},o.prototype.cancel=function(t){for(var e in this._events)this.off(e,t)},o.prototype.when=function(o,n,r){r=r||this;var i=this;o=o instanceof Array?o:[o];var f=t(function(){var t=o.map(function(t){return i[t]});e(t)&&n.apply(r,t)});return o.forEach(function(t){i.on(t,f)}),f},o.None="__NONE__","function"==typeof define&&define.amd?define([],function(){return o}):"object"==typeof exports?module.exports=o:this.Model=o}();