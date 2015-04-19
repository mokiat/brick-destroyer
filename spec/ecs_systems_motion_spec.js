describe("MotionSystem", function() {
  var decimalPoints = 4;
  var manager;
  var system;
  var entity;
  var obstacle;

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
    beforeEach(function() {
      system.gravity = new brickdest.math.Vector(1.2, 3.4);

      entity = manager.createEntity();
      entity.addComponent("location", new brickdest.ecs.LocationComponent({
        location: new brickdest.math.Vector(11.3, 5.4)
      }));
      entity.addComponent("motion", new brickdest.ecs.MotionComponent({
        speed: new brickdest.math.Vector(1.0, -2.0)
      }));

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

  describe("when entity collides with a very thin obstacle", function() {
    beforeEach(function() {
      entity = manager.createEntity();

      entity.addComponent("location", new brickdest.ecs.LocationComponent({
        location: new brickdest.math.Vector(-4.0, -5.1)
      }));

      entity.addComponent("motion", new brickdest.ecs.MotionComponent({
        speed: new brickdest.math.Vector(1.0, 1.0)
      }));

      entity.addComponent("collision", new brickdest.ecs.CollisionComponent({
        shape: new brickdest.shape.Circle({
          radius: 1.0
        }),
        friction: 0.0,
        deflection: 1.0
      }));

      obstacle = manager.createEntity();

      obstacle.addComponent("location", new brickdest.ecs.LocationComponent({
        location: new brickdest.math.Vector()
      }));

      obstacle.addComponent("collision", new brickdest.ecs.CollisionComponent({
        shape: new brickdest.shape.Rectangle({
          width: 3.0,
          height: 0.2
        }),
        friction: 0.0,
        deflection: 1.0
      }));
    });

    describe("when there is no friction and maximum deflection", function() {
      beforeEach(function() {
        manager.update(8.0);
      });

      it("the object should have changed its speed accordingly", function() {
        var motionComp = entity.getComponent("motion");
        expect(motionComp.speed.x).toBeCloseTo(1.0, decimalPoints);
        expect(motionComp.speed.y).toBeCloseTo(-1.0, decimalPoints);
      });

      it("the object should have changed its location accordingly", function() {
        var locationComp = entity.getComponent("location");
        expect(locationComp.location.x).toBeCloseTo(4.0, decimalPoints);
        expect(locationComp.location.y).toBeCloseTo(-5.1, decimalPoints);
      });
    });

    describe("when deflection is lowered", function() {
      beforeEach(function() {
        entity.getComponent("collision").deflection = 0.5;
        obstacle.getComponent("collision").deflection = 0.5;

        manager.update(8.0);
      });

      it("the object should have changed its speed accordingly", function() {
        var motionComp = entity.getComponent("motion");
        expect(motionComp.speed.x).toBeCloseTo(1.0, decimalPoints);
        expect(motionComp.speed.y).toBeCloseTo(-0.25, decimalPoints);
      });

      it("the object should have changed its location accordingly", function() {
        var locationComp = entity.getComponent("location");
        expect(locationComp.location.x).toBeCloseTo(4.0, decimalPoints);
        expect(locationComp.location.y).toBeCloseTo(-2.1, decimalPoints);
      });
    });

    describe("when friction is increased", function() {
      beforeEach(function() {
        entity.getComponent("collision").friction = 0.5;
        obstacle.getComponent("collision").friction = 0.5;

        manager.update(8.0);
      });

      it("the object should have changed its speed accordingly", function() {
        var motionComp = entity.getComponent("motion");
        expect(motionComp.speed.x).toBeCloseTo(0.75, decimalPoints);
        expect(motionComp.speed.y).toBeCloseTo(-1.0, decimalPoints);
      });

      it("the object should have changed its location accordingly", function() {
        var locationComp = entity.getComponent("location");
        expect(locationComp.location.x).toBeCloseTo(3.0, decimalPoints);
        expect(locationComp.location.y).toBeCloseTo(-5.1, decimalPoints);
      });
    });

    describe("when obstacle is movable", function() {
      beforeEach(function() {
        obstacle.addComponent("motion", new brickdest.ecs.MotionComponent());
      });

      it("should throw an error", function() {
        expect(function() {
          manager.update(8.0);
        }).toThrow();
      });
    });
  });
});