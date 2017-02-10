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

brickdest.ecs.MouseBoundComponent = oop.class({
  __create__: function(config) {
    this.axisXBound = true;
    this.axisYBound = true;
    if (typeof config !== 'undefined') {
      if (typeof config.axisXBound !== 'undefined') {
        this.axisXBound = config.axisXBound;
      }
      if (typeof config.axisYBound !== 'undefined') {
        this.axisYBound = config.axisYBound;
      }
    }
  }
});

brickdest.ecs.LocationBoundComponent = oop.class({
  __create__: function(config) {
    this.minX = -5000.0;
    this.maxX = 5000.0;
    this.minY = -5000.0;
    this.maxY = 5000.0;
    if (typeof config !== 'undefined') {
      if (typeof config.minX !== 'undefined') {
        this.minX = config.minX;
      }
      if (typeof config.maxX !== 'undefined') {
        this.maxX = config.maxX;
      }
      if (typeof config.minY !== 'undefined') {
        this.minY = config.minY;
      }
      if (typeof config.maxY !== 'undefined') {
        this.maxY = config.maxY;
      }
    }
  }
});

brickdest.ecs.DestroyOnHitComponent = oop.class({
});

brickdest.ecs.SpawnOnDestroyComponent = oop.class({
  __create__: function(config) {
    this.definition = {};
    if (typeof config !== 'undefined') {
      if (typeof config.definition !== 'undefined') {
        this.definition = config.definition;
      }
    }
  }
});

brickdest.ecs.BounceTogglableComponent = oop.class({
  __create__: function(config) {
    this.activeImage = null;
    this.inactiveImage = null;
    this.deflection = new brickdest.math.Vector(0.1, 0.1);
    if (typeof config !== 'undefined') {
      if (typeof config.activeImage !== 'undefined') {
        this.activeImage = config.activeImage;
      }
      if (typeof config.inactiveImage !== 'undefined') {
        this.inactiveImage = config.inactiveImage;
      }
      if (typeof config.deflection !== 'undefined') {
        this.deflection = config.deflection;
      }
    }
  }
});

brickdest.ecs.ShouldDestroyComponent = oop.class({
});

brickdest.ecs.ShouldNotDestroyComponent = oop.class({
});

brickdest.ecs.TimerDestroyComponent = oop.class({
  __create__: function(config) {
    this.timeout = 10.0;
    if (typeof config !== 'undefined') {
      if (typeof config.timeout !== 'undefined') {
        this.timeout = config.timeout;
      }
    }
  }
});

brickdest.ecs.DestroyOnExplodeComponent = oop.class({
});

brickdest.ecs.ExplodeOnDestroyComponent = oop.class({
  __create__: function(config) {
    this.explosionRadius = 100.0;
    if (typeof config !== 'undefined') {
      if (typeof config.explosionRadius !=='undefined') {
        this.explosionRadius = config.explosionRadius;
      }
    }
  }
});