import CollisionEvent from '../event/Collision';
import Vector from '../../math/Vector';

class BounceToggleable {
  constructor(manager) {
    this.manager = manager;
    this.manager.subscribe(
      ['location', 'collision', 'bounceToggleable'],
      (entity, event) => {
        this.onEntityEvent(entity, event);
      }
    );
    this.toggled = false;
  }

  get isToggled() {
    return this.toggled;
  }

  setToggled(toggled) {
    this.toggled = toggled;
  }

  update(elapsedSeconds) {
    const entities = this.manager.filterEntities([
      'sprite',
      'bounceToggleable',
    ]);
    for (const entity of entities) {
      this.updateEntityImage(entity);
    }
  }

  updateEntityImage(entity) {
    const spriteComp = entity.getComponent('sprite');
    const bounceToggleableComp = entity.getComponent('bounceToggleable');
    if (this.isToggled) {
      spriteComp.image = bounceToggleableComp.activeImage;
    } else {
      spriteComp.image = bounceToggleableComp.inactiveImage;
    }
  }

  onEntityEvent(entity, event) {
    if (event instanceof CollisionEvent) {
      this.onEntityCollision(entity, event);
    }
  }

  onEntityCollision(entity, collisionEvent) {
    const otherEntity = collisionEvent.obstacle;
    if (
      !otherEntity.hasComponent('location') ||
      !otherEntity.hasComponent('motion')
    ) {
      return;
    }
    const locationComp = entity.getComponent('location');
    const bounceToggleableComp = entity.getComponent('bounceToggleable');
    const deflection = bounceToggleableComp.deflection;

    const otherLocationComp = otherEntity.getComponent('location');
    const otherMotionComp = otherEntity.getComponent('motion');

    const delta = otherLocationComp.location.dec(locationComp.location);
    const deltaSpeed = new Vector();
    deltaSpeed.x = delta.x * deflection.x;
    deltaSpeed.y = delta.y * deflection.y;
    if (!this.isToggled) {
      deltaSpeed.y = 0.0;
    }
    otherMotionComp.speed = otherMotionComp.speed.inc(deltaSpeed);
  }
}

export default BounceToggleable;
