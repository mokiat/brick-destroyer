oop.namespace("brickdest.ecs");

brickdest.ecs.EntityFactory = oop.class({
  __create__: function(manager, resourceCollection) {
    this.manager = manager;
    this.resourceCollection = resourceCollection;
  },
  createBorder: function(x, y, width, height) {
    var entity = this.manager.createEntity();
    entity.addComponent("location", new brickdest.ecs.LocationComponent({
      location: new brickdest.math.Vector(x, y)
    }));
    entity.addComponent("collision", new brickdest.ecs.CollisionComponent({
      shape: new brickdest.shape.Rectangle({
        width: width,
        height: height
      }),
      deflection: 1.0,
      friction: 0.0
    }));
    return entity;
  },
  createBall: function(x, y) {
    var entity = this.manager.createEntity();
    entity.addComponent("location", new brickdest.ecs.LocationComponent({
      location: new brickdest.math.Vector(x, y)
    }));
    entity.addComponent("motion", new brickdest.ecs.MotionComponent());
    entity.addComponent("collision", new brickdest.ecs.CollisionComponent({
      shape: new brickdest.shape.Circle({
        radius: 13.5
      }),
      deflection: 0.8,
      friction: 0.4
    }));
    var ballImage = this.resourceCollection.find("ball");
    entity.addComponent("sprite", new brickdest.ecs.SpriteComponent({
      width: 28,
      height: 28,
      image: ballImage
    }));
    return entity;
  },
  createBrick: function(x, y, type) {
    var entity = this.manager.createEntity();
    entity.addComponent("location", new brickdest.ecs.LocationComponent({
      location: new brickdest.math.Vector(x, y)
    }));
    entity.addComponent("collision", new brickdest.ecs.CollisionComponent({
      shape: new brickdest.shape.Rectangle({
        width: 75.0,
        height: 40.0
      }),
      deflection: 1.0,
      friction: 0.0
    }));
    var brickImage;
    switch (type) {
      case brickdest.level.BRICK_GREEN:
        brickImage = this.resourceCollection.find("brick_green");
        break;
      case brickdest.level.BRICK_RED:
        brickImage = this.resourceCollection.find("brick_red");
        break;
      case brickdest.level.BRICK_GREY:
        brickImage = this.resourceCollection.find("brick_grey");
        break;
      case brickdest.level.BRICK_STAR:
        brickImage = this.resourceCollection.find("brick_star");
        break;
      case brickdest.level.BRICK_BALL:
        brickImage = this.resourceCollection.find("brick_ball");
        break;
      case brickdest.level.BRICK_GRAVITY:
        brickImage = this.resourceCollection.find("brick_gravity");
        break;
      case brickdest.level.BRICK_FRICTION:
        brickImage = this.resourceCollection.find("brick_friction");
        break;
      case brickdest.level.BRICK_BOUNCE:
        brickImage = this.resourceCollection.find("brick_bounce");
        break;
    }
    entity.addComponent("sprite", new brickdest.ecs.SpriteComponent({
      width: 75,
      height: 40,
      image: brickImage
    }));
    return entity;
  },
  createSlider: function(x, y) {
    var entity = this.manager.createEntity();
    entity.addComponent("location", new brickdest.ecs.LocationComponent({
      location: new brickdest.math.Vector(x, y)
    }));
    entity.addComponent("collision", new brickdest.ecs.CollisionComponent({
      shape: new brickdest.shape.Rectangle({
        width: 110.0,
        height: 18.0
      }),
      deflection: 1.0,
      friction: 0.0
    }));
    var sliderImage = this.resourceCollection.find("slider_inactive");
    entity.addComponent("sprite", new brickdest.ecs.SpriteComponent({
      width: 110,
      height: 18,
      image: sliderImage
    }));
    return entity;
  }
});

