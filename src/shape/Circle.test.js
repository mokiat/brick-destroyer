import Circle from './Circle';

describe('Circle', () => {
  let circle;

  describe('when default circle is created', () => {
    beforeEach(() => {
      circle = new Circle();
    });

    test('it has default radius of 1.0', () => {
      expect(circle.radius).toBeCloseTo(1.0);
    });
  });

  describe("when circle's data is initialized via constructor", () => {
    beforeEach(() => {
      circle = new Circle({
        radius: 2.5,
      });
    });

    test('the radius is configured accordingly', () => {
      expect(circle.radius).toBeCloseTo(2.5);
    });
  });

  describe('given a circle', () => {
    beforeEach(() => {
      circle = new Circle();
      circle.radius = 32.0;
    });

    test('the closest point distance should equal the radius', () => {
      expect(circle.closestPointDistance).toBeCloseTo(32.0);
    });

    test('the furthest point distance should equal the radius', () => {
      expect(circle.furthestPointDistance).toBeCloseTo(32.0);
    });
  });
});
