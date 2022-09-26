import Entity from './Entity';

class Manager {
  constructor() {
    this.entityIdCounter = 0;
    this.entities = {};
    this.systems = [];
    this.subscriptions = [];
  }

  createEntity() {
    const id = this.entityIdCounter;
    this.entityIdCounter++;
    const entity = new Entity(this, id);
    this.entities[id] = entity;
    return entity;
  }

  deleteEntity(entity) {
    delete this.entities[entity.id];
  }

  deleteAllEntities() {
    this.entities = {};
  }

  listEntities() {
    let result = [];
    for (let id in this.entities) {
      result.push(this.entities[id]);
    }
    return result;
  }

  filterEntities(types) {
    let result = [];
    for (let id in this.entities) {
      const entity = this.entities[id];
      if (entity.hasComponents(types)) {
        result.push(entity);
      }
    }
    return result;
  }

  subscribe(types, callback) {
    this.subscriptions.push({
      callback: callback,
      requiredTypes: types,
    });
  }

  unsubscribe(callback) {
    const listenerIndex = this.subscriptions.findIndex(
      (s) => s.callback === callback
    );
    if (listenerIndex !== -1) {
      this.subscriptions.splice(listenerIndex, 1);
    }
  }

  notify(entity, event) {
    for (let subscription of this.subscriptions) {
      if (entity.hasComponents(subscription.requiredTypes)) {
        subscription.callback(entity, event);
      }
    }
  }

  addSystem(system) {
    this.systems.push(system);
  }

  update(elapsedSeconds) {
    for (let system of this.systems) {
      system.update(elapsedSeconds);
    }
  }
}

export default Manager;
