oop.namespace("brickdest.ecs");

brickdest.ecs.EntityManager = oop.class({
  __create__: function() {
    this.entityIdCounter = 0;
    this.entities = {};
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
  }
});
