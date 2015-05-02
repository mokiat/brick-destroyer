describe("DefeatSystem", function() {
  var manager;
  var system;
  var entity;

  beforeEach(function() {
    manager = new brickdest.ecs.EntityManager();
    system = new brickdest.ecs.DefeatSystem(manager);

    entity = manager.createEntity();
    entity.addComponent("shouldNotDestroy", new brickdest.ecs.ShouldNotDestroyComponent());
  });

  it("system is not triggered by default", function() {
    expect(system.isTriggered()).toBeFalsy();
  });

  describe("when an entity that should not be destroyed is destroyed", function() {
    beforeEach(function() {
      entity.destroy();
    });

    it("the system is triggered", function() {
      expect(system.isTriggered()).toBeTruthy();
    });

    describe("when the system is reset", function() {
      beforeEach(function() {
        system.reset();
      });

      it("the system is no longer triggered", function() {
        expect(system.isTriggered()).toBeFalsy();
      });
    });
  });
});
