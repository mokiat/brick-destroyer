describe("ExplosionSystem", function() {
  var manager;
  var system;
  var explodeEntity;
  var insideRangeEntity;
  var outsideRangeEntity;

  beforeEach(function() {
    manager = new ecs.EntityManager();
    system = new game.ExplosionSystem(manager);

    explodeEntity = manager.createEntity();
    explodeEntity.addComponent("location", new game.LocationComponent());
    explodeEntity.addComponent("explodeOnDestroy", new game.ExplodeOnDestroyComponent({
      explosionRadius: 100.0
    }));

    insideRangeEntity = manager.createEntity();
    insideRangeEntity.addComponent("location", new game.LocationComponent({
      location: new math.Vector(99.0, 0.0)
    }));
    insideRangeEntity.addComponent("destroyOnExplode", new game.DestroyOnExplodeComponent());

    outsideRangeEntity = manager.createEntity();
    outsideRangeEntity.addComponent("location", new game.LocationComponent({
      location: new math.Vector(-101.0, 0.0)
    }));
    outsideRangeEntity.addComponent("destroyOnExplode", new game.DestroyOnExplodeComponent());
  });

  describe("when the explodable entity is destroyed", function() {
    beforeEach(function() {
      explodeEntity.destroy();
    });

    it("the entity inside range is destroyed", function() {
      expect(insideRangeEntity.isDestroyed()).toBeTruthy();
    });

    it("the entity outside range is destroyed", function() {
      expect(outsideRangeEntity.isDestroyed()).toBeFalsy();
    });
  });
});
