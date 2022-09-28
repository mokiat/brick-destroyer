import DestroyedEvent from '../event/Destroyed';

class SpawnOnDestroy {
  constructor(manager, entityFactory) {
    this.entityFactory = entityFactory;
    this.manager = manager;
    this.manager.subscribe(['location', 'spawnOnDestroy'], (entity, event) => {
      this.onEntityEvent(entity, event);
    });
  }

  onEntityEvent(entity, event) {
    if (event instanceof DestroyedEvent) {
      this.onEntityDestroyed(entity);
    }
  }

  onEntityDestroyed(entity) {
    const locationComp = entity.getComponent('location');
    const locationDef = {
      location: {
        x: locationComp.location.x,
        y: locationComp.location.y,
      },
    };
    const spawnComp = entity.getComponent('spawnOnDestroy');
    const definition = {
      ...spawnComp.definition,
      ...locationDef,
    };
    this.entityFactory.createEntity(definition);
  }
}

export default SpawnOnDestroy;
