import CollisionEvaluator from '../collision/Evaluator';
import CollisionEvent from '../event/Collision';
import Vector from '../../math/Vector';

const MaxSpeed = 1000.0;
const StepRatio = 0.25;

class Motion {
  constructor(manager) {
    this.manager = manager;
    this.gravity = new Vector();
    this.collisionEvaluator = new CollisionEvaluator();
  }

  update(elapsedSeconds) {
    const entities = this.manager.filterEntities(['location', 'motion']);
    for (const entity of entities) {
      this.moveEntity(entity, elapsedSeconds);
    }
  }

  moveEntity(entity, elapsedSeconds) {
    const locationComp = entity.getComponent('location');
    const motionComp = entity.getComponent('motion');

    const speedDelta = this.gravity.mul(elapsedSeconds);
    const oldSpeed = motionComp.speed;
    let newSpeed = oldSpeed.inc(speedDelta);
    if (newSpeed.squaredLength > MaxSpeed * MaxSpeed) {
      newSpeed = newSpeed.resize(MaxSpeed);
    }
    const deltaLocation = oldSpeed.inc(newSpeed).mul(elapsedSeconds * 0.5);
    const oldLocation = locationComp.location;
    const newLocation = oldLocation.inc(deltaLocation);

    if (entity.hasComponent('collision')) {
      // Move a fraction of the smallest dimension of the shape
      const collisionComp = entity.getComponent('collision');
      const stepSize = StepRatio * collisionComp.shape.closestPointDistance;
      if (deltaLocation.squaredLength > stepSize * stepSize) {
        // We have moved way too much for a proper collision detection.
        // Do a two separate half-time moves instead.
        this.moveEntity(entity, elapsedSeconds / 2.0);
        this.moveEntity(entity, elapsedSeconds / 2.0);
        return;
      }
    }

    motionComp.speed = newSpeed;
    locationComp.location = newLocation;

    if (entity.hasComponent('collision')) {
      this.checkEntityCollision(entity);
    }
  }

  checkEntityCollision(entity) {
    const entities = this.manager.filterEntities(['location', 'collision']);
    for (const staticEntity of entities) {
      if (staticEntity !== entity) {
        this.checkCollisionBetween(staticEntity, entity);
      }
    }
  }

  checkCollisionBetween(staticEntity, movingEntity) {
    const vector = this.collisionEvaluator.getEscapeVector(
      staticEntity,
      movingEntity
    );
    if (vector == null) {
      return;
    }
    if (staticEntity.hasComponent('motion')) {
      return;
    }

    const movingLocationComp = movingEntity.getComponent('location');
    movingLocationComp.location.x += vector.x;
    movingLocationComp.location.y += vector.y;

    const movingMotionComp = movingEntity.getComponent('motion');
    const staticCollisionComp = staticEntity.getComponent('collision');
    const movingCollisionComp = movingEntity.getComponent('collision');

    const totalDeflection =
      staticCollisionComp.deflection * movingCollisionComp.deflection;
    const totalFriction =
      staticCollisionComp.friction * movingCollisionComp.friction;

    const collisionNormal = vector.resize(1.0);
    const penetrationVector = collisionNormal.mul(
      collisionNormal.dot(movingMotionComp.speed)
    );

    let slideVector = movingMotionComp.speed.dec(penetrationVector);
    slideVector = slideVector.mul(Math.max(1.0 - totalFriction, 0.0));

    let bounceVector = penetrationVector.mul(-1.0);
    bounceVector = bounceVector.mul(totalDeflection);

    movingMotionComp.speed = bounceVector.inc(slideVector);

    movingEntity.throwEvent(
      new CollisionEvent({
        obstacle: staticEntity,
        collisionNormal: new Vector(collisionNormal),
      })
    );
    staticEntity.throwEvent(
      new CollisionEvent({
        obstacle: movingEntity,
        collisionNormal: collisionNormal.mul(-1.0),
      })
    );
  }
}

export default Motion;
