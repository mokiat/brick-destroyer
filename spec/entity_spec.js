describe("LocationFeature", function() {
  var epsilon = 0.0001;
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
  var epsilon = 0.0001;
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
