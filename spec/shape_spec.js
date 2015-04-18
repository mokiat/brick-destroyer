describe("Shape", function() {
  var decimalPoints = 4;

  describe("Circle", function() {
    var circle;

    describe("when default circle is created", function() {
      beforeEach(function() {
        circle = new brickdest.shape.Circle();
      });

      it("has default radius of 1.0", function() {
        expect(circle.radius).toBeCloseTo(1.0, decimalPoints);
      });
    });

    describe("when circle's data is initialized via constructor", function() {
      beforeEach(function() {
        circle = new brickdest.shape.Circle({
          radius: 2.5,
        });
      });

      it("the radius is configured accordingly", function() {
        expect(circle.radius).toBeCloseTo(2.5, decimalPoints);
      });
    });

    describe("given a circle", function() {
      beforeEach(function() {
        circle = new brickdest.shape.Circle();
        circle.radius = 32.0;
      });

      it("should be instance of it's constructor", function() {
        expect(circle instanceof brickdest.shape.Circle).toBeTruthy();
      });

      it("should implement the IShape interface", function() {
        expect(brickdest.shape.IShape.isImplementedBy(circle)).toBeTruthy();
      });

      it("the closest point distance should equal the radius", function() {
        expect(circle.getClosestPointDistance()).toBeCloseTo(32.0, decimalPoints);
      });

      it("the furthest point distance should equal the radius", function() {
        expect(circle.getFurthestPointDistance()).toBeCloseTo(32.0, decimalPoints);
      });
    });
  });
});
