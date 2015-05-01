describe("SpawnOnDestroyComponent", function() {
  var decimalPoints = 4;
  var manager;
  var system;
  var entity;

  beforeEach(function() {
    manager = new brickdest.ecs.EntityManager();
    var resourceCollection = new brickdest.resource.Collection();
    var entityFactory = new brickdest.ecs.EntityFactory(manager, resourceCollection);
    system = new brickdest.ecs.SpawnOnDestroySystem(manager, entityFactory);
    manager.addSystem(system);

    entity = manager.createEntity();
    entity.addComponent("location", new brickdest.ecs.LocationComponent({
      "location" : new brickdest.math.Vector(1.2, 3.4)
    }));
    entity.addComponent("spawnOnDestroy", new brickdest.ecs.SpawnOnDestroyComponent({
      "definition" : {
        "motion" : {
          "speed" : {
            "x" : 13.4,
            "y" : 45.1
          }
        }
      }
    }));
  });

  describe("when an entity is destroyed", function() {
    beforeEach(function() {
      entity.destroy();
    });

    function assertEntityLocation(entity, expectedX, expectedY) {
      var locationComp = entity.getComponent("location");
    }

    it("old entity is destroyed", function() {
      expect(entity.isDestroyed()).toBeTruthy();
    });

    it("an entity should have been created", function() {
      var entities = manager.listEntities();
      expect(entities.length).toEqual(1);
      var spawnedEntity = entities[0];
      expect(spawnedEntity).not.toEqual(entity);
      expect(spawnedEntity.isDestroyed()).toBeFalsy();
    });

    it("the spawned entity is old entity's location", function() {
      var spawnedEntity = manager.listEntities()[0];
      expect(spawnedEntity.hasComponent("location")).toBeTruthy();
      var locationComp = spawnedEntity.getComponent("location");
      expect(locationComp.location.x).toBeCloseTo(1.2, decimalPoints);
      expect(locationComp.location.y).toBeCloseTo(3.4, decimalPoints);
    });

    it("the spawned entity should have all of it's definition components", function() {
      var spawnedEntity = manager.listEntities()[0];
      expect(spawnedEntity.hasComponent("motion")).toBeTruthy();
      var motionComp = spawnedEntity.getComponent("motion");
      expect(motionComp.speed.x).toBeCloseTo(13.4, decimalPoints);
      expect(motionComp.speed.y).toBeCloseTo(45.1, decimalPoints);
    });
  });
});
