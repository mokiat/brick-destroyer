(function(ns, undefined) {

  ns.MaxSpeed = 1000.0;
  ns.StepRatio = 0.25;

  ns.MotionSystem = function(manager) {
    this.manager = manager;
    this.gravity = new math.Vector();
    this.collisionEvaluator = new game.CollisionEvaluator();
  };

  ns.MotionSystem.prototype.update = function(elapsedSeconds) {
    var entities = this.manager.filterEntities(["location", "motion"]);
    for (var i = 0; i < entities.length; i++) {
      this.moveEntity(entities[i], elapsedSeconds);
    }
  };

  ns.MotionSystem.prototype.moveEntity = function(entity, elapsedSeconds) {
    var locationComp = entity.getComponent("location");
    var motionComp = entity.getComponent("motion");

    var speedDelta = this.gravity.mul(elapsedSeconds);
    var oldSpeed = motionComp.speed;
    var newSpeed = oldSpeed.inc(speedDelta);
    if (newSpeed.getSquaredLength() > ns.MaxSpeed * ns.MaxSpeed) {
      newSpeed = newSpeed.resize(ns.MaxSpeed);
    }
    var deltaLocation = oldSpeed.inc(newSpeed).mul(elapsedSeconds * 0.5);
    var oldLocation = locationComp.location;
    var newLocation = oldLocation.inc(deltaLocation);

    if (entity.hasComponent("collision")) {
      // Move a fraction of the smallest dimension of the shape
      var stepSize = ns.StepRatio * entity.getComponent("collision").shape.getClosestPointDistance();
      if (deltaLocation.getSquaredLength() > stepSize * stepSize) {
        // We have moved way too much for a proper collision detection.
        // Do a two separate half-time moves instead.
        this.moveEntity(entity, elapsedSeconds / 2.0);
        this.moveEntity(entity, elapsedSeconds / 2.0);
        return;
      }
    }

    motionComp.speed = newSpeed;
    locationComp.location = newLocation;

    if (entity.hasComponent("collision")) {
      this.checkEntityCollision(entity);
    }
  };

  ns.MotionSystem.prototype.checkEntityCollision = function(entity) {
    var entities = this.manager.filterEntities(["location", "collision"]);
    for (var i = 0; i < entities.length; i++) {
      var staticEntity = entities[i];
      if (staticEntity != entity) {
        this.checkCollisionBetween(staticEntity, entity);
      }
    }
  };

  ns.MotionSystem.prototype.checkCollisionBetween = function(staticEntity, movingEntity) {
    var vector = this.collisionEvaluator.getEscapeVector(staticEntity, movingEntity);
    if (vector == null) {
      return;
    }
    if (staticEntity.hasComponent("motion")) {
      return;
    }

    var movingLocationComp = movingEntity.getComponent("location");
    movingLocationComp.location.x += vector.x;
    movingLocationComp.location.y += vector.y;

    var movingMotionComp = movingEntity.getComponent("motion");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var movingCollisionComp = movingEntity.getComponent("collision");

    var totalDeflection = staticCollisionComp.deflection * movingCollisionComp.deflection;
    var totalFriction = staticCollisionComp.friction * movingCollisionComp.friction;

    var collisionNormal = vector.resize(1.0);
    var penetrationVector = collisionNormal.mul(collisionNormal.dotProduct(movingMotionComp.speed));

    var slideVector = movingMotionComp.speed.dec(penetrationVector);
    slideVector = slideVector.mul(1.0 - totalFriction);

    var bounceVector = penetrationVector.mul(-1.0);
    bounceVector = bounceVector.mul(totalDeflection);

    movingMotionComp.speed = bounceVector.inc(slideVector);

    movingEntity.throwEvent(new game.CollisionEvent({
      obstacle: staticEntity,
      collisionNormal: new math.Vector(collisionNormal)
    }));
    staticEntity.throwEvent(new game.CollisionEvent({
      obstacle: movingEntity,
      collisionNormal: collisionNormal.mul(-1.0)
    }));
  };


  ns.MouseBoundSystem = function(manager) {
    this.manager = manager;
    this.mouseX = null;
    this.mouseY = null;
  };

  ns.MouseBoundSystem.prototype.update = function(elapsedSeconds) {
    if (this.mouseX == null || this.mouseY == null) {
      return;
    }
    var entities = this.manager.filterEntities(["location", "mouseBound"]);
    for (var i = 0; i < entities.length; i++) {
      this.placeEntityAt(entities[i], this.mouseX, this.mouseY);
    }
  };

  ns.MouseBoundSystem.prototype.onMouseMove = function(x, y) {
    this.mouseX = x;
    this.mouseY = y;
  };

  ns.MouseBoundSystem.prototype.placeEntityAt = function(entity, x, y) {
    var locationComp = entity.getComponent("location");
    var mouseBoundComp = entity.getComponent("mouseBound");
    if (mouseBoundComp.axisXBound) {
      locationComp.location.x = x;
    }
    if (mouseBoundComp.axisYBound) {
      locationComp.location.y = y;
    }
  };

  ns.BounceToggleableSystem = function(manager) {
    this.manager = manager;
    this.manager.subscribe(["location", "collision", "bounceToggleable"], $.proxy(this.onEntityEvent, this));
    this.toggled = false;
  };

  ns.BounceToggleableSystem.prototype.isToggled = function() {
    return this.toggled;
  };

  ns.BounceToggleableSystem.prototype.setToggled = function(toggled) {
    this.toggled = toggled;
  };

  ns.BounceToggleableSystem.prototype.update = function(elapsedSeconds) {
    var entities = this.manager.filterEntities(["sprite", "bounceToggleable"]);
    for (var i = 0; i < entities.length; i++) {
      this.updateEntityImage(entities[i]);
    }
  };

  ns.BounceToggleableSystem.prototype.updateEntityImage = function(entity) {
    var spriteComp = entity.getComponent("sprite");
    var bounceToggleableComp = entity.getComponent("bounceToggleable");
    if (this.isToggled()) {
      spriteComp.image = bounceToggleableComp.activeImage;
    } else {
      spriteComp.image = bounceToggleableComp.inactiveImage;
    }
  };

  ns.BounceToggleableSystem.prototype.onEntityEvent = function(entity, event) {
    if (event instanceof game.CollisionEvent) {
      this.onEntityCollision(entity, event);
    }
  };

  ns.BounceToggleableSystem.prototype.onEntityCollision = function(entity, collisionEvent) {
    var otherEntity = collisionEvent.obstacle;
    if (!otherEntity.hasComponent("location") || !otherEntity.hasComponent("motion")) {
      return;
    }
    var locationComp = entity.getComponent("location");
    var bounceToggleableComp = entity.getComponent("bounceToggleable");
    var deflection = bounceToggleableComp.deflection;

    var otherLocationComp = otherEntity.getComponent("location");
    var otherMotionComp = otherEntity.getComponent("motion");

    var delta = otherLocationComp.location.dec(locationComp.location);
    var deltaSpeed = new math.Vector();
    deltaSpeed.x = delta.x * deflection.x;
    deltaSpeed.y = delta.y * deflection.y;
    if (!this.isToggled()) {
      deltaSpeed.y = 0.0;
    }

    otherMotionComp.speed = otherMotionComp.speed.inc(deltaSpeed);
  };


})(window.game = window.game || {});
