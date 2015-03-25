oop.namespace("brickdest.entity");

brickdest.entity.LocationFeature = oop.class({
  __create__: function() {
    this.x = 0.0;
    this.y = 0.0;
  },
  setX: function(x) {
    this.x = x;
  },
  getX: function() {
    return this.x;
  },
  setY: function(y) {
    this.y = y;
  },
  getY: function() {
    return this.y;
  }
});
