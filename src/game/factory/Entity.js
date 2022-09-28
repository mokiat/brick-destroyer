import LocationComponent from '../component/Location';
import MotionComponent from '../component/Motion';
import CollisionComponent from '../component/Collision';
import SpriteComponent from '../component/Sprite';
import MouseBoundComponent from '../component/MouseBound';
import LocationBoundComponent from '../component/LocationBound';
import DestroyOnHitComponent from '../component/DestroyOnHit';
import SpawnOnDestroyComponent from '../component/SpawnOnDestroy';
import BounceToggleableComponent from '../component/BounceToggleable';
import ShouldDestroyComponent from '../component/ShouldDestroy';
import ShouldNotDestroyComponent from '../component/ShouldNotDestroy';
import TimerDestroyComponent from '../component/TimerDestroy';
import DestroyOnExplodeComponent from '../component/DestroyOnExplode';
import ExplodeOnDestroyComponent from '../component/ExplodeOnDestroy';
import Circle from '../../shape/Circle';
import Rectangle from '../../shape/Rectangle';

class EntityFactory {
  constructor(manager, resourceCollection) {
    this.manager = manager;
    this.resourceCollection = resourceCollection;
  }

  createEntity(definition) {
    const entity = this.manager.createEntity();
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
  }

  applyLocation(entity, locationData) {
    const component = new LocationComponent();
    if (locationData.x !== undefined) {
      component.location.x = locationData.x;
    }
    if (locationData.y !== undefined) {
      component.location.y = locationData.y;
    }
    entity.addComponent('location', component);
  }

  applyMotion(entity, motionData) {
    const component = new MotionComponent();
    if (motionData.speed !== undefined) {
      if (motionData.speed.x !== undefined) {
        component.speed.x = motionData.speed.x;
      }
      if (motionData.speed.y !== undefined) {
        component.speed.y = motionData.speed.y;
      }
    }
    entity.addComponent('motion', component);
  }

  applyCollision(entity, collisionData) {
    const component = new CollisionComponent();
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
      this.applyCollisionRectangleShape(
        component,
        collisionData.shape_rectangle
      );
    }
    entity.addComponent('collision', component);
  }

  applyCollisionCircleShape(component, shapeData) {
    const shape = new Circle();
    if (shapeData.radius !== undefined) {
      shape.radius = shapeData.radius;
    }
    component.shape = shape;
  }

  applyCollisionRectangleShape(component, shapeData) {
    const shape = new Rectangle();
    if (shapeData.width !== undefined) {
      shape.width = shapeData.width;
    }
    if (shapeData.height !== undefined) {
      shape.height = shapeData.height;
    }
    component.shape = shape;
  }

  applySprite(entity, spriteData) {
    const component = new SpriteComponent();
    if (spriteData.width !== undefined) {
      component.width = spriteData.width;
    }
    if (spriteData.height !== undefined) {
      component.height = spriteData.height;
    }
    if (spriteData.image !== undefined) {
      component.image = this.resourceCollection.find(spriteData.image);
    }
    entity.addComponent('sprite', component);
  }

  applyMouseBound(entity, mouseBoundData) {
    const component = new MouseBoundComponent();
    if (mouseBoundData.axisX !== undefined) {
      component.axisXBound = mouseBoundData.axisX;
    }
    if (mouseBoundData.axisY !== undefined) {
      component.axisYBound = mouseBoundData.axisY;
    }
    entity.addComponent('mouseBound', component);
  }

  applyLocationBound(entity, locationBoundData) {
    const component = new LocationBoundComponent();
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
    entity.addComponent('locationBound', component);
  }

  applyDestroyOnHit(entity, destroyOnHitData) {
    const component = new DestroyOnHitComponent();
    entity.addComponent('destroyOnHit', component);
  }

  applySpawnOnDestroy(entity, spawnOnDestroyData) {
    const component = new SpawnOnDestroyComponent();
    if (spawnOnDestroyData.definition !== undefined) {
      component.definition = spawnOnDestroyData.definition;
    }
    entity.addComponent('spawnOnDestroy', component);
  }

  applyBounceToggleable(entity, bounceToggleableData) {
    const component = new BounceToggleableComponent();
    if (bounceToggleableData.activeImage !== undefined) {
      component.activeImage = this.resourceCollection.find(
        bounceToggleableData.activeImage
      );
    }
    if (bounceToggleableData.inactiveImage !== undefined) {
      component.inactiveImage = this.resourceCollection.find(
        bounceToggleableData.inactiveImage
      );
    }
    if (bounceToggleableData.deflection !== undefined) {
      const deflection = bounceToggleableData.deflection;
      if (deflection.x !== undefined) {
        component.deflection.x = deflection.x;
      }
      if (deflection.y !== undefined) {
        component.deflection.y = deflection.y;
      }
    }
    entity.addComponent('bounceToggleable', component);
  }

  applyShouldDestroy(entity, shouldDestroyData) {
    const component = new ShouldDestroyComponent();
    entity.addComponent('shouldDestroy', component);
  }

  applyShouldNotDestroy(entity, shouldNotDestroyData) {
    const component = new ShouldNotDestroyComponent();
    entity.addComponent('shouldNotDestroy', component);
  }

  applyTimerDestroy(entity, timerDestroyData) {
    const component = new TimerDestroyComponent();
    if (timerDestroyData.timeout !== undefined) {
      component.timeout = timerDestroyData.timeout;
    }
    entity.addComponent('timerDestroy', component);
  }

  applyDestroyOnExplode(entity, destroyOnExplodeData) {
    const component = new DestroyOnExplodeComponent();
    entity.addComponent('destroyOnExplode', component);
  }

  applyExplodeOnDestroy = function (entity, explodeOnDestroyData) {
    const component = new ExplodeOnDestroyComponent();
    if (explodeOnDestroyData.explosionRadius !== undefined) {
      component.explosionRadius = explodeOnDestroyData.explosionRadius;
    }
    entity.addComponent('explodeOnDestroy', component);
  };
}

export default EntityFactory;
