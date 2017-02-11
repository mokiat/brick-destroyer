describe("Shape", function() {
  var decimalPoints = 4;

  describe("Circle", function() {
    var circle;

    describe("when default circle is created", function() {
      beforeEach(function() {
        circle = new shapes.Circle();
      });

      it("has default radius of 1.0", function() {
        expect(circle.radius).toBeCloseTo(1.0, decimalPoints);
      });
    });

    describe("when circle's data is initialized via constructor", function() {
      beforeEach(function() {
        circle = new shapes.Circle({
          radius: 2.5,
        });
      });

      it("the radius is configured accordingly", function() {
        expect(circle.radius).toBeCloseTo(2.5, decimalPoints);
      });
    });

    describe("given a circle", function() {
      beforeEach(function() {
        circle = new shapes.Circle();
        circle.radius = 32.0;
      });

      it("the closest point distance should equal the radius", function() {
        expect(circle.getClosestPointDistance()).toBeCloseTo(32.0, decimalPoints);
      });

      it("the furthest point distance should equal the radius", function() {
        expect(circle.getFurthestPointDistance()).toBeCloseTo(32.0, decimalPoints);
      });
    });
  });

  describe("Rectangle", function() {
    var rectangle;

    describe("when default rectangle is created", function() {
      beforeEach(function() {
        rectangle = new shapes.Rectangle();
      });

      it("has default width of 2.0", function() {
        expect(rectangle.width).toBeCloseTo(2.0, decimalPoints);
      });

      it("has default height of 1.0", function() {
        expect(rectangle.height).toBeCloseTo(1.0, decimalPoints);
      });
    });

    describe("when rectangle's data is initialized via constructor", function() {
      beforeEach(function() {
        rectangle = new shapes.Rectangle({
          width: 2.5,
          height: 1.3
        });
      });

      it("the width is configured accordingly", function() {
        expect(rectangle.width).toBeCloseTo(2.5, decimalPoints);
      });

      it("the height is configured accordingly", function() {
        expect(rectangle.height).toBeCloseTo(1.3, decimalPoints);
      });
    });

    describe("given a rectangle", function() {
      var wideRectangle;
      var tallRectangle;

      beforeEach(function() {
        wideRectangle = new shapes.Rectangle();
        wideRectangle.width = 4.6;
        wideRectangle.height = 2.4;
        tallRectangle = new shapes.Rectangle();
        tallRectangle.width = 2.4;
        tallRectangle.height = 4.6;
      });

      it("is possible to get half of the width", function() {
        expect(wideRectangle.getHalfWidth()).toBeCloseTo(2.3, decimalPoints);
      });

      it("is possible to get half of the height", function() {
        expect(wideRectangle.getHalfHeight()).toBeCloseTo(1.2, decimalPoints);
      });

      it("the closest point distance should equal half of the shortest side", function() {
        expect(wideRectangle.getClosestPointDistance()).toBeCloseTo(1.2, decimalPoints);
        expect(tallRectangle.getClosestPointDistance()).toBeCloseTo(1.2, decimalPoints);
      });

      it("the furthest point distance equal the distance to any of the corners", function() {
        expect(wideRectangle.getFurthestPointDistance()).toBeCloseTo(2.594224354, decimalPoints);
        expect(tallRectangle.getFurthestPointDistance()).toBeCloseTo(2.594224354, decimalPoints);
      });
    });
  });
});
