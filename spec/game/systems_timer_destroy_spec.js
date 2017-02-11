describe("TimerDestroySystem", function() {
  var decimalPoints = 4;
  var manager;
  var system;
  var entity;

  beforeEach(function() {
    manager = new ecs.EntityManager();
    system = new game.TimerDestroySystem(manager);
    manager.addSystem(system);

    entity = manager.createEntity();
    entity.addComponent("timerDestroy", new game.TimerDestroyComponent({
      timeout: 3.5
    }));
  });

  describe("when insufficient time has elapsed", function() {
    beforeEach(function() {
      manager.update(3.2);
    });

    it("the entity's timeout should have been updated", function() {
      var timerDestroyComp = entity.getComponent("timerDestroy");
      expect(timerDestroyComp.timeout).toBeCloseTo(0.3, decimalPoints);
    });

    it("the entity should not have been destroyed", function() {
      expect(entity.isDestroyed()).toBeFalsy();
    });
  });

  describe("when sufficient time has elapsed", function() {
    beforeEach(function() {
      manager.update(3.51);
    });

    it("the entity should have been destroyed", function() {
      expect(entity.isDestroyed()).toBeTruthy();
    });
  });
});
