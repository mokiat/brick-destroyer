oop.namespace("brickdest.shape");

brickdest.shape.IShape = oop.interface({
  // This should return the shortest distance to any point
  // of the shape, not only vertices.
  // Collision detection uses this to determine the best stepping size
  // so that objects don't overjump each other in a single move.
  getClosestPointDistance: function() {},

  // This should return the longest distance to any point
  // of the shape, not only vertices.
  // Collision detection uses this to do a fast check whether two objects
  // have at all a chance of collision, without doing slow evaluations.
  getFurthestPointDistance: function() {}
});

brickdest.shape.Circle = oop.class({
  __create__: function(config) {
    this.radius = 1.0;
    if (config && config.radius) {
      this.radius = config.radius;
    }
  },
  getClosestPointDistance: function() {
    return this.radius;
  },
  getFurthestPointDistance: function() {
    return this.radius;
  }
});

brickdest.shape.Rectangle = oop.class({
  __create__: function(config) {
    this.width = 2.0;
    this.height = 1.0;
    if (config) {
      if (config.width) {
        this.width = config.width;
      }
      if (config.height) {
        this.height = config.height;
      }
    }
  },
  getHalfWidth: function() {
    return this.width / 2.0;
  },
  getHalfHeight: function() {
    return this.height / 2.0;
  },
  getClosestPointDistance: function() {
    if (this.width < this.height) {
      return this.getHalfWidth();
    } else {
      return this.getHalfHeight();
    }
  },
  getFurthestPointDistance: function() {
    var halfWidth = this.getHalfWidth();
    var halfHeight = this.getHalfHeight();
    var distanceSquared = halfWidth * halfWidth + halfHeight * halfHeight;
    return Math.sqrt(distanceSquared);
  }
});
