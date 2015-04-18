describe("CollisionEvaluator", function() {
  var decimalPoints = 4;
  var evaluator;
  var manager;
  var staticRect;
  var candidateRect;
  var staticCircle;
  var candidateCircle;

  beforeEach(function() {
    evaluator = new brickdest.ecs.CollisionEvaluator();
    manager = new brickdest.ecs.EntityManager();

    staticRect = manager.createEntity();
    staticRect.addComponent("location", new brickdest.ecs.LocationComponent({
      location: new brickdest.math.Vector(10.0, 10.0)
    }));
    staticRect.addComponent("collision", new brickdest.ecs.CollisionComponent({
      shape: new brickdest.shape.Rectangle({
        width: 2.0,
        height: 2.0
      })
    }));

    candidateRect = manager.createEntity();
    candidateRect.addComponent("location", new brickdest.ecs.LocationComponent());
    candidateRect.addComponent("collision", new brickdest.ecs.CollisionComponent({
      shape: new brickdest.shape.Rectangle({
        width: 2.0,
        height: 2.0
      })
    }));

    staticCircle = manager.createEntity();
    staticCircle.addComponent("location", new brickdest.ecs.LocationComponent({
      location: new brickdest.math.Vector(10.0, 10.0)
    }));
    staticCircle.addComponent("collision", new brickdest.ecs.CollisionComponent({
      shape: new brickdest.shape.Circle({
        radius: 1.0
      })
    }));

    candidateCircle = manager.createEntity();
    candidateCircle.addComponent("location", new brickdest.ecs.LocationComponent());
    candidateCircle.addComponent("collision", new brickdest.ecs.CollisionComponent({
      shape: new brickdest.shape.Circle({
        radius: 1.0
      })
    }));
  });

  function setCandidateCircleLocation(x, y) {
    var locationComp = candidateCircle.getComponent("location");
    locationComp.location.x = x;
    locationComp.location.y = y;
  }

  function setCandidateRectLocation(x, y) {
    var locationComp = candidateRect.getComponent("location");
    locationComp.location.x = x;
    locationComp.location.y = y;
  }

  describe("when two circles don't collide", function() {
    it("there should be no escape vector", function() {
      var vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
      expect(vector).toBeNull();
    });
  });

  describe("when two rectangles don't collide", function() {
    it("there should be no escape vector", function() {
      var vector = evaluator.getEscapeVector(staticRect, candidateRect);
      expect(vector).toBeNull();
    });
  });

  describe("when rectangle and circle don't collide", function() {
    it("there should be no escape vector", function() {
      var vector = evaluator.getEscapeVector(staticRect, candidateCircle);
      expect(vector).toBeNull();

      vector = evaluator.getEscapeVector(staticCircle, candidateRect);
      expect(vector).toBeNull();
    });
  });

  describe("when two circles collide", function() {
    describe("when candidate collides at 0 degress", function() {
      beforeEach(function() {
        setCandidateCircleLocation(11.5, 10.0);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(0.5, decimalPoints);
        expect(vector.y).toBeCloseTo(0.0, decimalPoints);
      });
    });

    describe("when candidate collides at 45 degress", function() {
      beforeEach(function() {
        setCandidateCircleLocation(11.0606601, 11.0606601);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(0.35355339, decimalPoints);
        expect(vector.y).toBeCloseTo(0.35355339, decimalPoints);
      });
    });

    describe("when candidate collides at 90 degress", function() {
      beforeEach(function() {
        setCandidateCircleLocation(10.0, 11.5);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(0.0, decimalPoints);
        expect(vector.y).toBeCloseTo(0.5, decimalPoints);
      });
    });

    describe("when candidate collides at 135 degress", function() {
      beforeEach(function() {
        setCandidateCircleLocation(8.9393399, 11.0606601);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(-0.35355339, decimalPoints);
        expect(vector.y).toBeCloseTo(0.35355339, decimalPoints);
      });
    });

    describe("when candidate collides at 180 degress", function() {
      beforeEach(function() {
        setCandidateCircleLocation(8.5, 10.0);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(-0.5, decimalPoints);
        expect(vector.y).toBeCloseTo(0.0, decimalPoints);
      });
    });

    describe("when candidate collides at 225 degress", function() {
      beforeEach(function() {
        setCandidateCircleLocation(8.9393399, 8.9393399);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(-0.35355339, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.35355339, decimalPoints);
      });
    });

    describe("when candidate collides at 270 degress", function() {
      beforeEach(function() {
        setCandidateCircleLocation(10.0, 8.5);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(0.0, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.5, decimalPoints);
      });
    });

    describe("when candidate collides at 315 degress", function() {
      beforeEach(function() {
        setCandidateCircleLocation(11.0606601, 8.9393399);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(0.35355339, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.35355339, decimalPoints);
      });
    });
  });

  describe("when two rectangles collide", function() {
    describe("when candidate collides from the right", function() {
      beforeEach(function() {
        setCandidateRectLocation(11.5, 9.0);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticRect, candidateRect);
        expect(vector.x).toBeCloseTo(0.5, decimalPoints);
        expect(vector.y).toBeCloseTo(0.0, decimalPoints);
      });
    });

    describe("when candidate collides from the top", function() {
      beforeEach(function() {
        setCandidateRectLocation(9.0, 8.5);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticRect, candidateRect);
        expect(vector.x).toBeCloseTo(0.0, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.5, decimalPoints);
      });
    });

    describe("when candidate collides from the left", function() {
      beforeEach(function() {
        setCandidateRectLocation(8.5, 11.0);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticRect, candidateRect);
        expect(vector.x).toBeCloseTo(-0.5, decimalPoints);
        expect(vector.y).toBeCloseTo(0.0, decimalPoints);
      });
    });

    describe("when candidate collides from the bottom", function() {
      beforeEach(function() {
        setCandidateRectLocation(11.0, 11.5);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticRect, candidateRect);
        expect(vector.x).toBeCloseTo(0.0, decimalPoints);
        expect(vector.y).toBeCloseTo(0.5, decimalPoints);
      });
    });
  });

  describe("when circle and rectangle collide", function() {
    describe("when candidate collides with the right edge", function() {
      beforeEach(function() {
        setCandidateCircleLocation(11.5, 10.0);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(0.5, decimalPoints);
        expect(vector.y).toBeCloseTo(0.0, decimalPoints);
      });

      it("should return opposite escape vector when flipped", function() {
        var vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(-0.5, decimalPoints);
        expect(vector.y).toBeCloseTo(0.0, decimalPoints);
      });
    });

    describe("when candidate collides with the bottom edge", function() {
      beforeEach(function() {
        setCandidateCircleLocation(10.0, 11.5);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(0.0, decimalPoints);
        expect(vector.y).toBeCloseTo(0.5, decimalPoints);
      });

      it("should return opposite escape vector when flipped", function() {
        var vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(0.0, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.5, decimalPoints);
      });
    });

    describe("when candidate collides with the left edge", function() {
      beforeEach(function() {
        setCandidateCircleLocation(8.5, 10.0);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(-0.5, decimalPoints);
        expect(vector.y).toBeCloseTo(0.0, decimalPoints);
      });

      it("should return opposite escape vector when flipped", function() {
        var vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(0.5, decimalPoints);
        expect(vector.y).toBeCloseTo(0.0, decimalPoints);
      });
    });

    describe("when candidate collides with the top edge", function() {
      beforeEach(function() {
        setCandidateCircleLocation(10.0, 8.5);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(0.0, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.5, decimalPoints);
      });

      it("should return opposite escape vector when flipped", function() {
        var vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(0.0, decimalPoints);
        expect(vector.y).toBeCloseTo(0.5, decimalPoints);
      });
    });

    describe("when candidate collides with the bottom-right corner", function() {
      beforeEach(function() {
        setCandidateCircleLocation(11.3535533, 11.3535533);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(0.3535533, decimalPoints);
        expect(vector.y).toBeCloseTo(0.3535533, decimalPoints);
      });

      it("should return opposite escape vector when flipped", function() {
        var vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(-0.3535533, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.3535533, decimalPoints);
      });
    });

    describe("when candidate collides with the bottom-left corner", function() {
      beforeEach(function() {
        setCandidateCircleLocation(8.6464467, 11.3535533);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(-0.3535533, decimalPoints);
        expect(vector.y).toBeCloseTo(0.3535533, decimalPoints);
      });

      it("should return opposite escape vector when flipped", function() {
        var vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(0.3535533, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.3535533, decimalPoints);
      });
    });

    describe("when candidate collides with the top-left corner", function() {
      beforeEach(function() {
        setCandidateCircleLocation(8.6464467, 8.6464467);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(-0.3535533, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.3535533, decimalPoints);
      });

      it("should return opposite escape vector when flipped", function() {
        var vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(0.3535533, decimalPoints);
        expect(vector.y).toBeCloseTo(0.3535533, decimalPoints);
      });
    });

    describe("when candidate collides with the top-right corner", function() {
      beforeEach(function() {
        setCandidateCircleLocation(11.3535533, 8.6464467);
      });

      it("should return correct escape vector", function() {
        var vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(0.3535533, decimalPoints);
        expect(vector.y).toBeCloseTo(-0.3535533, decimalPoints);
      });

      it("should return opposite escape vector when flipped", function() {
        var vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(-0.3535533, decimalPoints);
        expect(vector.y).toBeCloseTo(0.3535533, decimalPoints);
      });
    });
  });
});
