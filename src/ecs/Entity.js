import DestroyedEvent from './DestroyedEvent';

class Entity {
  constructor(manager, id) {
    this.manager = manager;
    this.id = id;
    this.components = {};
    this.destroyed = false;
  }

  get isDestroyed() {
    return this.destroyed;
  }

  addComponent(type, component) {
    this.components[type] = component;
  }

  removeComponent(type) {
    delete this.components[type];
  }

  getComponent(type) {
    return this.components[type];
  }

  hasComponent(type) {
    return !!this.components[type];
  }

  hasComponents(types) {
    for (const type of types) {
      if (!this.hasComponent(type)) {
        return false;
      }
    }
    return true;
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      this.manager.deleteEntity(this);
      this.throwEvent(new DestroyedEvent());
    }
  }

  throwEvent(event) {
    this.manager.notify(this, event);
  }
}

export default Entity;
