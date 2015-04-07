describe("entity", function() {
  var decimalPoints = 4;

  describe("LocationFeature", function() {
    var feature;

    beforeEach(function() {
      feature = new brickdest.entity.LocationFeature();
    });

    it("has default location is 0.0/0.0", function() {
      expect(feature.getX()).toBeCloseTo(0.0, decimalPoints);
      expect(feature.getY()).toBeCloseTo(0.0, decimalPoints);
    });

    it("is possible to change X coordinate", function() {
      feature.setX(1.3);
      expect(feature.getX()).toBeCloseTo(1.3, decimalPoints);
    });

    it("is possible to change Y coordinate", function() {
      feature.setY(2.1);
      expect(feature.getY()).toBeCloseTo(2.1, decimalPoints);
    });
  });

  describe("MotionFeature", function() {
    var feature;

    beforeEach(function() {
      feature = new brickdest.entity.MotionFeature();
    });

    it("has default speed 0.0/0.0", function() {
      expect(feature.getSpeedX()).toBeCloseTo(0.0, decimalPoints);
      expect(feature.getSpeedY()).toBeCloseTo(0.0, decimalPoints);
    });

    it("is possible to change speed along X", function() {
      feature.setSpeedX(1.6);
      expect(feature.getSpeedX()).toBeCloseTo(1.6, decimalPoints);
    });

    it("is possible to change speed along Y", function() {
      feature.setSpeedY(8.5);
      expect(feature.getSpeedY()).toBeCloseTo(8.5, decimalPoints);
    });

    it("has default mass of 1.0", function() {
      expect(feature.getMass()).toBeCloseTo(1.0, decimalPoints);
    });

    it("is possible to change mass", function() {
      feature.setMass(7.8);
      expect(feature.getMass()).toBeCloseTo(7.8, decimalPoints);
    });
  });

  describe("RectangleCollisionFeature", function() {
    var entity;
    var feature;

    beforeEach(function() {
      entity = new brickdest.entity.Entity();
      entity.locationFeature = new brickdest.entity.LocationFeature();
      entity.locationFeature.setX(10.0);
      entity.locationFeature.setY(8.0);

      feature = new brickdest.entity.RectangleCollisionFeature(entity);
      feature.setWidth(3.0);
      feature.setHeight(2.0);
      entity.collisionFeature = feature;
    });

    it("is possible to get width", function() {
      expect(feature.getWidth()).toBeCloseTo(3.0, decimalPoints);
    });

    it("is possible to get height", function() {
      expect(feature.getHeight()).toBeCloseTo(2.0, decimalPoints);
    });

    it("has default width of 2.0", function() {
      feature = new brickdest.entity.RectangleCollisionFeature(entity);
      expect(feature.getWidth()).toBeCloseTo(2.0, decimalPoints);
    });

    it("has default height of 1.0", function() {
      feature = new brickdest.entity.RectangleCollisionFeature(entity);
      expect(feature.getHeight()).toBeCloseTo(1.0, decimalPoints);
    });

    describe("surface penetration", function() {
      it("is correct when top is intersected", function() {
        var penetration = feature.getSurfacePenetration(0.0, 1.0, 7.5);
        expect(penetration).toBeCloseTo(0.5, decimalPoints);
      });

      it("is correct when top is not intersected", function() {
        var penetration = feature.getSurfacePenetration(0.0, 1.0, 6.5);
        expect(penetration).toBeCloseTo(-0.5, decimalPoints);
      });

      it("is correct when bottom is intersected", function() {
        var penetration = feature.getSurfacePenetration(0.0, -1.0, -8.5);
        expect(penetration).toBeCloseTo(0.5, decimalPoints);
      });

      it("is correct when bottom is not intersected", function() {
        var penetration = feature.getSurfacePenetration(0.0, -1.0, -9.5);
        expect(penetration).toBeCloseTo(-0.5, decimalPoints);
      });

      it("is correct when left is intersected", function() {
        var penetration = feature.getSurfacePenetration(1.0, 0.0, 9.25);
        expect(penetration).toBeCloseTo(0.75, decimalPoints);
      });

      it("is correct when left is not intersected", function() {
        var penetration = feature.getSurfacePenetration(1.0, 0.0, 7.75);
        expect(penetration).toBeCloseTo(-0.75, decimalPoints);
      });

      it("is correct when right is intersected", function() {
        var penetration = feature.getSurfacePenetration(-1.0, 0.0, -10.75);
        expect(penetration).toBeCloseTo(0.75, decimalPoints);
      });

      it("is correct when right is not intersected", function() {
        var penetration = feature.getSurfacePenetration(-1.0, 0.0, -12.25);
        expect(penetration).toBeCloseTo(-0.75, decimalPoints);
      });

      it("is correct when top left corner is intersected", function() {
        var penetration = feature.getSurfacePenetration(0.7071067, 0.7071067, 11.9601551);
        expect(penetration).toBeCloseTo(1.0, decimalPoints);
      });

      it("is correct when bottom left corner is intersected", function() {
        var penetration = feature.getSurfacePenetration(0.7071067, -0.7071067, 0.6464466);
        expect(penetration).toBeCloseTo(1.0, decimalPoints);
      });

      it("is correct when top right corner is intersected", function() {
        var penetration = feature.getSurfacePenetration(-0.7071067, 0.7071067, -2.1819805);
        expect(penetration).toBeCloseTo(1.0, decimalPoints);
      });

      it("is correct when bottom right corner is intersected", function() {
        var penetration = feature.getSurfacePenetration(-0.7071067, -0.7071067, -13.495689);
        expect(penetration).toBeCloseTo(1.0, decimalPoints);
      });
    })
  });

  describe("CircleCollisionFeature", function() {
    var entity;
    var feature;

    beforeEach(function() {
      entity = new brickdest.entity.Entity();
      entity.locationFeature = new brickdest.entity.LocationFeature();
      entity.locationFeature.setX(10.0);
      entity.locationFeature.setY(8.0);

      feature = new brickdest.entity.CircleCollisionFeature(entity);
      feature.setRadius(2.0);
      entity.collisionFeature = feature;
    });

    it("has default radius of 1.0", function() {
      feature = new brickdest.entity.CircleCollisionFeature(entity);
      expect(feature.getRadius()).toBeCloseTo(1.0, decimalPoints);
    });

    it("is possible to get radius", function() {
      expect(feature.getRadius()).toBeCloseTo(2.0, decimalPoints);
    });

    describe("surface penetration", function() {
      it("is correct when top is intersected", function() {
        var penetration = feature.getSurfacePenetration(0.0, 1.0, 7.5);
        expect(penetration).toBeCloseTo(1.5, decimalPoints);
      });

      it("is correct when left is intersected", function() {
        var penetration = feature.getSurfacePenetration(1.0, 0.0, 8.5);
        expect(penetration).toBeCloseTo(0.5, decimalPoints);
      });

      it("is correct when diagonal is intersected", function() {
        var penetration = feature.getSurfacePenetration(0.7071067, 0.7071067, 11.72792);
        expect(penetration).toBeCloseTo(1.0, decimalPoints);
      });

      it("is correct when top is not intersected", function() {
        var penetration = feature.getSurfacePenetration(0.0, 1.0, 4.5);
        expect(penetration).toBeCloseTo(-1.5, decimalPoints);
      });

      it("is correct when left is not intersected", function() {
        var penetration = feature.getSurfacePenetration(1.0, 0.0, 7.5);
        expect(penetration).toBeCloseTo(-0.5, decimalPoints);
      });

      it("is correct when diagonal is not intersected", function() {
        var penetration = feature.getSurfacePenetration(0.7071067, 0.7071067, 9.72792);
        expect(penetration).toBeCloseTo(-1.0, decimalPoints);
      });
    });
  });

  // TODO: Test collision between circle and rectangle
  // TODO: Test collision between rectangle and rectangle
  // TODO: Test collision between circle and circle

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
        expect(entity.locationFeature.getX()).toBeCloseTo(11.3, decimalPoints);
        expect(entity.locationFeature.getY()).toBeCloseTo(5.4, decimalPoints);
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
        expect(entity.motionFeature.getSpeedX()).toBeCloseTo(1.0, decimalPoints);
        expect(entity.motionFeature.getSpeedY()).toBeCloseTo(4.8, decimalPoints);
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
