describe("LocationFeature", function() {
  var epsilon = 0.0001;
  var feature;

  beforeEach(function() {
    feature = new brickdest.entity.LocationFeature();
  });

  it("default location is 0.0/0.0", function() {
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
