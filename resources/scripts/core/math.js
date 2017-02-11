(function(ns, undefined) {

  ns.Vector = function() {
    this.x = 0.0;
    this.y = 0.0;
    if (arguments.length === 1) {
      this.x = arguments[0].x;
      this.y = arguments[0].y;
    }
    if (arguments.length === 2) {
      this.x = arguments[0];
      this.y = arguments[1];
    }
  };

  ns.Vector.prototype.inc = function() {
    if (arguments.length == 1) {
      var x = this.x + arguments[0].x;
      var y = this.y + arguments[0].y;
      return new ns.Vector(x, y);
    } else if (arguments.length == 2) {
      var x = this.x + arguments[0];
      var y = this.y + arguments[1];
      return new ns.Vector(x, y);
    } else {
      throw "Incorrect usage of method!";
    }
  };

  ns.Vector.prototype.dec = function() {
    if (arguments.length == 1) {
      var x = this.x - arguments[0].x;
      var y = this.y - arguments[0].y;
      return new ns.Vector(x, y);
    } else if (arguments.length == 2) {
      var x = this.x - arguments[0];
      var y = this.y - arguments[1];
      return new ns.Vector(x, y);
    } else {
      throw "Incorrect usage of method!";
    }
  };

  ns.Vector.prototype.mul = function(amount) {
    var x = this.x * amount;
    var y = this.y * amount;
    return new ns.Vector(x, y);
  };

  ns.Vector.prototype.div = function(amount) {
    var x = this.x / amount;
    var y = this.y / amount;
    return new ns.Vector(x, y);
  };

  ns.Vector.prototype.getSquaredLength = function() {
    return this.x * this.x + this.y * this.y;
  };

  ns.Vector.prototype.getLength = function() {
    return Math.sqrt(this.getSquaredLength());
  };

  ns.Vector.prototype.resize = function(newLength) {
    var scale = newLength / this.getLength();
    return this.mul(scale);
  };

  ns.Vector.prototype.dotProduct = function(other) {
    return this.x * other.x + this.y * other.y;
  };

})(window.math = window.math || {});
