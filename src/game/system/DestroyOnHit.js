import CollisionEvent from '../event/Collision';

class DestroyOnHit {
  constructor(manager) {
    manager.subscribe(['collision', 'destroyOnHit'], (entity, event) => {
      this.onEntityEvent(entity, event);
    });
  }

  onEntityEvent(entity, event) {
    if (event instanceof CollisionEvent) {
      this.onEntityCollision(entity);
    }
  }

  onEntityCollision(entity) {
    entity.destroy();
  }
}

export default DestroyOnHit;
