oop.namespace("brickdest.ecs");

brickdest.ecs.LocationComponent = oop.class({
  location: new brickdest.math.Vector(),
  __create__: function(config) {
    if (config) {
      if (typeof config.location !== 'undefined') {
        this.location = config.location;
      }
    }
  }
});

brickdest.ecs.MotionComponent = oop.class({
  speed: new brickdest.math.Vector(),
  __create__: function(config) {
    if (config) {
      if (typeof config.speed !== 'undefined') {
        this.speed = config.speed;
      }
    }
  }
});

brickdest.ecs.CollisionComponent = oop.class({
  mass: 1.0,
  friction: 0.2,
  deflection: 0.8,
  shape: null,
  __create__: function(config) {
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
  image: null,
  width: 0,
  height: 0,
  __create__: function(config) {
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
