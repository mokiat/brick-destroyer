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

brickdest.entity.RectangleCollisionFeature = oop.class({
  __create__: function(entity) {
    this.entity = entity;
    this.width = 2.0;
    this.height = 1.0;
  },
  setWidth: function(width) {
    this.width = width;
  },
  getWidth: function() {
    return this.width;
  },
  setHeight: function(height) {
    this.height = height;
  },
  getHeight: function() {
    return this.height;
  },
  getSurfacePenetration: function(a, b, d) {
    var x = this.entity.locationFeature.getX();
    var y = this.entity.locationFeature.getY();
    var halfWidth = this.width / 2.0;
    var halfHeight = this.height / 2.0;
    var minDistance = 1000.0;
    // top-left
    var distance = a * (x - halfWidth) + b * (y - halfHeight) - d;
    if (distance < minDistance) {
      minDistance = distance;
    }
    // bottom-left
    distance = a * (x - halfWidth) + b * (y + halfHeight) - d;
    if (distance < minDistance) {
      minDistance = distance;
    }
    // top-right
    distance = a * (x + halfWidth) + b * (y - halfHeight) - d;
    if (distance < minDistance) {
      minDistance = distance;
    }
    // bottom-right
    distance = a * (x + halfWidth) + b * (y + halfHeight) - d;
    if (distance < minDistance) {
      minDistance = distance;
    }
    return -minDistance;
  },
  getCollisionEstimate: function(feature) {
    // TODO
  }
});

brickdest.entity.CircleCollisionFeature = oop.class({
  __create__: function(entity) {
    this.entity = entity;
    this.radius = 1.0;
  },
  setRadius: function(radius) {
    this.radius = radius;
  },
  getRadius: function() {
    return this.radius;
  },
  getSurfacePenetration: function(a, b, d) {
    var x = this.entity.locationFeature.getX();
    var y = this.entity.locationFeature.getY();
    var distance = a * x + b * y - d;
    return this.radius - distance;
  },
  getCollisionEstimate: function(feature) {
    // TODO
  }
});

brickdest.entity.Entity = oop.class({
  locationFeature: null,
  motionFeature: null,
  collisionFeature: null,
  renderFeature: null
});

brickdest.entity.MotionSystem = oop.class({
  __create__: function() {
    this.acceleration = 9.8;
  },
  setAcceleration: function(acceleration) {
    this.acceleration = acceleration;
  },
  getAcceleration: function() {
    return this.acceleration;
  },
  process: function(entity, elapsedSeconds) {
    if (!entity.motionFeature) {
      return;
    }
    var oldSpeedX = entity.motionFeature.getSpeedX();
    var oldSpeedY = entity.motionFeature.getSpeedY();
    var newSpeedY = oldSpeedY + this.acceleration * elapsedSeconds;

    var locationX = entity.locationFeature.getX();
    var locationY = entity.locationFeature.getY();
    var newLocationX = locationX + oldSpeedX * elapsedSeconds;
    var newLocationY = locationY + (oldSpeedY + newSpeedY) * elapsedSeconds / 2.0;

    entity.locationFeature.setX(newLocationX);
    entity.locationFeature.setY(newLocationY);
    entity.motionFeature.setSpeedY(newSpeedY);
  }
});
