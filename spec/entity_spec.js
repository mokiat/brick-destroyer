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

    it("has default elasticity of 1.0", function() {
      expect(feature.getElasticity()).toBeCloseTo(1.0, decimalPoints);
    });

    it("can have its elasticity changed", function() {
      feature.setElasticity(0.25);
      expect(feature.getElasticity()).toBeCloseTo(0.25, decimalPoints);
    });

    it("has default friction of 0.0", function() {
      expect(feature.getFriction()).toBeCloseTo(0.0, decimalPoints);
    });

    it("can have its friction changed", function() {
      feature.setFriction(0.25);
      expect(feature.getFriction()).toBeCloseTo(0.25, decimalPoints);
    });

    it("is possible to get width", function() {
      expect(feature.getWidth()).toBeCloseTo(3.0, decimalPoints);
    });

    it("is possible to get height", function() {
      expect(feature.getHeight()).toBeCloseTo(2.0, decimalPoints);
    });

    it("is possible to get step size", function() {
      expect(feature.getStepSize()).toBeCloseTo(0.5);
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

    it("has default elasticity of 1.0", function() {
      expect(feature.getElasticity()).toBeCloseTo(1.0, decimalPoints);
    });

    it("can have its elasticity changed", function() {
      feature.setElasticity(0.25);
      expect(feature.getElasticity()).toBeCloseTo(0.25, decimalPoints);
    });

    it("has default friction of 0.0", function() {
      expect(feature.getFriction()).toBeCloseTo(0.0, decimalPoints);
    });

    it("can have its friction changed", function() {
      feature.setFriction(0.25);
      expect(feature.getFriction()).toBeCloseTo(0.25, decimalPoints);
    });

    it("has default radius of 1.0", function() {
      feature = new brickdest.entity.CircleCollisionFeature(entity);
      expect(feature.getRadius()).toBeCloseTo(1.0, decimalPoints);
    });

    it("is possible to get radius", function() {
      expect(feature.getRadius()).toBeCloseTo(2.0, decimalPoints);
    });

    it("is possible to get step size", function() {
      expect(feature.getStepSize()).toBeCloseTo(1.0);
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

  describe("CollisionEvaluator", function() {
    var evaluator;
    var firstRect;
    var secondRect;
    var firstCircle;
    var secondCircle;

    beforeEach(function() {
      evaluator = new brickdest.entity.CollisionEvaluator();

      firstRect = new brickdest.entity.Entity();
      firstRect.locationFeature = new brickdest.entity.LocationFeature();
      firstRect.locationFeature.setX(10.0);
      firstRect.locationFeature.setY(10.0);
      firstRect.collisionFeature = new brickdest.entity.RectangleCollisionFeature(firstRect);
      firstRect.collisionFeature.setWidth(2.0);
      firstRect.collisionFeature.setHeight(2.0);

      secondRect = new brickdest.entity.Entity();
      secondRect.locationFeature = new brickdest.entity.LocationFeature();
      secondRect.collisionFeature = new brickdest.entity.RectangleCollisionFeature(secondRect);
      secondRect.collisionFeature.setWidth(2.0);
      secondRect.collisionFeature.setHeight(2.0);

      firstCircle = new brickdest.entity.Entity();
      firstCircle.locationFeature = new brickdest.entity.LocationFeature();
      firstCircle.locationFeature.setX(10.0);
      firstCircle.locationFeature.setY(10.0);
      firstCircle.collisionFeature = new brickdest.entity.CircleCollisionFeature(firstCircle);
      firstCircle.collisionFeature.setRadius(1.0);

      secondCircle = new brickdest.entity.Entity();
      secondCircle.locationFeature = new brickdest.entity.LocationFeature();
      secondCircle.locationFeature.setX(10.0);
      secondCircle.locationFeature.setY(10.0);
      secondCircle.collisionFeature = new brickdest.entity.CircleCollisionFeature(secondCircle);
      secondCircle.collisionFeature.setRadius(1.0);
    });

    describe("rectangle<=>rectangle; displace towards the right", function() {
      beforeEach(function() {
        secondRect.locationFeature.setX(11.5);
        secondRect.locationFeature.setY(9.0);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstRect, secondRect);
        expect(vector.x).toBeCloseTo(0.5, decimalPoints);
        expect(vector.y).toBeCloseTo(0.0, decimalPoints);
      });
    });

    describe("rectangle<=>rectangle; displace towards the top", function() {
      beforeEach(function() {
        secondRect.locationFeature.setX(9.0);
        secondRect.locationFeature.setY(8.5);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstRect, secondRect);
        expect(vector.x).toBeCloseTo(0.0, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.5, decimalPoints);
      });
    });

    describe("rectangle<=>rectangle; displace towards the left", function() {
      beforeEach(function() {
        secondRect.locationFeature.setX(8.5);
        secondRect.locationFeature.setY(11.0);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstRect, secondRect);
        expect(vector.x).toBeCloseTo(-0.5, decimalPoints);
        expect(vector.y).toBeCloseTo(0.0, decimalPoints);
      });
    });

    describe("rectangle<=>rectangle; displace towards the bottom", function() {
      beforeEach(function() {
        secondRect.locationFeature.setX(11.0);
        secondRect.locationFeature.setY(11.5);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstRect, secondRect);
        expect(vector.x).toBeCloseTo(0.0, decimalPoints);
        expect(vector.y).toBeCloseTo(0.5, decimalPoints);
      });
    });

    describe("circle<=>circle; displace towards 0 degrees", function() {
      beforeEach(function() {
        secondCircle.locationFeature.setX(11.5);
        secondCircle.locationFeature.setY(10.0);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstCircle, secondCircle);
        expect(vector.x).toBeCloseTo(0.5, decimalPoints);
        expect(vector.y).toBeCloseTo(0.0, decimalPoints);
      });
    });

    describe("circle<=>circle; displace towards 45 degrees", function() {
      beforeEach(function() {
        secondCircle.locationFeature.setX(11.0606601);
        secondCircle.locationFeature.setY(11.0606601);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstCircle, secondCircle);
        expect(vector.x).toBeCloseTo(0.35355339, decimalPoints);
        expect(vector.y).toBeCloseTo(0.35355339, decimalPoints);
      });
    });

    describe("circle<=>circle; displace towards 90 degrees", function() {
      beforeEach(function() {
        secondCircle.locationFeature.setX(10.0);
        secondCircle.locationFeature.setY(11.5);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstCircle, secondCircle);
        expect(vector.x).toBeCloseTo(0.0, decimalPoints);
        expect(vector.y).toBeCloseTo(0.5, decimalPoints);
      });
    });

    describe("circle<=>circle; displace towards 135 degrees", function() {
      beforeEach(function() {
        secondCircle.locationFeature.setX(8.9393399);
        secondCircle.locationFeature.setY(11.0606601);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstCircle, secondCircle);
        expect(vector.x).toBeCloseTo(-0.35355339, decimalPoints);
        expect(vector.y).toBeCloseTo(0.35355339, decimalPoints);
      });
    });

    describe("circle<=>circle; displace towards 180 degrees", function() {
      beforeEach(function() {
        secondCircle.locationFeature.setX(8.5);
        secondCircle.locationFeature.setY(10.0);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstCircle, secondCircle);
        expect(vector.x).toBeCloseTo(-0.5, decimalPoints);
        expect(vector.y).toBeCloseTo(0.0, decimalPoints);
      });
    });

    describe("circle<=>circle; displace towards 225 degrees", function() {
      beforeEach(function() {
        secondCircle.locationFeature.setX(8.9393399);
        secondCircle.locationFeature.setY(8.9393399);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstCircle, secondCircle);
        expect(vector.x).toBeCloseTo(-0.35355339, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.35355339, decimalPoints);
      });
    });

    describe("circle<=>circle; displace towards 270 degrees", function() {
      beforeEach(function() {
        secondCircle.locationFeature.setX(10.0);
        secondCircle.locationFeature.setY(8.5);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstCircle, secondCircle);
        expect(vector.x).toBeCloseTo(0.0, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.5, decimalPoints);
      });
    });

    describe("circle<=>circle; displace towards 315 degrees", function() {
      beforeEach(function() {
        secondCircle.locationFeature.setX(11.0606601);
        secondCircle.locationFeature.setY(8.9393399);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstCircle, secondCircle);
        expect(vector.x).toBeCloseTo(0.35355339, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.35355339, decimalPoints);
      });
    });

    describe("rectangle<=>circle; displace towards right", function() {
      beforeEach(function() {
        secondCircle.locationFeature.setX(11.5);
        secondCircle.locationFeature.setY(10.0);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstRect, secondCircle);
        expect(vector.x).toBeCloseTo(0.5, decimalPoints);
        expect(vector.y).toBeCloseTo(0.0, decimalPoints);
      });
    });

    describe("rectangle<=>circle; displace towards bottom", function() {
      beforeEach(function() {
        secondCircle.locationFeature.setX(10.0);
        secondCircle.locationFeature.setY(11.5);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstRect, secondCircle);
        expect(vector.x).toBeCloseTo(0.0, decimalPoints);
        expect(vector.y).toBeCloseTo(0.5, decimalPoints);
      });
    });

    describe("rectangle<=>circle; displace towards bottom-right", function() {
      beforeEach(function() {
        secondCircle.locationFeature.setX(11.3535533);
        secondCircle.locationFeature.setY(11.3535533);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstRect, secondCircle);
        expect(vector.x).toBeCloseTo(0.3535533, decimalPoints);
        expect(vector.y).toBeCloseTo(0.3535533, decimalPoints);
      });
    });

    describe("rectangle<=>circle; displace towards top-left", function() {
      beforeEach(function() {
        secondCircle.locationFeature.setX(8.6464467);
        secondCircle.locationFeature.setY(8.6464467);
      });

      it("should return proper collision vector", function() {
        var vector = evaluator.getEscapeVector(firstRect, secondCircle);
        expect(vector.x).toBeCloseTo(-0.3535533, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.3535533, decimalPoints);
      });
    });
  });

  describe("LocationSystem", function() {
    var system;

    beforeEach(function() {
      system = new brickdest.entity.LocationSystem();
    });

    it("has no entities initially", function() {
      expect(system.getEntities()).toEqual([]);
    });

    describe("when entities are added", function() {
      var entity;

      beforeEach(function() {
        entity = new brickdest.entity.Entity();
        system.addEntity(entity);
      });

      it("contains the entities", function() {
        expect(system.getEntities()).toEqual([entity]);
      });
    });
  });

  describe("MotionSystem", function() {
    var locationSystem;
    var system;
    var entity;

    beforeEach(function() {
      locationSystem = new brickdest.entity.LocationSystem();
      system = new brickdest.entity.MotionSystem(locationSystem);

      entity = new brickdest.entity.Entity();
      entity.locationFeature = new brickdest.entity.LocationFeature();
      entity.locationFeature.setX(11.3);
      entity.locationFeature.setY(5.4);
      locationSystem.addEntity(entity);
    });

    describe("when a motionless entity is processed", function() {
      beforeEach(function() {
        system.process(2.0);
      });

      it("the entity's location is not affected", function() {
        expect(entity.locationFeature.getX()).toBeCloseTo(11.3, decimalPoints);
        expect(entity.locationFeature.getY()).toBeCloseTo(5.4, decimalPoints);
      });
    });

    describe("motion in gravity", function() {
      beforeEach(function() {
        system.setAcceleration(3.4);

        entity.motionFeature = new brickdest.entity.MotionFeature();
        entity.motionFeature.setSpeedX(1.0);
        entity.motionFeature.setSpeedY(-2.0);
      });

      it("is possible to get gravity", function() {
        expect(system.getAcceleration()).toBeCloseTo(3.4);
      });

      describe("when entity is processed", function() {
        beforeEach(function() {
          system.process(2.0);
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

    describe("collision with thin motionless object", function() {
      var obstacle;

      beforeEach(function() {
        system.setAcceleration(0.0);

        entity.locationFeature.setX(-4.0);
        entity.locationFeature.setY(-5.1);
        entity.motionFeature = new brickdest.entity.MotionFeature();
        entity.motionFeature.setSpeedX(1.0);
        entity.motionFeature.setSpeedY(1.0);
        entity.collisionFeature = new brickdest.entity.CircleCollisionFeature(entity);
        entity.collisionFeature.setRadius(1.0);

        obstacle = new brickdest.entity.Entity();
        obstacle.locationFeature = new brickdest.entity.LocationFeature();
        obstacle.locationFeature.setX(0.0);
        obstacle.locationFeature.setY(0.0);
        obstacle.collisionFeature = new brickdest.entity.RectangleCollisionFeature(obstacle);
        obstacle.collisionFeature.setWidth(3.0);
        obstacle.collisionFeature.setHeight(0.2);
        locationSystem.addEntity(obstacle);
      });

      describe("when the entity is processed", function() {
        beforeEach(function() {
          system.process(8.0);
        });

        it("the object should have changed its speed accordingly", function() {
          expect(entity.motionFeature.getSpeedX()).toBeCloseTo(1.0, decimalPoints);
          expect(entity.motionFeature.getSpeedY()).toBeCloseTo(-1.0, decimalPoints);
        });

        it("the object should have changed its location accordingly", function() {
          expect(entity.locationFeature.getX()).toBeCloseTo(4.0, decimalPoints);
          expect(entity.locationFeature.getY()).toBeCloseTo(-5.1, decimalPoints);
        });
      });

      describe("when elasticity of colliding entities is decreased", function() {
        beforeEach(function() {
          entity.collisionFeature.setElasticity(0.5);
          obstacle.collisionFeature.setElasticity(0.5);
        });

        describe("when entity is processed", function() {
          beforeEach(function() {
            system.process(8.0);
          });

          it("the object should have changed its speed accordingly", function() {
            expect(entity.motionFeature.getSpeedX()).toBeCloseTo(1.0, decimalPoints);
            expect(entity.motionFeature.getSpeedY()).toBeCloseTo(-0.25, decimalPoints);
          });

          it("the object should have changed its location accordingly", function() {
            expect(entity.locationFeature.getX()).toBeCloseTo(4.0, decimalPoints);
            expect(entity.locationFeature.getY()).toBeCloseTo(-2.1, decimalPoints);
          });
        });
      });

      describe("when friction of colliding entities is increased", function() {
        beforeEach(function() {
          entity.collisionFeature.setFriction(0.5);
          obstacle.collisionFeature.setFriction(0.5);
        });

        describe("when entity is processed", function() {
          beforeEach(function() {
            system.process(8.0);
          });

          it("the object should have changed its speed accordingly", function() {
            expect(entity.motionFeature.getSpeedX()).toBeCloseTo(0.75, decimalPoints);
            expect(entity.motionFeature.getSpeedY()).toBeCloseTo(-1.0, decimalPoints);
          });

          it("the object should have changed its location accordingly", function() {
            expect(entity.locationFeature.getX()).toBeCloseTo(3.0, decimalPoints);
            expect(entity.locationFeature.getY()).toBeCloseTo(-5.1, decimalPoints);
          });
        });
      });
    });
  });
});
