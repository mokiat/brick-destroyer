import DestroyedEvent from '../../ecs/DestroyedEvent';

class Defeat {
  constructor(manager) {
    this.manager = manager;
    this.manager.subscribe(['shouldNotDestroy'], (entity, event) => {
      this.onEntityEvent(entity, event);
    });
    this.triggered = false;
  }

  get isTriggered() {
    return this.triggered;
  }

  reset() {
    this.triggered = false;
  }

  onEntityEvent(entity, event) {
    if (event instanceof DestroyedEvent) {
      this.onEntityDestroyed(entity);
    }
  }

  onEntityDestroyed(entity) {
    this.triggered = true;
  }
}

export default Defeat;
