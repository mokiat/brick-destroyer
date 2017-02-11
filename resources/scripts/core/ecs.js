(function(ns, undefined) {

  ns.Entity = function(manager, id) {
    this.manager = manager;
    this.id = id;
    this.components = {};
    this.destroyed = false;
  };

  ns.Entity.prototype.addComponent = function(type, component) {
    this.components[type] = component;
  };

  ns.Entity.prototype.removeComponent = function(type) {
    delete this.components[type];
  };

  ns.Entity.prototype.getComponent = function(type) {
    return this.components[type];
  };

  ns.Entity.prototype.hasComponent = function(type) {
    return !!this.components[type];
  };

  ns.Entity.prototype.hasComponents = function(types) {
    for (var i = 0; i < types.length; i++) {
      var type = types[i];
      if (!this.hasComponent(type)) {
        return false;
      }
    }
    return true;
  };

  ns.Entity.prototype.throwEvent = function(event) {
    this.manager.notify(this, event);
  };

  ns.Entity.prototype.isDestroyed = function() {
    return this.destroyed;
  };

  ns.Entity.prototype.destroy = function() {
    if (this.isDestroyed()) {
      return;
    }
    this.destroyed = true;
    this.manager.deleteEntity(this);
    this.throwEvent(new ns.DestroyedEvent());
  };


  ns.Event = function() {
  };


  ns.DestroyedEvent = function() {
    ns.Event.call(this);
  };

  ns.DestroyedEvent.prototype = Object.create(ns.Event.prototype);


  ns.System = function() {
  };

  ns.System.prototype.update = function(elapsedSeconds) {
  };

  ns.EntityManager = function() {
    this.entityIdCounter = 0;
    this.entities = {};
    this.systems = [];
    this.subscriptions = [];
  };

  ns.EntityManager.prototype.createEntity = function() {
    var id = this.entityIdCounter;
    this.entityIdCounter++;
    var entity = new ecs.Entity(this, id);
    this.entities[id] = entity;
    return entity;
  };

  ns.EntityManager.prototype.deleteEntity = function(entity) {
    delete this.entities[entity.id];
  };

  ns.EntityManager.prototype.deleteAllEntities = function() {
    this.entities = {};
  };

  ns.EntityManager.prototype.listEntities = function() {
    var result = [];
    for (var id in this.entities) {
      result.push(this.entities[id]);
    }
    return result;
  };

  ns.EntityManager.prototype.filterEntities = function(requiredTypes) {
    var result = [];
    for (var id in this.entities) {
      var entity = this.entities[id];
      if (entity.hasComponents(requiredTypes)) {
        result.push(entity);
      }
    }
    return result;
  };

  ns.EntityManager.prototype.addSystem = function(system) {
    this.systems.push(system);
  };

  ns.EntityManager.prototype.subscribe = function(types, callback) {
    this.subscriptions.push({
      callback: callback,
      requiredTypes: types
    });
  };

  ns.EntityManager.prototype.unsubscribe = function(callback) {
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
  };

  ns.EntityManager.prototype.notify = function(entity, event) {
    for (var i = 0; i < this.subscriptions.length; i++) {
      var subscription = this.subscriptions[i];
      if (entity.hasComponents(subscription.requiredTypes)) {
        subscription.callback(entity, event);
      }
    }
  };

  ns.EntityManager.prototype.update = function(elapsedSeconds) {
    for (var i = 0; i < this.systems.length; i++) {
      this.systems[i].update(elapsedSeconds);
    }
  };

})(window.ecs = window.ecs || {});