brickdest.ecs.CollisionEvaluator = oop.class({
  getEscapeVector: function(staticEntity, candidateEntity) {
    if (this.areTooFar(staticEntity, candidateEntity)) {
      return null;
    }
    if (this.isCircle(staticEntity) && this.isCircle(candidateEntity)) {
      return this.getEscapeVectorCircleCircle(staticEntity, candidateEntity);
    }
    if (this.isRectangle(staticEntity) && this.isRectangle(candidateEntity)) {
      return this.getEscapeVectorRectangleRectangle(staticEntity, candidateEntity);
    }
    if (this.isRectangle(staticEntity) && this.isCircle(candidateEntity)) {
      return this.getEscapeVectorRectangleCircle(staticEntity, candidateEntity);
    }
    if (this.isCircle(staticEntity) && this.isRectangle(candidateEntity)) {
      return this.getEscapeVectorRectangleCircle(candidateEntity, staticEntity).mul(-1.0);
    }
    return null;
  },
  areTooFar: function(staticEntity, candidateEntity) {
    var staticLocationComp = staticEntity.getComponent("location");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var candidateLocationComp = candidateEntity.getComponent("location");
    var candidateCollisionComp = candidateEntity.getComponent("collision");
    var distance = candidateLocationComp.location.dec(staticLocationComp.location);
    var minCollisionDistance =
          staticCollisionComp.shape.getFurthestPointDistance() +
          candidateCollisionComp.shape.getFurthestPointDistance();
    return (distance.getLength() > minCollisionDistance);
  },
  getEscapeVectorCircleCircle: function(staticEntity, candidateEntity) {
    var staticLocationComp = staticEntity.getComponent("location");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var candidateLocationComp = candidateEntity.getComponent("location");
    var candidateCollisionComp = candidateEntity.getComponent("collision");
    var distance = candidateLocationComp.location.dec(staticLocationComp.location);
    var penetration =
          staticCollisionComp.shape.radius +
          candidateCollisionComp.shape.radius -
          distance.getLength();
    if (penetration < 0.0) {
      return null;
    }
    return distance.resize(penetration);
  },
  getEscapeVectorRectangleRectangle: function(staticEntity, candidateEntity) {
    var staticLocationComp = staticEntity.getComponent("location");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var candidateLocationComp = candidateEntity.getComponent("location");
    var candidateCollisionComp = candidateEntity.getComponent("collision");
    var staticLeft = staticLocationComp.location.x - staticCollisionComp.shape.getHalfWidth();
    var staticRight = staticLocationComp.location.x + staticCollisionComp.shape.getHalfWidth();
    var staticTop = staticLocationComp.location.y - staticCollisionComp.shape.getHalfHeight();
    var staticBottom = staticLocationComp.location.y + staticCollisionComp.shape.getHalfHeight();
    var candidateLeft = candidateLocationComp.location.x - candidateCollisionComp.shape.getHalfWidth();
    var candidateRight = candidateLocationComp.location.x + candidateCollisionComp.shape.getHalfWidth();
    var candidateTop = candidateLocationComp.location.y - candidateCollisionComp.shape.getHalfHeight();
    var candidateBottom = candidateLocationComp.location.y + candidateCollisionComp.shape.getHalfHeight();

    var horizontalEscape;
    var horizontalOverlap = (candidateLeft < staticRight) && (candidateRight > staticLeft);
    if (horizontalOverlap) {
      if (candidateLocationComp.location.x > staticLocationComp.location.x) {
        horizontalEscape = new brickdest.math.Vector(staticRight - candidateLeft, 0.0);
      } else {
        horizontalEscape = new brickdest.math.Vector(staticLeft - candidateRight, 0.0);
      }
    } else {
      return null;
    }

    var verticalEscape;
    var verticalOverlap = (candidateTop < staticBottom) && (candidateBottom > staticTop);
    if (verticalOverlap) {
      if (candidateLocationComp.location.y > staticLocationComp.location.y) {
        verticalEscape = new brickdest.math.Vector(0.0, staticBottom - candidateTop);
      } else {
        verticalEscape = new brickdest.math.Vector(0.0, staticTop - candidateBottom);
      }
    } else {
      return null;
    }

    if (verticalEscape.getSquaredLength() < horizontalEscape.getSquaredLength()) {
      return verticalEscape;
    } else {
      return horizontalEscape;
    }
  },
  getEscapeVectorRectangleCircle: function(staticEntity, candidateEntity) {
    var staticLocationComp = staticEntity.getComponent("location");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var candidateLocationComp = candidateEntity.getComponent("location");
    var candidateCollisionComp = candidateEntity.getComponent("collision");
    var staticLeft = staticLocationComp.location.x - staticCollisionComp.shape.getHalfWidth();
    var staticRight = staticLocationComp.location.x + staticCollisionComp.shape.getHalfWidth();
    var staticTop = staticLocationComp.location.y - staticCollisionComp.shape.getHalfHeight();
    var staticBottom = staticLocationComp.location.y + staticCollisionComp.shape.getHalfHeight();
    var candidateLeft = candidateLocationComp.location.x - candidateCollisionComp.shape.radius;
    var candidateRight = candidateLocationComp.location.x + candidateCollisionComp.shape.radius;
    var candidateTop = candidateLocationComp.location.y - candidateCollisionComp.shape.radius;
    var candidateBottom = candidateLocationComp.location.y + candidateCollisionComp.shape.radius;

    var horizontalEscape;
    var horizontalOverlap = (candidateLeft < staticRight) && (candidateRight > staticLeft);
    if (horizontalOverlap) {
      if (candidateLocationComp.location.x > staticLocationComp.location.x) {
        horizontalEscape = new brickdest.math.Vector(staticRight - candidateLeft, 0.0);
      } else {
        horizontalEscape = new brickdest.math.Vector(staticLeft - candidateRight, 0.0);
      }
    } else {
      return null;
    }

    var verticalEscape;
    var verticalOverlap = (candidateTop < staticBottom) && (candidateBottom > staticTop);
    if (verticalOverlap) {
      if (candidateLocationComp.location.y > staticLocationComp.location.y) {
        verticalEscape = new brickdest.math.Vector(0.0, staticBottom - candidateTop);
      } else {
        verticalEscape = new brickdest.math.Vector(0.0, staticTop - candidateBottom);
      }
    } else {
      return null;
    }

    var cornerEscape;
    var cornerOverlapPossible =
          ((candidateLocationComp.location.x < staticLeft) || (candidateLocationComp.location.x > staticRight)) &&
          ((candidateLocationComp.location.y < staticTop) || (candidateLocationComp.location.y > staticBottom));
    if (cornerOverlapPossible) {
      var cornerDistance = new brickdest.math.Vector();
      if (candidateLocationComp.location.x < staticLeft) {
        cornerDistance.x = (candidateLocationComp.location.x - staticLeft);
      } else {
        cornerDistance.x = (candidateLocationComp.location.x - staticRight);
      }
      if (candidateLocationComp.location.y < staticTop) {
        cornerDistance.y = (candidateLocationComp.location.y - staticTop);
      } else {
        cornerDistance.y = (candidateLocationComp.location.y - staticBottom);
      }
      var distanceLength = cornerDistance.getLength();
      if (distanceLength > candidateCollisionComp.shape.radius) {
        return null;
      }
      return cornerDistance.resize(candidateCollisionComp.shape.radius - distanceLength);
    }

    if (verticalEscape.getSquaredLength() < horizontalEscape.getSquaredLength()) {
      return verticalEscape;
    } else {
      return horizontalEscape;
    }
  },
  isCircle: function(entity) {
    var collisionComp = entity.getComponent("collision");
    return (collisionComp.shape instanceof brickdest.shape.Circle);
  },
  isRectangle: function(entity) {
    var collisionComp = entity.getComponent("collision");
    return (collisionComp.shape instanceof brickdest.shape.Rectangle);
  }
});
