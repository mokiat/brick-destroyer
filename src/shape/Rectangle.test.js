import Rectangle from './Rectangle';

describe('Rectangle', () => {
  let rectangle;

  describe('when default rectangle is created', () => {
    beforeEach(() => {
      rectangle = new Rectangle();
    });

    test('it has default width of 2.0', () => {
      expect(rectangle.width).toBeCloseTo(2.0);
    });

    test('it has default height of 1.0', () => {
      expect(rectangle.height).toBeCloseTo(1.0);
    });
  });

  describe("when rectangle's data is initialized via constructor", () => {
    beforeEach(() => {
      rectangle = new Rectangle({
        width: 2.5,
        height: 1.3,
      });
    });

    test('the width is configured accordingly', () => {
      expect(rectangle.width).toBeCloseTo(2.5);
    });

    test('the height is configured accordingly', () => {
      expect(rectangle.height).toBeCloseTo(1.3);
    });
  });

  describe('given a rectangle', () => {
    var wideRectangle;
    var tallRectangle;

    beforeEach(() => {
      wideRectangle = new Rectangle();
      wideRectangle.width = 4.6;
      wideRectangle.height = 2.4;
      tallRectangle = new Rectangle();
      tallRectangle.width = 2.4;
      tallRectangle.height = 4.6;
    });

    test('it is possible to get half of the width', () => {
      expect(wideRectangle.halfWidth).toBeCloseTo(2.3);
    });

    test('it is possible to get half of the height', () => {
      expect(wideRectangle.halfHeight).toBeCloseTo(1.2);
    });

    test('the closest point distance should equal half of the shortest side', () => {
      expect(wideRectangle.closestPointDistance).toBeCloseTo(1.2);
      expect(tallRectangle.closestPointDistance).toBeCloseTo(1.2);
    });

    test('the furthest point distance equal the distance to any of the corners', () => {
      expect(wideRectangle.furthestPointDistance).toBeCloseTo(2.594224354);
      expect(tallRectangle.furthestPointDistance).toBeCloseTo(2.594224354);
    });
  });
});
