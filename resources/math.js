oop.namespace("brickdest.math")

brickdest.math.Vector = oop.class({
  x: 0.0,
  y: 0.0,
  __create__: function() {
    if (arguments.length == 1) {
      this.x = arguments[0].x;
      this.y = arguments[0].y;
    }
    if (arguments.length == 2) {
      this.x = arguments[0];
      this.y = arguments[1];
    }
  },
  inc: function() {
    if (arguments.length == 1) {
      var x = this.x + arguments[0].x;
      var y = this.y + arguments[0].y;
      return new brickdest.math.Vector(x, y);
    }
    if (arguments.length == 2) {
      var x = this.x + arguments[0];
      var y = this.y + arguments[1];
      return new brickdest.math.Vector(x, y);
    }
    throw "Incorrect usage of method!";
  },
  dec: function() {
    if (arguments.length == 1) {
      var x = this.x - arguments[0].x;
      var y = this.y - arguments[0].y;
      return new brickdest.math.Vector(x, y);
    }
    if (arguments.length == 2) {
      var x = this.x - arguments[0];
      var y = this.y - arguments[1];
      return new brickdest.math.Vector(x, y);
    }
    throw "Incorrect usage of method!";
  },
  mul: function(amount) {
    var x = this.x * amount;
    var y = this.y * amount;
    return new brickdest.math.Vector(x, y);
  },
  div: function(amount) {
    var x = this.x / amount;
    var y = this.y / amount;
    return new brickdest.math.Vector(x, y);
  },
  getSquaredLength: function() {
    return this.x * this.x + this.y * this.y;
  },
  getLength: function() {
    return Math.sqrt(this.getSquaredLength());
  },
  dotProduct: function(other) {
    return this.x * other.x + this.y * other.y;
  }
});
