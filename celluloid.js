(function(global) {
  "use strict";
  var nextTick;
  if (typeof define === "function" && define.amd) {
    define([ "subsequent" ], function(subsequent) {
      nextTick = subsequent;
      return Cell;
    });
  } else if (typeof module === "object" && module.exports) {
    module.exports = Cell;
    nextTick = require("subsequent");
  } else {
    global.Celluloid = Cell;
    nextTick = global.subsequent;
  }
  function Cell(value) {
    this.__listeners__ = [];
    this.__dependencies__ = Array.prototype.slice.call(arguments, 1);
    this.value = isFunction(value) ? value.apply(null, this.__dependencies__) : value;
    var dependencies = this.__dependencies__.filter(traverse(this));
    var i = 0;
    while (i < dependencies.length) {
      var cell = this, dependency = dependencies[i++];
      dependency.get(function() {
        cell.set(value.apply(null, cell.__dependencies__));
      });
    }
  }
  Cell.prototype.get = function(listener) {
    this.__listeners__.push(listener);
  };
  Cell.prototype.set = function(value) {
    if (isFunction(value)) {
      this.__dependencies__ = Array.prototype.slice.call(arguments, 1);
      this.value = value.apply(null, this.__dependencies__);
    }
    this.value = value;
    handle(this.__listeners__, value);
  };
  Cell.prototype.valueOf = function() {
    return this.value;
  };
  Cell.prototype.toString = function() {
    return String(this.value);
  };
  function handle(listeners, value) {
    if (!listeners.length) return;
    var i = 0;
    while (i < listeners.length) {
      var listener = listeners[i++];
      listener(value);
    }
  }
  function traverse(root) {
    return function filter(needle) {
      var stack = [ root ], found = 0;
      while (stack.length) {
        var node = stack.pop();
        if (node === needle && found++) return false;
        stack.push.apply(stack, node.__dependencies__);
      }
      return true;
    };
  }
  function isFunction(fn) {
    return fn && typeof fn === "function";
  }
})(this);