import DestroyedEvent from '../event/Destroyed';

class Explosion {
  constructor(manager) {
    this.manager = manager;
    this.manager.subscribe(
      ['location', 'explodeOnDestroy'],
      (entity, event) => {
        this.onEntityEvent(entity, event);
      }
    );
  }

  onEntityEvent(entity, event) {
    if (event instanceof DestroyedEvent) {
      this.onEntityDestroyed(entity);
    }
  }

  onEntityDestroyed(entity) {
    const locationComp = entity.getComponent('location');
    const explodeComp = entity.getComponent('explodeOnDestroy');
    const radius = explodeComp.explosionRadius;

    const potentialTargets = this.manager.filterEntities([
      'location',
      'destroyOnExplode',
    ]);
    for (let potentialTarget of potentialTargets) {
      if (potentialTarget === entity) {
        continue;
      }
      const potentialLocationComp = potentialTarget.getComponent('location');
      const delta = potentialLocationComp.location.dec(locationComp.location);
      if (delta.squaredLength < radius * radius) {
        potentialTarget.destroy();
      }
    }
  }
}

export default Explosion;
