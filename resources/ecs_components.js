oop.namespace("brickdest.ecs");

brickdest.ecs.LocationComponent = oop.class({
  __create__: function(config) {
    this.location = new brickdest.math.Vector();
    if (config) {
      if (typeof config.location !== 'undefined') {
        this.location = config.location;
      }
    }
  }
});

brickdest.ecs.MotionComponent = oop.class({
  __create__: function(config) {
    this.speed = new brickdest.math.Vector();
    if (config) {
      if (typeof config.speed !== 'undefined') {
        this.speed = config.speed;
      }
    }
  }
});

brickdest.ecs.CollisionComponent = oop.class({
  __create__: function(config) {
    this.mass = 1.0;
    this.friction = 0.2;
    this.deflection = 0.8;
    this.shape = null;
    if (config) {
      if (typeof config.mass !== 'undefined') {
        this.mass = config.mass;
      }
      if (typeof config.friction !== 'undefined') {
        this.friction = config.friction;
      }
      if (typeof config.deflection !== 'undefined') {
        this.deflection = config.deflection;
      }
      if (typeof config.shape !== 'undefined') {
        this.shape = config.shape;
      }
    }
  }
});

brickdest.ecs.SpriteComponent = oop.class({
  __create__: function(config) {
    this.image = null;
    this.width = 0;
    this.height = 0;
    if (config) {
      if (typeof config.image !== 'undefined') {
        this.image = config.image;
      }
      if (typeof config.width !== 'undefined') {
        this.width = config.width;
      }
      if (typeof config.height !== 'undefined') {
        this.height = config.height;
      }
    }
  }
});
