oop.namespace("brickdest.shape");

brickdest.shape.IShape = oop.interface({
  getClosestPointDistance: function() {},
  getFurthestPointDistance: function() {}
});

brickdest.shape.Circle = oop.class({
  radius: 1.0,
  __create__: function(config) {
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
