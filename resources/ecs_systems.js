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
    motionComp.speed = newSpeed;

    var deltaLocation = oldSpeed.inc(newSpeed).mul(elapsedSeconds * 0.5);
    var oldLocation = locationComp.location;
    var newLocation = oldLocation.inc(deltaLocation);
    locationComp.location = newLocation;
  }
});
