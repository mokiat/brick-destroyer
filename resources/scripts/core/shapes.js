(function(ns, undefined) {

  ns.Circle = function(config) {
    this.radius = 1.0;
    if (config !== undefined) {
      if (config.radius !== undefined) {
        this.radius = config.radius;
      }
    }
  };

  ns.Circle.prototype.getClosestPointDistance = function() {
    return this.radius;
  };

  ns.Circle.prototype.getFurthestPointDistance = function() {
    return this.radius;
  };


  ns.Rectangle = function(config) {
    this.width = 2.0;
    this.height = 1.0;
    if (config !== undefined) {
      if (config.width !== undefined) {
        this.width = config.width;
      }
      if (config.height !== undefined) {
        this.height = config.height;
      }
    }
  };

  ns.Rectangle.prototype.getHalfWidth = function() {
    return this.width / 2.0;
  };

  ns.Rectangle.prototype.getHalfHeight = function() {
    return this.height / 2.0;
  };

  ns.Rectangle.prototype.getClosestPointDistance = function() {
    if (this.width < this.height) {
      return this.getHalfWidth();
    } else {
      return this.getHalfHeight();
    }
  };

  ns.Rectangle.prototype.getFurthestPointDistance = function() {
    var halfWidth = this.getHalfWidth();
    var halfHeight = this.getHalfHeight();
    var distanceSquared = halfWidth * halfWidth + halfHeight * halfHeight;
    return Math.sqrt(distanceSquared);
  };

})(window.shapes = window.shapes || {});
