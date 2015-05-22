// ModelJS v0.2.1
//
// https://github.com/curran/model
//
// Last updated by Curran Kelleher March 2015
//
// Includes contributions from
//
//  * github.com/mathiasrw
//  * github.com/bollwyvl
//  * github.com/adle29
//  * github.com/Hypercubed
//
// The module is defined inside an immediately invoked function
// so it does not pullute the global namespace.
(function(){

  var EventEmitter = require('events').EventEmitter;

  // Returns a debounced version of the given function.
  // See http://underscorejs.org/#debounce
  function debounce(callback){
    var queued = false;
    return function () {
      if(!queued){
        queued = true;
        setTimeout(function () {
          queued = false;
          callback();
        }, 0);
      }
    };
  }

  // Returns true if all elements of the given array are defined, false otherwise.
  function allAreDefined(arr){
    return !arr.some(function (d) {
      return typeof d === 'undefined' || d === null;
    });
  }

  // The constructor function, accepting default values.
  function Model(defaults){

    if (!(this instanceof Model)) {
      return new Model(defaults);
    }

    EventEmitter.call(this);

    this.observe();

    // Transfer defaults passed into the constructor to the model.
    this.set(defaults);

  }

  Model.prototype.on = EventEmitter.prototype.on;
  Model.prototype.off = EventEmitter.prototype.removeListener;
  Model.prototype.emit = EventEmitter.prototype.emit;

  function $$observer(changes) {
    changes.forEach(function(change) {

      var name = change.name;
      var newValue = change.object[name] || undefined;
      var oldValue = change.oldValue ? change.oldValue[change.name] : undefined;

      change.object.emit(name, newValue, oldValue);

    });
  }

  Model.prototype.observe = function observe(){
    Object.observe(this, $$observer);
  };

  Model.prototype.unobserve = function unobserve(){
    Object.unobserve(this, $$observer);
  };

  // Sets all of the given values on the model.
  // `newValues` is an object { property -> value }.
  Model.prototype.set = function set(newValues){
    for(var property in newValues){
      this[property] = newValues[property];
    }
  };

  // Cancels a listener returned by a call to `model.when(...)`.
  Model.prototype.cancel = function cancel(listener){
    for(var property in this._events){
      this.off(property, listener);
    }
  };

  // The functional reactive "when" operator.
  //
  //  * `properties` An array of property names (can also be a single property string).
  //  * `callback` A callback function that is called:
  //    * with property values as arguments, ordered corresponding to the properties array,
  //    * only if all specified properties have values,
  //    * once for initialization,
  //    * whenever one or more specified properties change,
  //    * on the next tick of the JavaScript event loop after properties change,
  //    * only once as a result of one or more synchronous changes to dependency properties.
  Model.prototype.when = function when(properties, callback, thisArg){

    // Make sure the default `this` becomes
    // the object you called `.on` on.
    thisArg = thisArg || this;

    var model = this;

    // Handle either an array or a single string.
    properties = (properties instanceof Array) ? properties : [properties];

    // This function will trigger the callback to be invoked.
    var listener = debounce(function (){
      var args = properties.map(function(property){
        return model[property];
      });
      if(allAreDefined(args)){
        callback.apply(thisArg, args);
      }
    });

    // Trigger the callback whenever specified properties change.
    properties.forEach(function(property){
      model.on(property, listener);
    });

    // Return this function so it can be removed later with `model.cancel(listener)`.
    return listener;
  };

  // Model.None is A representation for an optional Model property that is not specified.
  // Model property values of null or undefined are not propagated through
  // to when() listeners. If you want the when() listener to be invoked, but
  // some of the properties may or may not be defined, you can use Model.None.
  // This way, the when() listener is invoked even when the value is Model.None.
  // This allows the "when" approach to support optional properties.
  //
  // For example usage, see this scatter plot example with optional size and color fields:
  // http://bl.ocks.org/curran/9e04ccfebeb84bcdc76c
  //
  // Inspired by Scala's Option type.
  // See http://alvinalexander.com/scala/using-scala-option-some-none-idiom-function-java-null
  Model.None = "__NONE__";

  // Support AMD (RequireJS), CommonJS (Node), and browser globals.
  // Inspired by https://github.com/umdjs/umd
  if (typeof define === "function" && define.amd) {
    define([], function () { return Model; });
  } else if (typeof exports === "object") {
    module.exports = Model;
  } else {
    this.Model = Model;
  }
})();
