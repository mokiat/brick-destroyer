describe("MotionSystem", function() {
  var decimalPoints = 4;
  var manager;
  var system;

  beforeEach(function() {
    manager = new brickdest.ecs.EntityManager();
    system = new brickdest.ecs.MotionSystem(manager);
    manager.addSystem(system);
  });

  it("has default gravity equal to 0.0/0.0", function() {
    expect(system.gravity.x).toBeCloseTo(0.0, decimalPoints);
    expect(system.gravity.y).toBeCloseTo(0.0, decimalPoints);
  });

  describe("when entity moves in a gravity field", function() {
    var entity;

    beforeEach(function() {
      system.gravity = new brickdest.math.Vector(1.2, 3.4);

      entity = manager.createEntity();

      var location = new brickdest.ecs.LocationComponent();
      location.location = new brickdest.math.Vector(11.3, 5.4);
      entity.addComponent("location", location);

      var motion = new brickdest.ecs.MotionComponent();
      motion.speed = new brickdest.math.Vector(1.0, -2.0);
      entity.addComponent("motion", motion);

      manager.update(2.0);
    });

    it("the speed should have changed accordingly", function() {
      // speed = old_speed + acceleration * delta_time
      var motion = entity.getComponent("motion");
      expect(motion.speed.x).toBeCloseTo(3.4);
      expect(motion.speed.y).toBeCloseTo(4.8);
    });

    it("the location should have changed accordingly", function() {
      // distance = (old_speed + new_speed) * delta_time * 0.5
      var location = entity.getComponent("location");
      expect(location.location.x).toBeCloseTo(15.7);
      expect(location.location.y).toBeCloseTo(8.2);
    });
  });
});
