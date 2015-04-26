describe("LocationBoundSystem", function() {
  var decimalPoints = 4;
  var manager;
  var system;
  var entity;

  beforeEach(function() {
    manager = new brickdest.ecs.EntityManager();
    system = new brickdest.ecs.LocationBoundSystem(manager);
    manager.addSystem(system);

    entity = manager.createEntity();
    entity.addComponent("location", new brickdest.ecs.LocationComponent());
    entity.addComponent("locationBound", new brickdest.ecs.LocationBoundComponent({
      minX: -1.0,
      maxX: 2.0,
      minY: -3.0,
      maxY: 4.0
    }));
  });

  function placeEntityAt(entity, x, y) {
    var locationComp = entity.getComponent("location");
    locationComp.location.x = x;
    locationComp.location.y = y;
  }

  function assertEntityLocation(entity, expectedX, expectedY) {
    var locationComp = entity.getComponent("location");
    expect(locationComp.location.x).toBeCloseTo(expectedX, decimalPoints);
    expect(locationComp.location.y).toBeCloseTo(expectedY, decimalPoints);
  }

  describe("when entity is inside bounds", function() {
    beforeEach(function() {
      manager.update(1.0);
    });

    it("entity should not have changed its location", function() {
      assertEntityLocation(entity, 0.0, 0.0);
    });
  });

  describe("when entity is outside min X", function() {
    beforeEach(function() {
      placeEntityAt(entity, -1.1, 0.0);
      manager.update(1.0);
    });

    it("entity should have changed its location to min X", function() {
      assertEntityLocation(entity, -1.0, 0.0);
    });
  });

  describe("when entity is outside max X", function() {
    beforeEach(function() {
      placeEntityAt(entity, 2.1, 0.0);
      manager.update(1.0);
    });

    it("entity should have changed its location to max X", function() {
      assertEntityLocation(entity, 2.0, 0.0);
    });
  });

  describe("when entity is outside min Y", function() {
    beforeEach(function() {
      placeEntityAt(entity, 0.0, -3.1);
      manager.update(1.0);
    });

    it("entity should have changed its location to min Y", function() {
      assertEntityLocation(entity, 0.0, -3.0);
    });
  });

  describe("when entity is outside max Y", function() {
    beforeEach(function() {
      placeEntityAt(entity, 0.0, 4.1);
      manager.update(1.0);
    });

    it("entity should have changed its location to max Y", function() {
      assertEntityLocation(entity, 0.0, 4.0);
    });
  });
});
