describe("VictorySystem", function() {
  var manager;
  var system;
  var firstEntity;
  var secondEntity;

  beforeEach(function() {
    manager = new ecs.EntityManager();
    system = new game.VictorySystem(manager);
    manager.addSystem(system);

    firstEntity = manager.createEntity();
    firstEntity.addComponent("shouldDestroy", new game.ShouldDestroyComponent());

    secondEntity = manager.createEntity();
    secondEntity.addComponent("shouldDestroy", new game.ShouldDestroyComponent());

    manager.update(1.0);
  });

  describe("when there are entities that should be destroyed", function() {
    it("the system is not triggered", function() {
      expect(system.isTriggered()).toBeFalsy();
    });
  });

  describe("when part of the entities that should be destroyed are left", function() {
    beforeEach(function() {
      firstEntity.destroy();
      manager.update(1.0);
    });

    it("the system is not triggered", function() {
      expect(system.isTriggered()).toBeFalsy();
    });
  });

  describe("when no entities that should be destroyed are left", function() {
    beforeEach(function() {
      firstEntity.destroy();
      secondEntity.destroy();
      manager.update(1.0);
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
