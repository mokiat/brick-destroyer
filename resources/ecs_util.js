oop.namespace("brickdest.ecs");

brickdest.ecs.IEntityFactory = oop.interface({
  createEntity: function(definition) {}
});

brickdest.ecs.EntityFactory = oop.class({
  __create__: function(manager, resourceCollection) {
    this.manager = manager;
    this.resourceCollection = resourceCollection;
  },
  createEntity: function(definition) {
    var entity = this.manager.createEntity();
    if (typeof definition.location !== 'undefined') {
      this.applyLocation(entity, definition.location);
    }
    if (typeof definition.motion !== 'undefined') {
      this.applyMotion(entity, definition.motion);
    }
    if (typeof definition.collision !== 'undefined') {
      this.applyCollision(entity, definition.collision);
    }
    if (typeof definition.sprite !== 'undefined') {
      this.applySprite(entity, definition.sprite);
    }
    if (typeof definition.mouseBound !== 'undefined') {
      this.applyMouseBound(entity, definition.mouseBound);
    }
    if (typeof definition.locationBound !== 'undefined') {
      this.applyLocationBound(entity, definition.locationBound);
    }
    if (typeof definition.destroyOnHit !== 'undefined') {
      this.applyDestroyOnHit(entity, definition.destroyOnHit);
    }
    if (typeof definition.spawnOnDestroy !== 'undefined') {
      this.applySpawnOnDestroy(entity, definition.spawnOnDestroy);
    }
    if (typeof definition.bounceTogglable !== 'undefined') {
      this.applyBounceTogglable(entity, definition.bounceTogglable);
    }
    if (typeof definition.shouldDestroy !== 'undefined') {
      this.applyShouldDestroy(entity, definition.shouldDestroy);
    }
    if (typeof definition.shouldNotDestroy !== 'undefined') {
      this.applyShouldNotDestroy(entity, definition.shouldNotDestroy);
    }
    return entity;
  },
  applyLocation: function(entity, locationData) {
    var component = new brickdest.ecs.LocationComponent();
    if (typeof locationData.x !== 'undefined') {
      component.location.x = locationData.x;
    }
    if (typeof locationData.y !== 'undefined') {
      component.location.y = locationData.y;
    }
    entity.addComponent("location", component);
  },
  applyMotion: function(entity, motionData) {
    var component = new brickdest.ecs.MotionComponent();
    if (typeof motionData.speed !== 'undefined') {
      if (typeof motionData.speed.x !== 'undefined') {
        component.speed.x = motionData.speed.x;
      }
      if (typeof motionData.speed.y !== 'undefined') {
        component.speed.y = motionData.speed.y;
      }
    }
    entity.addComponent("motion", component);
  },
  applyCollision: function(entity, collisionData) {
    var component = new brickdest.ecs.CollisionComponent();
    if (typeof collisionData.deflection !== 'undefined') {
      component.deflection = collisionData.deflection;
    }
    if (typeof collisionData.friction !== 'undefined') {
      component.friction = collisionData.friction;
    }
    if (typeof collisionData.mass !== 'undefined') {
      component.mass = collisionData.mass;
    }
    if (typeof collisionData.shape_circle !== 'undefined') {
      this.applyCollisionCircleShape(component, collisionData.shape_circle);
    }
    if (typeof collisionData.shape_rectangle !== 'undefined') {
      this.applyCollisionRectangleShape(component, collisionData.shape_rectangle);
    }
    entity.addComponent("collision", component);
  },
  applyCollisionCircleShape: function(component, shapeData) {
    var shape = new brickdest.shape.Circle();
    if (typeof shapeData.radius !== 'undefined') {
      shape.radius = shapeData.radius;
    }
    component.shape = shape;
  },
  applyCollisionRectangleShape: function(component, shapeData) {
    var shape = new brickdest.shape.Rectangle();
    if (typeof shapeData.width !== 'undefined') {
      shape.width = shapeData.width;
    }
    if (typeof shapeData.height !== 'undefined') {
      shape.height = shapeData.height;
    }
    component.shape = shape;
  },
  applySprite: function(entity, spriteData) {
    var component = new brickdest.ecs.SpriteComponent();
    if (typeof spriteData.width !== 'undefined') {
      component.width = spriteData.width;
    }
    if (typeof spriteData.height !== 'undefined') {
      component.height = spriteData.height;
    }
    if (typeof spriteData.image !== 'undefined') {
      component.image = this.resourceCollection.find(spriteData.image);
    }
    entity.addComponent("sprite", component);
  },
  applyMouseBound: function(entity, mouseBoundData) {
    var component = new brickdest.ecs.MouseBoundComponent();
    if (typeof mouseBoundData.axisX !== 'undefined') {
      component.axisXBound = mouseBoundData.axisX;
    }
    if (typeof mouseBoundData.axisY !== 'undefined') {
      component.axisYBound = mouseBoundData.axisY;
    }
    entity.addComponent("mouseBound", component);
  },
  applyLocationBound: function(entity, locationBoundData) {
    var component = new brickdest.ecs.LocationBoundComponent();
    if (typeof locationBoundData.minX !== 'undefined') {
      component.minX = locationBoundData.minX;
    }
    if (typeof locationBoundData.maxX !== 'undefined') {
      component.maxX = locationBoundData.maxX;
    }
    if (typeof locationBoundData.minY !== 'undefined') {
      component.minY = locationBoundData.minY;
    }
    if (typeof locationBoundData.maxY !== 'undefined') {
      component.maxY = locationBoundData.maxY;
    }
    entity.addComponent("locationBound", component);
  },
  applyDestroyOnHit: function(entity, destroyOnHitData) {
    var component = new brickdest.ecs.DestroyOnHitComponent();
    entity.addComponent("destroyOnHit", component);
  },
  applySpawnOnDestroy: function(entity, spawnOnDestoryData) {
    var component = new brickdest.ecs.SpawnOnDestroyComponent();
    if (typeof spawnOnDestoryData.definition !== 'undefined') {
      component.definition = spawnOnDestoryData.definition;
    }
    entity.addComponent("spawnOnDestroy", component);
  },
  applyBounceTogglable: function(entity, bounceTogglableData) {
    var component = new brickdest.ecs.BounceTogglableComponent();
    if (typeof bounceTogglableData.activeImage !== 'undefined') {
      component.activeImage = this.resourceCollection.find(bounceTogglableData.activeImage);
    }
    if (typeof bounceTogglableData.inactiveImage !== 'undefined') {
      component.inactiveImage = this.resourceCollection.find(bounceTogglableData.inactiveImage);
    }
    if (typeof bounceTogglableData.deflection !== 'undefined') {
      var deflection = bounceTogglableData.deflection;
      if (typeof deflection.x !== 'undefined') {
        component.deflection.x = deflection.x;
      }
      if (typeof deflection.y !== 'undefined') {
        component.deflection.y = deflection.y;
      }
    }
    entity.addComponent("bounceTogglable", component);
  },
  applyShouldDestroy: function(entity, shouldDestroyData) {
    var component = new brickdest.ecs.ShouldDestroyComponent();
    entity.addComponent("shouldDestroy", component);
  },
  applyShouldNotDestroy: function(entity, shouldNotDestroyData) {
    var component = new brickdest.ecs.ShouldNotDestroyComponent();
    entity.addComponent("shouldNotDestroy", component);
  }
});

