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

brickdest.ecs.MotionSystem = oop.class({
  gravity: new brickdest.math.Vector(),
  __create__: function(manager) {
    this.manager = manager;
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
  }
});
