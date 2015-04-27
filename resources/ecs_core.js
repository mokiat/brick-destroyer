oop.namespace("brickdest.ecs");

brickdest.ecs.EntityManager = oop.class({
  __create__: function() {
    this.entityIdCounter = 0;
    this.entities = {};
    this.systems = [];
    this.subscriptions = [];
  },
  createEntity: function() {
    var id = this.entityIdCounter;
    this.entityIdCounter++;
    var entity = new brickdest.ecs.Entity(this, id);
    this.entities[id] = entity;
    return entity;
  },
  deleteEntity: function(entity) {
    delete this.entities[entity.id];
  },
  deleteAllEntities: function() {
    this.entities = {};
  },
  listEntities: function() {
    var result = [];
    for (var id in this.entities) {
      result.push(this.entities[id]);
    }
    return result;
  },
  filterEntities: function(requiredComponents) {
    var result = [];
    for (var id in this.entities) {
      var entity = this.entities[id];
      if (entity.hasComponents(requiredComponents)) {
        result.push(entity);
      }
    }
    return result;
  },
  addSystem: function(system) {
    this.systems.push(system);
  },
  subscribe: function(requiredComponents, callback) {
    this.subscriptions.push({
      callback: callback,
      requiredComponents: requiredComponents
    });
  },
  unsubscribe: function(callback) {
    var listenerIndex = -1;
    for (var i = 0; i < this.subscriptions.length; i++) {
      var subscription = this.subscriptions[i];
      if (subscription.callback === callback) {
        listenerIndex = i;
        break;
      }
    }
    if (listenerIndex != -1) {
      this.subscriptions.splice(i, 1);
    }
  },
  notify: function(entity, event) {
    for (var i = 0; i < this.subscriptions.length; i++) {
      var subscription = this.subscriptions[i];
      if (entity.hasComponents(subscription.requiredComponents)) {
        subscription.callback(entity, event);
      }
    }
  },
  update: function(elapsedSeconds) {
    for (var i = 0; i < this.systems.length; i++) {
      this.systems[i].update(elapsedSeconds);
    }
  }
});

brickdest.ecs.IEvent = oop.interface({
});

brickdest.ecs.Entity = oop.class({
  __create__: function(manager, id) {
    this.manager = manager;
    this.id = id;
    this.components = {};
    this.destroyed = false;
  },
  addComponent: function(type, component) {
    this.components[type] = component;
  },
  removeComponent: function(type) {
    delete this.components[type];
  },
  getComponent: function(type) {
    return this.components[type];
  },
  hasComponent: function(type) {
    return !!this.components[type];
  },
  hasComponents: function(listOfComponents) {
    for (var i = 0; i < listOfComponents.length; i++) {
      var type = listOfComponents[i];
      if (!this.hasComponent(type)) {
        return false;
      }
    }
    return true;
  },
  throwEvent: function(event) {
    this.manager.notify(this, event);
  },
  isDestroyed: function() {
    return this.destroyed;
  },
  destroy: function() {
    this.destroyed = true;
    this.manager.deleteEntity(this);
  }
});

brickdest.ecs.ISystem = oop.interface({
  update: function(elapsedTime) {}
});
