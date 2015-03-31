describe("entity", function() {
  var epsilon = 0.0001;

  describe("LocationFeature", function() {
    var feature;

    beforeEach(function() {
      feature = new brickdest.entity.LocationFeature();
    });

    it("has default location is 0.0/0.0", function() {
      expect(feature.getX()).toBeCloseTo(0.0, epsilon);
      expect(feature.getY()).toBeCloseTo(0.0, epsilon);
    });

    it("is possible to change X coordinate", function() {
      feature.setX(1.3);
      expect(feature.getX()).toBeCloseTo(1.3, epsilon);
    });

    it("is possible to change Y coordinate", function() {
      feature.setY(2.1);
      expect(feature.getY()).toBeCloseTo(2.1, epsilon);
    });
  });

  describe("MotionFeature", function() {
    var feature;

    beforeEach(function() {
      feature = new brickdest.entity.MotionFeature();
    });

    it("has default speed 0.0/0.0", function() {
      expect(feature.getSpeedX()).toBeCloseTo(0.0, epsilon);
      expect(feature.getSpeedY()).toBeCloseTo(0.0, epsilon);
    });

    it("is possible to change speed along X", function() {
      feature.setSpeedX(1.6);
      expect(feature.getSpeedX()).toBeCloseTo(1.6, epsilon);
    });

    it("is possible to change speed along Y", function() {
      feature.setSpeedY(8.5);
      expect(feature.getSpeedY()).toBeCloseTo(8.5, epsilon);
    });

    it("has default mass of 1.0", function() {
      expect(feature.getMass()).toBeCloseTo(1.0, epsilon);
    });

    it("is possible to change mass", function() {
      feature.setMass(7.8);
      expect(feature.getMass()).toBeCloseTo(7.8, epsilon);
    });
  });

  describe("MotionSystem", function() {
    var system;
    var entity;

    beforeEach(function() {
      system = new brickdest.entity.MotionSystem();
      system.setAcceleration(3.4);

      entity = new brickdest.entity.Entity();
      entity.locationFeature = new brickdest.entity.LocationFeature();
      entity.locationFeature.setX(11.3);
      entity.locationFeature.setY(5.4);
    });

    it("is possible to change acceleration", function() {
      expect(system.getAcceleration()).toBeCloseTo(3.4);
    });

    describe("when a motionless entity is processed", function() {
      beforeEach(function() {
        system.process(entity, 2.0);
      });

      it("the entity is not affected", function() {
        expect(entity.locationFeature.getX()).toBeCloseTo(11.3, epsilon);
        expect(entity.locationFeature.getY()).toBeCloseTo(5.4, epsilon);
      });
    });

    describe("when a movable entity is processed", function() {
      beforeEach(function() {
        entity.motionFeature = new brickdest.entity.MotionFeature();
        entity.motionFeature.setSpeedX(1.0);
        entity.motionFeature.setSpeedY(-2.0);
        system.process(entity, 2.0);
      });

      it("the speed should have changed accordingly", function() {
        // speed = v0 + a * t = -2.0 + 3.4 * 2.0
        expect(entity.motionFeature.getSpeedX()).toBeCloseTo(1.0, epsilon);
        expect(entity.motionFeature.getSpeedY()).toBeCloseTo(4.8, epsilon);
      });

      it("the location should have changed accordingly", function() {
        // distanceX = v0 * t = 2.0
        // distanceY = (v0 + v1) * t / 2 = (-2.0 + 4.8) * 2.0 / 2 = 2.8
        expect(entity.locationFeature.getX()).toBeCloseTo(13.3);
        expect(entity.locationFeature.getY()).toBeCloseTo(8.2);
      });
    });
  });
});
