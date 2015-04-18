oop.namespace("brickdest.ecs");

brickdest.ecs.LocationComponent = oop.class({
  location: new brickdest.math.Vector(),
  __create__: function(config) {
    if (config && config.location) {
      this.location = config.location;
    }
  }
});

brickdest.ecs.MotionComponent = oop.class({
  speed: new brickdest.math.Vector(),
  __create__: function(config) {
    if (config && config.speed) {
      this.speed = config.speed;
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
      if (config.mass) {
        this.mass = config.mass;
      }
      if (config.friction) {
        this.friction = config.friction;
      }
      if (config.deflection) {
        this.deflection = config.deflection;
      }
      if (config.shape) {
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
      if (config.image) {
        this.image = config.image;
      }
      if (config.width) {
        this.width = config.width;
      }
      if (config.height) {
        this.height = config.height;
      }
    }
  }
});
