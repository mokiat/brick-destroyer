oop.namespace("brickdest.ecs");

brickdest.ecs.SpriteRenderSystem = oop.class({
  __create__: function(manager, renderer) {
    this.manager = manager;
    this.renderer = renderer;
  },
  update: function(elapsedSeconds) {
    var entities = this.manager.filterEntities(["location", "sprite"]);
    for (var i = 0; i < entities.length; i++) {
      this.renderEntity(entities[i]);
    }
  },
  renderEntity: function(entity) {
    var location = entity.getComponent("location");
    var sprite = entity.getComponent("sprite");
    var width = sprite.width;
    var height = sprite.height;
    var left = Math.floor(location.location.x) - width / 2;
    var top = Math.floor(location.location.y) - height / 2;
    this.renderer.drawScaledImage(sprite.image, left, top, width, height);
  }
});

brickdest.ecs.MaxSpeed = 1000.0;

brickdest.ecs.CollisionEvent = oop.class({
  __create__: function(data) {
    this.obstacle = data.obstacle;
    this.collisionNormal = data.collisionNormal;
  }
});

brickdest.ecs.MotionSystem = oop.class({
  __create__: function(manager) {
    this.manager = manager;
    this.gravity = new brickdest.math.Vector();
    this.collisionEvaluator = new brickdest.ecs.CollisionEvaluator();
  },
  update: function(elapsedSeconds) {
    var entities = this.manager.filterEntities(["location", "motion"]);
    for (var i = 0; i < entities.length; i++) {
      this.moveEntity(entities[i], elapsedSeconds);
    }
  },
  moveEntity: function(entity, elapsedSeconds) {
    var locationComp = entity.getComponent("location");
    var motionComp = entity.getComponent("motion");

    var speedDelta = this.gravity.mul(elapsedSeconds);
    var oldSpeed = motionComp.speed;
    var newSpeed = oldSpeed.inc(speedDelta);
    if (newSpeed.getSquaredLength() > brickdest.ecs.MaxSpeed * brickdest.ecs.MaxSpeed) {
      newSpeed = newSpeed.resize(brickdest.ecs.MaxSpeed);
    }
    var deltaLocation = oldSpeed.inc(newSpeed).mul(elapsedSeconds * 0.5);
    var oldLocation = locationComp.location;
    var newLocation = oldLocation.inc(deltaLocation);

    if (entity.hasComponent("collision")) {
      // Move a fraction of the smallest dimension of the shape
      var stepSize = 0.5 * entity.getComponent("collision").shape.getClosestPointDistance();
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
  },
  checkEntityCollision: function(entity) {
    var entities = this.manager.filterEntities(["location", "collision"]);
    for (var i = 0; i < entities.length; i++) {
      var staticEntity = entities[i];
      if (staticEntity != entity) {
        this.checkCollisionBetween(staticEntity, entity);
      }
    }
  },
  checkCollisionBetween: function(staticEntity, movingEntity) {
    var vector = this.collisionEvaluator.getEscapeVector(staticEntity, movingEntity);
    if (vector == null) {
      return;
    }
    if (staticEntity.hasComponent("motion")) {
      throw "Collision between two moving objects not supported!";
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

    movingEntity.throwEvent(new brickdest.ecs.CollisionEvent({
      obstacle: staticEntity,
      collisionNormal: new brickdest.math.Vector(collisionNormal)
    }));
    staticEntity.throwEvent(new brickdest.ecs.CollisionEvent({
      obstacle: movingEntity,
      collisionNormal: collisionNormal.mul(-1.0)
    }));
  }
});

brickdest.ecs.MouseBoundSystem = oop.class({
  __create__: function(manager) {
    this.manager = manager;
    this.mouseX = null;
    this.mouseY = null;
  },
  update: function(elapsedSeconds) {
    if (this.mouseX == null || this.mouseY == null) {
      return;
    }
    var entities = this.manager.filterEntities(["location", "mouseBound"]);
    for (var i = 0; i < entities.length; i++) {
      this.placeEntityAt(entities[i], this.mouseX, this.mouseY);
    }
  },
  onMouseMove: function(x, y) {
    this.mouseX = x;
    this.mouseY = y;
  },
  placeEntityAt: function(entity, x, y) {
    var locationComp = entity.getComponent("location");
    var mouseBoundComp = entity.getComponent("mouseBound");
    if (mouseBoundComp.axisXBound) {
      locationComp.location.x = x;
    }
    if (mouseBoundComp.axisYBound) {
      locationComp.location.y = y;
    }
  }
});

brickdest.ecs.LocationBoundSystem = oop.class({
  __create__: function(manager) {
    this.manager = manager;
  },
  update: function(elapsedSeconds) {
    var entities = this.manager.filterEntities(["location", "locationBound"]);
    for (var i = 0; i < entities.length; i++) {
      this.checkEntityLocation(entities[i]);
    }
  },
  checkEntityLocation: function(entity) {
    var locationComp = entity.getComponent("location");
    var locationBoundComp = entity.getComponent("locationBound");
    if (locationComp.location.x < locationBoundComp.minX) {
      locationComp.location.x = locationBoundComp.minX;
    }
    if (locationComp.location.x > locationBoundComp.maxX) {
      locationComp.location.x = locationBoundComp.maxX;
    }
    if (locationComp.location.y < locationBoundComp.minY) {
      locationComp.location.y = locationBoundComp.minY;
    }
    if (locationComp.location.y > locationBoundComp.maxY) {
      locationComp.location.y = locationBoundComp.maxY;
    }
  }
});

brickdest.ecs.DestroyOnHitSystem = oop.class({
  __create__: function(manager) {
    manager.subscribe(["collision", "destroyOnHit"], $.proxy(this.onEntityEvent, this));
  },
  onEntityEvent: function(entity, event) {
    if (event instanceof brickdest.ecs.CollisionEvent) {
      this.onEntityCollision(entity, event);
    }
  },
  onEntityCollision: function(entity, collisionEvent) {
    entity.destroy();
  },
  update: function(elapsedSeconds) {}
});

brickdest.ecs.SpawnOnDestroySystem = oop.class({
  __create__: function(manager, entityFactory) {
    this.entityFactory = entityFactory;
    this.manager = manager;
    this.manager.subscribe(["location", "spawnOnDestroy"], $.proxy(this.onEntityEvent, this));
  },
  onEntityEvent: function(entity, event) {
    if (event instanceof brickdest.ecs.DestroyedEvent) {
      this.onEntityDestroyed(entity, event);
    }
  },
  onEntityDestroyed: function(entity, event) {
    var locationComp = entity.getComponent("location");
    var locationDef = {
      "location" : {
        "x" : locationComp.location.x,
        "y" : locationComp.location.y
      }
    }
    var spawnComp = entity.getComponent("spawnOnDestroy");
    var definition = $.extend(true, {}, spawnComp.definition, locationDef);
    this.entityFactory.createEntity(definition);
  }
});

brickdest.ecs.BounceTogglableSystem = oop.class({
  __create__: function(manager) {
    this.manager = manager;
    this.manager.subscribe(["location", "collision", "bounceTogglable"], $.proxy(this.onEntityEvent, this));
    this.toggled = false;
  },
  isToggled: function() {
    return this.toggled;
  },
  setToggled: function(toggled) {
    this.toggled = toggled;
  },
  update: function(elapsedSeconds) {
    var entities = this.manager.filterEntities(["sprite", "bounceTogglable"]);
    for (var i = 0; i < entities.length; i++) {
      this.updateEntityImage(entities[i]);
    }
  },
  updateEntityImage: function(entity) {
    var spriteComp = entity.getComponent("sprite");
    var bounceTogglableComp = entity.getComponent("bounceTogglable");
    if (this.isToggled()) {
      spriteComp.image = bounceTogglableComp.activeImage;
    } else {
      spriteComp.image = bounceTogglableComp.inactiveImage;
    }
  },
  onEntityEvent: function(entity, event) {
    if (event instanceof brickdest.ecs.CollisionEvent) {
      this.onEntityCollision(entity, event);
    }
  },
  onEntityCollision: function(entity, collisionEvent) {
    var otherEntity = collisionEvent.obstacle;
    if (!otherEntity.hasComponent("location") || !otherEntity.hasComponent("motion")) {
      return;
    }
    var locationComp = entity.getComponent("location");
    var bounceTogglableComp = entity.getComponent("bounceTogglable");
    var deflection = bounceTogglableComp.deflection;

    var otherLocationComp = otherEntity.getComponent("location");
    var otherMotionComp = otherEntity.getComponent("motion");

    var delta = otherLocationComp.location.dec(locationComp.location);
    var deltaSpeed = new brickdest.math.Vector();
    deltaSpeed.x = delta.x * deflection.x;
    deltaSpeed.y = delta.y * deflection.y;
    if (!this.isToggled()) {
      deltaSpeed.y = 0.0;
    }

    otherMotionComp.speed = otherMotionComp.speed.inc(deltaSpeed);
  }
});

brickdest.ecs.VictorySystem = oop.class({
  __create__: function(manager) {
    this.manager = manager;
    this.triggered = false;
  },
  update: function(elapsedSeconds) {
    var entities = this.manager.filterEntities(["shouldDestroy"]);
    this.triggered = (entities.length == 0);
  },
  isTriggered: function() {
    return this.triggered;
  },
  reset: function() {
    this.triggered = false;
  }
});

brickdest.ecs.DefeatSystem = oop.class({
  __create__: function(manager) {
    this.manager = manager;
    this.manager.subscribe(["shouldNotDestroy"], $.proxy(this.onEntityEvent, this));
    this.triggered = false;
  },
  update: function(elapsedSeconds) {
  },
  isTriggered: function() {
    return this.triggered;
  },
  reset: function() {
    this.triggered = false;
  },
  onEntityEvent: function(entity, event) {
    if (event instanceof brickdest.ecs.DestroyedEvent) {
      this.onEntityDestroyed(entity, event);
    }
  },
  onEntityDestroyed: function(entity, collisionEvent) {
    this.triggered = true;
  }
});

brickdest.ecs.TimerDestroySystem = oop.class({
  __create__: function(manager) {
    this.manager = manager;
  },
  update: function(elapsedSeconds) {
    var entities = this.manager.filterEntities(["timerDestroy"]);
    for (var i = 0; i < entities.length; i++) {
      this.updateEntityTimer(entities[i], elapsedSeconds);
    }
  },
  updateEntityTimer: function(entity, elapsedSeconds) {
    var timerDestroyComp = entity.getComponent("timerDestroy");
    timerDestroyComp.timeout -= elapsedSeconds;
    if (timerDestroyComp.timeout <= 0.0) {
      entity.destroy();
    }
  }
});
