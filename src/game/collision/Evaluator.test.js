import CollisionEvaluator from './Evaluator';
import EntityManager from '../../ecs/Manager';
import LocationComponent from '../component/Location';
import CollisionComponent from '../component/Collision';
import Rectangle from '../../shape/Rectangle';
import Circle from '../../shape/Circle';
import Vector from '../../math/Vector';

describe('Evaluator', () => {
  let evaluator;
  let staticRect;
  let candidateRect;
  let staticCircle;
  let candidateCircle;

  beforeEach(() => {
    evaluator = new CollisionEvaluator();
    const manager = new EntityManager();

    staticRect = manager.createEntity();
    staticRect.addComponent(
      'location',
      new LocationComponent({
        location: new Vector(10.0, 10.0),
      })
    );
    staticRect.addComponent(
      'collision',
      new CollisionComponent({
        shape: new Rectangle({
          width: 2.0,
          height: 2.0,
        }),
      })
    );

    candidateRect = manager.createEntity();
    candidateRect.addComponent('location', new LocationComponent());
    candidateRect.addComponent(
      'collision',
      new CollisionComponent({
        shape: new Rectangle({
          width: 2.0,
          height: 2.0,
        }),
      })
    );

    staticCircle = manager.createEntity();
    staticCircle.addComponent(
      'location',
      new LocationComponent({
        location: new Vector(10.0, 10.0),
      })
    );
    staticCircle.addComponent(
      'collision',
      new CollisionComponent({
        shape: new Circle({
          radius: 1.0,
        }),
      })
    );

    candidateCircle = manager.createEntity();
    candidateCircle.addComponent('location', new LocationComponent());
    candidateCircle.addComponent(
      'collision',
      new CollisionComponent({
        shape: new Circle({
          radius: 1.0,
        }),
      })
    );
  });

  const setCandidateCircleLocation = (x, y) => {
    const locationComp = candidateCircle.getComponent('location');
    locationComp.location.x = x;
    locationComp.location.y = y;
  };

  const setCandidateRectLocation = (x, y) => {
    const locationComp = candidateRect.getComponent('location');
    locationComp.location.x = x;
    locationComp.location.y = y;
  };

  describe("when two circles don't collide", () => {
    test('there should be no escape vector', () => {
      const vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
      expect(vector).toBeNull();
    });
  });

  describe("when two rectangles don't collide", () => {
    test('there should be no escape vector', () => {
      const vector = evaluator.getEscapeVector(staticRect, candidateRect);
      expect(vector).toBeNull();
    });
  });

  describe("when rectangle and circle don't collide", () => {
    test('there should be no escape vector', () => {
      let vector = evaluator.getEscapeVector(staticRect, candidateCircle);
      expect(vector).toBeNull();

      vector = evaluator.getEscapeVector(staticCircle, candidateRect);
      expect(vector).toBeNull();
    });
  });

  describe('when two circles collide', () => {
    describe('when candidate collides at 0 degress', () => {
      beforeEach(() => {
        setCandidateCircleLocation(11.5, 10.0);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(0.5);
        expect(vector.y).toBeCloseTo(0.0);
      });
    });

    describe('when candidate collides at 45 degress', () => {
      beforeEach(() => {
        setCandidateCircleLocation(11.0606601, 11.0606601);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(0.35355339);
        expect(vector.y).toBeCloseTo(0.35355339);
      });
    });

    describe('when candidate collides at 90 degress', () => {
      beforeEach(() => {
        setCandidateCircleLocation(10.0, 11.5);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(0.0);
        expect(vector.y).toBeCloseTo(0.5);
      });
    });

    describe('when candidate collides at 135 degress', () => {
      beforeEach(() => {
        setCandidateCircleLocation(8.9393399, 11.0606601);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(-0.35355339);
        expect(vector.y).toBeCloseTo(0.35355339);
      });
    });

    describe('when candidate collides at 180 degress', () => {
      beforeEach(() => {
        setCandidateCircleLocation(8.5, 10.0);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(-0.5);
        expect(vector.y).toBeCloseTo(0.0);
      });
    });

    describe('when candidate collides at 225 degress', () => {
      beforeEach(() => {
        setCandidateCircleLocation(8.9393399, 8.9393399);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(-0.35355339);
        expect(vector.y).toBeCloseTo(-0.35355339);
      });
    });

    describe('when candidate collides at 270 degress', () => {
      beforeEach(() => {
        setCandidateCircleLocation(10.0, 8.5);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(0.0);
        expect(vector.y).toBeCloseTo(-0.5);
      });
    });

    describe('when candidate collides at 315 degress', () => {
      beforeEach(() => {
        setCandidateCircleLocation(11.0606601, 8.9393399);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticCircle, candidateCircle);
        expect(vector.x).toBeCloseTo(0.35355339);
        expect(vector.y).toBeCloseTo(-0.35355339);
      });
    });
  });

  describe('when two rectangles collide', () => {
    describe('when candidate collides from the right', () => {
      beforeEach(() => {
        setCandidateRectLocation(11.5, 9.0);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticRect, candidateRect);
        expect(vector.x).toBeCloseTo(0.5);
        expect(vector.y).toBeCloseTo(0.0);
      });
    });

    describe('when candidate collides from the top', () => {
      beforeEach(() => {
        setCandidateRectLocation(9.0, 8.5);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticRect, candidateRect);
        expect(vector.x).toBeCloseTo(0.0);
        expect(vector.y).toBeCloseTo(-0.5);
      });
    });

    describe('when candidate collides from the left', () => {
      beforeEach(() => {
        setCandidateRectLocation(8.5, 11.0);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticRect, candidateRect);
        expect(vector.x).toBeCloseTo(-0.5);
        expect(vector.y).toBeCloseTo(0.0);
      });
    });

    describe('when candidate collides from the bottom', () => {
      beforeEach(() => {
        setCandidateRectLocation(11.0, 11.5);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticRect, candidateRect);
        expect(vector.x).toBeCloseTo(0.0);
        expect(vector.y).toBeCloseTo(0.5);
      });
    });
  });

  describe('when circle and rectangle collide', () => {
    describe('when candidate collides with the right edge', () => {
      beforeEach(() => {
        setCandidateCircleLocation(11.5, 10.0);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(0.5);
        expect(vector.y).toBeCloseTo(0.0);
      });

      test('should return opposite escape vector when flipped', () => {
        const vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(-0.5);
        expect(vector.y).toBeCloseTo(0.0);
      });
    });

    describe('when candidate collides with the bottom edge', () => {
      beforeEach(() => {
        setCandidateCircleLocation(10.0, 11.5);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(0.0);
        expect(vector.y).toBeCloseTo(0.5);
      });

      test('should return opposite escape vector when flipped', () => {
        const vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(0.0);
        expect(vector.y).toBeCloseTo(-0.5);
      });
    });

    describe('when candidate collides with the left edge', () => {
      beforeEach(() => {
        setCandidateCircleLocation(8.5, 10.0);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(-0.5);
        expect(vector.y).toBeCloseTo(0.0);
      });

      test('should return opposite escape vector when flipped', () => {
        const vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(0.5);
        expect(vector.y).toBeCloseTo(0.0);
      });
    });

    describe('when candidate collides with the top edge', () => {
      beforeEach(() => {
        setCandidateCircleLocation(10.0, 8.5);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(0.0);
        expect(vector.y).toBeCloseTo(-0.5);
      });

      test('should return opposite escape vector when flipped', () => {
        const vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(0.0);
        expect(vector.y).toBeCloseTo(0.5);
      });
    });

    describe('when candidate collides with the bottom-right corner', () => {
      beforeEach(() => {
        setCandidateCircleLocation(11.3535533, 11.3535533);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(0.3535533);
        expect(vector.y).toBeCloseTo(0.3535533);
      });

      test('should return opposite escape vector when flipped', () => {
        const vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(-0.3535533);
        expect(vector.y).toBeCloseTo(-0.3535533);
      });
    });

    describe('when candidate collides with the bottom-left corner', () => {
      beforeEach(() => {
        setCandidateCircleLocation(8.6464467, 11.3535533);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(-0.3535533);
        expect(vector.y).toBeCloseTo(0.3535533);
      });

      test('should return opposite escape vector when flipped', () => {
        const vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(0.3535533);
        expect(vector.y).toBeCloseTo(-0.3535533);
      });
    });

    describe('when candidate collides with the top-left corner', () => {
      beforeEach(() => {
        setCandidateCircleLocation(8.6464467, 8.6464467);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(-0.3535533);
        expect(vector.y).toBeCloseTo(-0.3535533);
      });

      test('should return opposite escape vector when flipped', () => {
        const vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(0.3535533);
        expect(vector.y).toBeCloseTo(0.3535533);
      });
    });

    describe('when candidate collides with the top-right corner', () => {
      beforeEach(() => {
        setCandidateCircleLocation(11.3535533, 8.6464467);
      });

      test('should return correct escape vector', () => {
        const vector = evaluator.getEscapeVector(staticRect, candidateCircle);
        expect(vector.x).toBeCloseTo(0.3535533);
        expect(vector.y).toBeCloseTo(-0.3535533);
      });

      test('should return opposite escape vector when flipped', () => {
        const vector = evaluator.getEscapeVector(candidateCircle, staticRect);
        expect(vector.x).toBeCloseTo(-0.3535533);
        expect(vector.y).toBeCloseTo(0.3535533);
      });
    });
  });
});
