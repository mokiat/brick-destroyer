(function(ns, undefined) {

  ns.EntityFactory = function(manager, resourceCollection) {
    this.manager = manager;
    this.resourceCollection = resourceCollection;
  };

  ns.EntityFactory.prototype.createEntity = function(definition) {
    var entity = this.manager.createEntity();
    if (definition.location !== undefined) {
      this.applyLocation(entity, definition.location);
    }
    if (definition.motion !== undefined) {
      this.applyMotion(entity, definition.motion);
    }
    if (definition.collision !== undefined) {
      this.applyCollision(entity, definition.collision);
    }
    if (definition.sprite !== undefined) {
      this.applySprite(entity, definition.sprite);
    }
    if (definition.mouseBound !== undefined) {
      this.applyMouseBound(entity, definition.mouseBound);
    }
    if (definition.locationBound !== undefined) {
      this.applyLocationBound(entity, definition.locationBound);
    }
    if (definition.destroyOnHit !== undefined) {
      this.applyDestroyOnHit(entity, definition.destroyOnHit);
    }
    if (definition.spawnOnDestroy !== undefined) {
      this.applySpawnOnDestroy(entity, definition.spawnOnDestroy);
    }
    if (definition.bounceToggleable !== undefined) {
      this.applyBounceToggleable(entity, definition.bounceToggleable);
    }
    if (definition.shouldDestroy !== undefined) {
      this.applyShouldDestroy(entity, definition.shouldDestroy);
    }
    if (definition.shouldNotDestroy !== undefined) {
      this.applyShouldNotDestroy(entity, definition.shouldNotDestroy);
    }
    if (definition.timerDestroy !== undefined) {
      this.applyTimerDestroy(entity, definition.timerDestroy);
    }
    if (definition.destroyOnExplode !== undefined) {
      this.applyDestroyOnExplode(entity, definition.destroyOnExplode);
    }
    if (definition.explodeOnDestroy !== undefined) {
      this.applyExplodeOnDestroy(entity, definition.explodeOnDestroy);
    }
    return entity;
  };

  ns.EntityFactory.prototype.applyLocation = function(entity, locationData) {
    var component = new game.LocationComponent();
    if (locationData.x !== undefined) {
      component.location.x = locationData.x;
    }
    if (locationData.y !== undefined) {
      component.location.y = locationData.y;
    }
    entity.addComponent("location", component);
  };

  ns.EntityFactory.prototype.applyMotion = function(entity, motionData) {
    var component = new game.MotionComponent();
    if (motionData.speed !== undefined) {
      if (motionData.speed.x !== undefined) {
        component.speed.x = motionData.speed.x;
      }
      if (motionData.speed.y !== undefined) {
        component.speed.y = motionData.speed.y;
      }
    }
    entity.addComponent("motion", component);
  };

  ns.EntityFactory.prototype.applyCollision = function(entity, collisionData) {
    var component = new game.CollisionComponent();
    if (collisionData.deflection !== undefined) {
      component.deflection = collisionData.deflection;
    }
    if (collisionData.friction !== undefined) {
      component.friction = collisionData.friction;
    }
    if (collisionData.mass !== undefined) {
      component.mass = collisionData.mass;
    }
    if (collisionData.shape_circle !== undefined) {
      this.applyCollisionCircleShape(component, collisionData.shape_circle);
    }
    if (collisionData.shape_rectangle !== undefined) {
      this.applyCollisionRectangleShape(component, collisionData.shape_rectangle);
    }
    entity.addComponent("collision", component);
  };

  ns.EntityFactory.prototype.applyCollisionCircleShape = function(component, shapeData) {
    var shape = new shapes.Circle();
    if (shapeData.radius !== undefined) {
      shape.radius = shapeData.radius;
    }
    component.shape = shape;
  };

  ns.EntityFactory.prototype.applyCollisionRectangleShape = function(component, shapeData) {
    var shape = new shapes.Rectangle();
    if (shapeData.width !== undefined) {
      shape.width = shapeData.width;
    }
    if (shapeData.height !== undefined) {
      shape.height = shapeData.height;
    }
    component.shape = shape;
  };

  ns.EntityFactory.prototype.applySprite = function(entity, spriteData) {
    var component = new game.SpriteComponent();
    if (spriteData.width !== undefined) {
      component.width = spriteData.width;
    }
    if (spriteData.height !== undefined) {
      component.height = spriteData.height;
    }
    if (spriteData.image !== undefined) {
      component.image = this.resourceCollection.find(spriteData.image);
    }
    entity.addComponent("sprite", component);
  };

  ns.EntityFactory.prototype.applyMouseBound = function(entity, mouseBoundData) {
    var component = new game.MouseBoundComponent();
    if (mouseBoundData.axisX !== undefined) {
      component.axisXBound = mouseBoundData.axisX;
    }
    if (mouseBoundData.axisY !== undefined) {
      component.axisYBound = mouseBoundData.axisY;
    }
    entity.addComponent("mouseBound", component);
  };

  ns.EntityFactory.prototype.applyLocationBound = function(entity, locationBoundData) {
    var component = new game.LocationBoundComponent();
    if (locationBoundData.minX !== undefined) {
      component.minX = locationBoundData.minX;
    }
    if (locationBoundData.maxX !== undefined) {
      component.maxX = locationBoundData.maxX;
    }
    if (locationBoundData.minY !== undefined) {
      component.minY = locationBoundData.minY;
    }
    if (locationBoundData.maxY !== undefined) {
      component.maxY = locationBoundData.maxY;
    }
    entity.addComponent("locationBound", component);
  };

  ns.EntityFactory.prototype.applyDestroyOnHit = function(entity, destroyOnHitData) {
    var component = new game.DestroyOnHitComponent();
    entity.addComponent("destroyOnHit", component);
  };

  ns.EntityFactory.prototype.applySpawnOnDestroy = function(entity, spawnOnDestroyData) {
    var component = new game.SpawnOnDestroyComponent();
    if (spawnOnDestroyData.definition !== undefined) {
      component.definition = spawnOnDestroyData.definition;
    }
    entity.addComponent("spawnOnDestroy", component);
  };

  ns.EntityFactory.prototype.applyBounceToggleable = function(entity, bounceToggleableData) {
    var component = new game.BounceToggleableComponent();
    if (bounceToggleableData.activeImage !== undefined) {
      component.activeImage = this.resourceCollection.find(bounceToggleableData.activeImage);
    }
    if (bounceToggleableData.inactiveImage !== undefined) {
      component.inactiveImage = this.resourceCollection.find(bounceToggleableData.inactiveImage);
    }
    if (bounceToggleableData.deflection !== undefined) {
      var deflection = bounceToggleableData.deflection;
      if (deflection.x !== undefined) {
        component.deflection.x = deflection.x;
      }
      if (deflection.y !== undefined) {
        component.deflection.y = deflection.y;
      }
    }
    entity.addComponent("bounceToggleable", component);
  };

  ns.EntityFactory.prototype.applyShouldDestroy = function(entity, shouldDestroyData) {
    var component = new game.ShouldDestroyComponent();
    entity.addComponent("shouldDestroy", component);
  };

  ns.EntityFactory.prototype.applyShouldNotDestroy = function(entity, shouldNotDestroyData) {
    var component = new game.ShouldNotDestroyComponent();
    entity.addComponent("shouldNotDestroy", component);
  };

  ns.EntityFactory.prototype.applyTimerDestroy = function(entity, timerDestroyData) {
    var component = new game.TimerDestroyComponent();
    if (timerDestroyData.timeout !== undefined) {
      component.timeout = timerDestroyData.timeout;
    }
    entity.addComponent("timerDestroy", component);
  };

  ns.EntityFactory.prototype.applyDestroyOnExplode = function(entity, destroyOnExplodeData) {
    var component = new game.DestroyOnExplodeComponent();
    entity.addComponent("destroyOnExplode", component);
  };

  ns.EntityFactory.prototype.applyExplodeOnDestroy = function(entity, explodeOnDestroyData) {
    var component = new game.ExplodeOnDestroyComponent();
    if (explodeOnDestroyData.explosionRadius !== undefined) {
      component.explosionRadius = explodeOnDestroyData.explosionRadius;
    }
    entity.addComponent("explodeOnDestroy", component);
  };


  ns.LevelFactory = function(entityFactory, resourceCollection) {
    this.entityFactory = entityFactory;
    this.resourceCollection = resourceCollection;
  };

  ns.LevelFactory.prototype.applyLevel = function(level) {
    var images = this.getImagesFromLevel(level);
    for (var name in images) {
      var path = images[name];
      var image = new graphics.Image(path);
      this.resourceCollection.register(name, image);
    }

    var types = this.getTypesFromLevel(level);
    for (var name in types) {
      var typeDefinition = types[name];
      types[name] = this.expandDefinition(typeDefinition, types);
    }

    var entities = this.getEntitiesFromLevel(level);
    for (var index in entities) {
      var entityDefinition = entities[index];
      entityDefinition = this.expandDefinition(entityDefinition, types);
      this.entityFactory.createEntity(entityDefinition);
    }
  };

  ns.LevelFactory.prototype.getImagesFromLevel = function(level) {
    if (level.images == undefined) {
      return {}
    }
    return level.images;
  };

  ns.LevelFactory.prototype.getTypesFromLevel = function(level) {
    if (level.types == undefined) {
      return {}
    }
    return level.types;
  };

  ns.LevelFactory.prototype.getEntitiesFromLevel = function(level) {
    if (level.entities == undefined) {
      return [];
    }
    return level.entities;
  };

  ns.LevelFactory.prototype.expandDefinition = function(definition, types) {
    var resultDefinition = {};
    if (definition.types !== undefined) {
      for (var j = 0; j < definition.types.length; j++) {
        var typeName = definition.types[j];
        $.extend(true, resultDefinition, types[typeName]);
      }
    }
    $.extend(true, resultDefinition, definition);
    for (var key in resultDefinition) {
      var property = resultDefinition[key];
      if (typeof property === 'object') {
        resultDefinition[key] = this.expandDefinition(property, types);
      }
    }
    if (resultDefinition.types !== undefined) {
      delete resultDefinition['types'];
    }
    return resultDefinition;
  };

})(window.game = window.game || {});
