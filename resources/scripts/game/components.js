(function(ns, undefined) {

  ns.LocationComponent = function(config) {
    this.location = new math.Vector();
    if (config !== undefined) {
      if (config.location !== undefined) {
        this.location = config.location;
      }
    }
  };


  ns.MotionComponent = function(config) {
    this.speed = new math.Vector();
    if (config !== undefined) {
      if (config.speed !== undefined) {
        this.speed = config.speed;
      }
    }
  };


  ns.CollisionComponent = function(config) {
    this.mass = 1.0;
    this.friction = 0.2;
    this.deflection = 0.8;
    this.shape = null;
    if (config !== undefined) {
      if (config.mass !== undefined) {
        this.mass = config.mass;
      }
      if (config.friction !== undefined) {
        this.friction = config.friction;
      }
      if (config.deflection !== undefined) {
        this.deflection = config.deflection;
      }
      if (config.shape !== undefined) {
        this.shape = config.shape;
      }
    }
  };


  ns.SpriteComponent = function(config) {
    this.image = null;
    this.width = 0;
    this.height = 0;
    if (config !== undefined) {
      if (config.image !== undefined) {
        this.image = config.image;
      }
      if (config.width !== undefined) {
        this.width = config.width;
      }
      if (config.height !== undefined) {
        this.height = config.height;
      }
    }
  };


  ns.MouseBoundComponent = function(config) {
    this.axisXBound = true;
    this.axisYBound = true;
    if (config !== undefined) {
      if (config.axisXBound !== undefined) {
        this.axisXBound = config.axisXBound;
      }
      if (config.axisYBound !== undefined) {
        this.axisYBound = config.axisYBound;
      }
    }
  };


  ns.LocationBoundComponent = function(config) {
    this.minX = -5000.0;
    this.maxX = 5000.0;
    this.minY = -5000.0;
    this.maxY = 5000.0;
    if (config !== undefined) {
      if (config.minX !== undefined) {
        this.minX = config.minX;
      }
      if (config.maxX !== undefined) {
        this.maxX = config.maxX;
      }
      if (config.minY !== undefined) {
        this.minY = config.minY;
      }
      if (config.maxY !== undefined) {
        this.maxY = config.maxY;
      }
    }
  };


  ns.DestroyOnHitComponent = function() {
  };


  ns.SpawnOnDestroyComponent = function(config) {
    this.definition = {};
    if (config !== undefined) {
      if (config.definition !== undefined) {
        this.definition = config.definition;
      }
    }
  };


  ns.BounceToggleableComponent = function(config) {
    this.activeImage = null;
    this.inactiveImage = null;
    this.deflection = new math.Vector(0.1, 0.1);
    if (config !== undefined) {
      if (config.activeImage !== undefined) {
        this.activeImage = config.activeImage;
      }
      if (config.inactiveImage !== undefined) {
        this.inactiveImage = config.inactiveImage;
      }
      if (config.deflection !== undefined) {
        this.deflection = config.deflection;
      }
    }
  };


  ns.ShouldDestroyComponent = function() {
  };


  ns.ShouldNotDestroyComponent = function() {
  };


  ns.TimerDestroyComponent = function(config) {
    this.timeout = 10.0;
    if (config !== undefined) {
      if (config.timeout !== undefined) {
        this.timeout = config.timeout;
      }
    }
  };


  ns.DestroyOnExplodeComponent = function() {
  };


  ns.ExplodeOnDestroyComponent = function(config) {
    this.explosionRadius = 100.0;
    if (config !== undefined) {
      if (config.explosionRadius !==undefined) {
        this.explosionRadius = config.explosionRadius;
      }
    }
  };

})(window.game = window.game || {});
