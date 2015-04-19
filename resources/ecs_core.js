oop.namespace("brickdest.ecs");

brickdest.ecs.EntityManager = oop.class({
  __create__: function() {
    this.entityIdCounter = 0;
    this.entities = {};
    this.systems = [];
  },
  createEntity: function() {
    var id = this.entityIdCounter;
    this.entityIdCounter++;
    var entity = new brickdest.ecs.Entity(id)
    this.entities[id] = entity;
    return entity;
  },
  deleteEntity: function(entity) {
    delete this.entities[entity.id];
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
  update: function(elapsedSeconds) {
    for (var i = 0; i < this.systems.length; i++) {
      this.systems[i].update(elapsedSeconds);
    }
  }
});

brickdest.ecs.Entity = oop.class({
  id: null,
  __create__: function(id) {
    this.id = id;
    this.components = {};
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
  }
});

brickdest.ecs.ISystem = oop.interface({
  update: function(elapsedTime) {}
});
