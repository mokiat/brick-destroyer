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
  getEscapeVector: function(feature) {
    var x = this.entity.locationFeature.getX();
    var y = this.entity.locationFeature.getY();
    var halfWidth = this.width / 2.0;
    var halfHeight = this.height / 2.0;
    var minDistance = 1000.0;
    var escapeX = null;
    var escapeY = null;

    var distance = feature.getSurfacePenetration(1.0, 0.0, x + halfWidth);
    if (distance < 0.0) {
      return null;
    }
    if (distance < minDistance) {
      minDistance = distance;
      escapeX = distance;
      escapeY = 0.0;
    }
    distance = feature.getSurfacePenetration(-1.0, 0.0, -(x - halfWidth));
    if (distance < 0.0) {
      return null;
    }
    if (distance < minDistance) {
      minDistance = distance;
      escapeX = -distance;
      escapeY = 0.0;
    }
    distance = feature.getSurfacePenetration(0.0, 1.0, y + halfHeight);
    if (distance < 0.0) {
      return null;
    }
    if (distance < minDistance) {
      minDistance = distance;
      escapeX = 0.0;
      escapeY = distance;
    }
    distance = feature.getSurfacePenetration(0.0, -1.0, - (y - halfHeight));
    if (distance < 0.0) {
      return null;
    }
    if (distance < minDistance) {
      minDistance = distance;
      escapeX = 0.0;
      escapeY = -distance;
    }

    return new brickdest.math.Vector(escapeX, escapeY);
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
  getEscapeVector: function(feature) {
    var x = this.entity.locationFeature.getX();
    var y = this.entity.locationFeature.getY();

    var escapeX = null;
    var escapeY = null;
    var minDistance = 1000.0;

    var normals = brickdest.entity.CircleCollisionFeature.CollisionNormals;
    for (var i = 0; i < normals.length; i++) {
      var a = normals[i].x;
      var b = normals[i].y;
      var d = a * x + b * y + this.radius;
      var distance = feature.getSurfacePenetration(a, b, d);
      if (distance < 0.0) {
        return null;
      }
      if (distance < minDistance) {
        minDistance = distance;
        escapeX = a * distance;
        escapeY = b * distance;
      }
    }

    return new brickdest.math.Vector(escapeX, escapeY);
  }
});

brickdest.entity.CircleCollisionFeature.CollisionNormals = [
  new brickdest.math.Vector(1.0, 0.0),
  new brickdest.math.Vector(0.707106, 0.707106),
  new brickdest.math.Vector(0.0, 1.0),
  new brickdest.math.Vector(-0.707106, 0.707106),
  new brickdest.math.Vector(-1.0, 0.0),
  new brickdest.math.Vector(-0.707106, -0.707106),
  new brickdest.math.Vector(0.0, -1.0),
  new brickdest.math.Vector(0.707106, -0.707106),
];

brickdest.entity.Entity = oop.class({
  locationFeature: null,
  motionFeature: null,
  collisionFeature: null,
  renderFeature: null
});

brickdest.entity.CollisionEvaluator = oop.class({
  getEscapeVector: function(firstEntity, secondEntity) {
    var firstCollisionFeature = firstEntity.collisionFeature;
    var secondCollisionFeature = secondEntity.collisionFeature;

    var firstEscapeVector = firstCollisionFeature.getEscapeVector(secondCollisionFeature);
    if (firstEscapeVector == null) {
      return firstEscapeVector;
    }
    var secondEscapeVector = secondCollisionFeature.getEscapeVector(firstCollisionFeature);
    if (secondEscapeVector == null) {
      return secondEscapeVector;
    }

    if (firstEscapeVector.getSquaredLength() < secondEscapeVector.getSquaredLength()) {
      return firstEscapeVector;
    } else {
      return secondEscapeVector.mul(-1.0);
    }
  }
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
