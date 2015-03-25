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

brickdest.entity.MotionFeature = oop.class({
  __create__: function() {
    this.speedX = 0.0;
    this.speedY = 0.0;
    this.mass = 1.0;
  },
  setSpeedX: function(speedX) {
    this.speedX = speedX;
  },
  getSpeedX: function() {
    return this.speedX;
  },
  setSpeedY: function(speedY) {
    this.speedY = speedY;
  },
  getSpeedY: function() {
    return this.speedY;
  },
  setMass: function(mass) {
    this.mass = mass;
  },
  getMass: function() {
    return this.mass;
  }
});