brickdest.ecs.LevelFactory = oop.class({
  __create__: function(entityFactory, resourceCollection) {
    this.entityFactory = entityFactory;
    this.resourceCollection = resourceCollection;
  },
  applyLevel: function(level) {
    var images = this.getImagesFromLevel(level);
    for (var name in images) {
      var path = images[name];
      var image = new brickdest.graphics.Image(path);
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
  },
  getImagesFromLevel: function(level) {
    if (typeof level.images !== 'undefined') {
      return level.images;
    }
    return {}
  },
  getTypesFromLevel: function(level) {
    if (typeof level.types !== 'undefined') {
      return level.types;
    }
    return {}
  },
  getEntitiesFromLevel: function(level) {
    if (typeof level.entities !== 'undefined') {
      return level.entities;
    }
    return [];
  },
  expandDefinition: function(definition, types) {
    var resultDefinition = {};
    if (typeof definition.types !== 'undefined') {
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
    if (typeof resultDefinition.types !== 'undefined') {
      delete resultDefinition['types'];
    }
    return resultDefinition;
  }
});

brickdest.ecs.CollisionEvaluator = oop.class({
  getEscapeVector: function(staticEntity, candidateEntity) {
    if (this.areTooFar(staticEntity, candidateEntity)) {
      return null;
    }
    if (this.isCircle(staticEntity) && this.isCircle(candidateEntity)) {
      return this.getEscapeVectorCircleCircle(staticEntity, candidateEntity);
    }
    if (this.isRectangle(staticEntity) && this.isRectangle(candidateEntity)) {
      return this.getEscapeVectorRectangleRectangle(staticEntity, candidateEntity);
    }
    if (this.isRectangle(staticEntity) && this.isCircle(candidateEntity)) {
      return this.getEscapeVectorRectangleCircle(staticEntity, candidateEntity);
    }
    if (this.isCircle(staticEntity) && this.isRectangle(candidateEntity)) {
      return this.getEscapeVectorRectangleCircle(candidateEntity, staticEntity).mul(-1.0);
    }
    return null;
  },
  areTooFar: function(staticEntity, candidateEntity) {
    var staticLocationComp = staticEntity.getComponent("location");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var candidateLocationComp = candidateEntity.getComponent("location");
    var candidateCollisionComp = candidateEntity.getComponent("collision");
    var distance = candidateLocationComp.location.dec(staticLocationComp.location);
    var minCollisionDistance =
          staticCollisionComp.shape.getFurthestPointDistance() +
          candidateCollisionComp.shape.getFurthestPointDistance();
    return (distance.getLength() > minCollisionDistance);
  },
  getEscapeVectorCircleCircle: function(staticEntity, candidateEntity) {
    var staticLocationComp = staticEntity.getComponent("location");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var candidateLocationComp = candidateEntity.getComponent("location");
    var candidateCollisionComp = candidateEntity.getComponent("collision");
    var distance = candidateLocationComp.location.dec(staticLocationComp.location);
    var penetration =
          staticCollisionComp.shape.radius +
          candidateCollisionComp.shape.radius -
          distance.getLength();
    if (penetration < 0.0) {
      return null;
    }
    return distance.resize(penetration);
  },
  getEscapeVectorRectangleRectangle: function(staticEntity, candidateEntity) {
    var staticLocationComp = staticEntity.getComponent("location");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var candidateLocationComp = candidateEntity.getComponent("location");
    var candidateCollisionComp = candidateEntity.getComponent("collision");
    var staticLeft = staticLocationComp.location.x - staticCollisionComp.shape.getHalfWidth();
    var staticRight = staticLocationComp.location.x + staticCollisionComp.shape.getHalfWidth();
    var staticTop = staticLocationComp.location.y - staticCollisionComp.shape.getHalfHeight();
    var staticBottom = staticLocationComp.location.y + staticCollisionComp.shape.getHalfHeight();
    var candidateLeft = candidateLocationComp.location.x - candidateCollisionComp.shape.getHalfWidth();
    var candidateRight = candidateLocationComp.location.x + candidateCollisionComp.shape.getHalfWidth();
    var candidateTop = candidateLocationComp.location.y - candidateCollisionComp.shape.getHalfHeight();
    var candidateBottom = candidateLocationComp.location.y + candidateCollisionComp.shape.getHalfHeight();

    var horizontalEscape;
    var horizontalOverlap = (candidateLeft < staticRight) && (candidateRight > staticLeft);
    if (horizontalOverlap) {
      if (candidateLocationComp.location.x > staticLocationComp.location.x) {
        horizontalEscape = new brickdest.math.Vector(staticRight - candidateLeft, 0.0);
      } else {
        horizontalEscape = new brickdest.math.Vector(staticLeft - candidateRight, 0.0);
      }
    } else {
      return null;
    }

    var verticalEscape;
    var verticalOverlap = (candidateTop < staticBottom) && (candidateBottom > staticTop);
    if (verticalOverlap) {
      if (candidateLocationComp.location.y > staticLocationComp.location.y) {
        verticalEscape = new brickdest.math.Vector(0.0, staticBottom - candidateTop);
      } else {
        verticalEscape = new brickdest.math.Vector(0.0, staticTop - candidateBottom);
      }
    } else {
      return null;
    }

    if (verticalEscape.getSquaredLength() < horizontalEscape.getSquaredLength()) {
      return verticalEscape;
    } else {
      return horizontalEscape;
    }
  },
  getEscapeVectorRectangleCircle: function(staticEntity, candidateEntity) {
    var staticLocationComp = staticEntity.getComponent("location");
    var staticCollisionComp = staticEntity.getComponent("collision");
    var candidateLocationComp = candidateEntity.getComponent("location");
    var candidateCollisionComp = candidateEntity.getComponent("collision");
    var staticLeft = staticLocationComp.location.x - staticCollisionComp.shape.getHalfWidth();
    var staticRight = staticLocationComp.location.x + staticCollisionComp.shape.getHalfWidth();
    var staticTop = staticLocationComp.location.y - staticCollisionComp.shape.getHalfHeight();
    var staticBottom = staticLocationComp.location.y + staticCollisionComp.shape.getHalfHeight();
    var candidateLeft = candidateLocationComp.location.x - candidateCollisionComp.shape.radius;
    var candidateRight = candidateLocationComp.location.x + candidateCollisionComp.shape.radius;
    var candidateTop = candidateLocationComp.location.y - candidateCollisionComp.shape.radius;
    var candidateBottom = candidateLocationComp.location.y + candidateCollisionComp.shape.radius;

    var horizontalEscape;
    var horizontalOverlap = (candidateLeft < staticRight) && (candidateRight > staticLeft);
    if (horizontalOverlap) {
      if (candidateLocationComp.location.x > staticLocationComp.location.x) {
        horizontalEscape = new brickdest.math.Vector(staticRight - candidateLeft, 0.0);
      } else {
        horizontalEscape = new brickdest.math.Vector(staticLeft - candidateRight, 0.0);
      }
    } else {
      return null;
    }

    var verticalEscape;
    var verticalOverlap = (candidateTop < staticBottom) && (candidateBottom > staticTop);
    if (verticalOverlap) {
      if (candidateLocationComp.location.y > staticLocationComp.location.y) {
        verticalEscape = new brickdest.math.Vector(0.0, staticBottom - candidateTop);
      } else {
        verticalEscape = new brickdest.math.Vector(0.0, staticTop - candidateBottom);
      }
    } else {
      return null;
    }

    var cornerEscape;
    var cornerOverlapPossible =
          ((candidateLocationComp.location.x < staticLeft) || (candidateLocationComp.location.x > staticRight)) &&
          ((candidateLocationComp.location.y < staticTop) || (candidateLocationComp.location.y > staticBottom));
    if (cornerOverlapPossible) {
      var cornerDistance = new brickdest.math.Vector();
      if (candidateLocationComp.location.x < staticLeft) {
        cornerDistance.x = (candidateLocationComp.location.x - staticLeft);
      } else {
        cornerDistance.x = (candidateLocationComp.location.x - staticRight);
      }
      if (candidateLocationComp.location.y < staticTop) {
        cornerDistance.y = (candidateLocationComp.location.y - staticTop);
      } else {
        cornerDistance.y = (candidateLocationComp.location.y - staticBottom);
      }
      var distanceLength = cornerDistance.getLength();
      if (distanceLength > candidateCollisionComp.shape.radius) {
        return null;
      }
      return cornerDistance.resize(candidateCollisionComp.shape.radius - distanceLength);
    }

    if (verticalEscape.getSquaredLength() < horizontalEscape.getSquaredLength()) {
      return verticalEscape;
    } else {
      return horizontalEscape;
    }
  },
  isCircle: function(entity) {
    var collisionComp = entity.getComponent("collision");
    return (collisionComp.shape instanceof brickdest.shape.Circle);
  },
  isRectangle: function(entity) {
    var collisionComp = entity.getComponent("collision");
    return (collisionComp.shape instanceof brickdest.shape.Rectangle);
  }
});
