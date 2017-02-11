describe("Vector", function() {
  var epsilon = 0.00001;
  var vector;

  function assertVector(vec, expectedX, expectedY) {
    expect(vec.x).toBeCloseTo(expectedX, epsilon);
    expect(vec.y).toBeCloseTo(expectedY, epsilon);
  }

  beforeEach(function() {
    vector = new math.Vector(2.0, 3.0);
  })

  it("vector has proper values", function() {
    assertVector(vector, 2.0, 3.0);
  });

  it("can be created as copy", function() {
    var copy = new math.Vector(vector);
    assertVector(copy, 2.0, 3.0);
  });

  it("can be created without values", function() {
    var vector = new math.Vector();
    assertVector(vector, 0.0, 0.0);
  });

  it("is possible to increment vector with values", function() {
    var result = vector.inc(3.5, 6.7);
    assertVector(result, 5.5, 9.7);
  });

  it("is possible to increment vector with vector", function() {
    var increment = new math.Vector(3.5, 6.7);
    var result = vector.inc(increment);
    assertVector(result, 5.5, 9.7);
  });

  it("is possible to decrement vector with values", function() {
    var result = vector.dec(2.3, 1.4);
    assertVector(result, -0.3, 1.6);
  });

  it("is possible to decrement vector with vector", function() {
    var decrement = new math.Vector(2.3, 1.4);
    var result = vector.dec(decrement);
    assertVector(result, -0.3, 1.6);
  });

  it("is possible to multiply by value", function() {
    var result = vector.mul(2.0);
    assertVector(result, 4.0, 6.0);
  });

  it("is possible to divide by value", function() {
    var result = vector.div(2.0);
    assertVector(result, 1.0, 1.5);
  });

  it("is possible to get squared length", function() {
    var result = vector.getSquaredLength();
    expect(result).toBeCloseTo(13, epsilon);
  });

  it("is possible to get length", function() {
    var result = vector.getLength();
    expect(result).toBeCloseTo(3.6055512, epsilon);
  });

  it("is possible to get resized vector", function() {
    var result = vector.resize(1.0);
    assertVector(result, 0.55470020, 0.83205031);
  });

  it("is possible to get dot product", function() {
    var other = new math.Vector(4.2, 3.1);
    var result = vector.dotProduct(other);
    expect(result).toBeCloseTo(17.7);
  });
});
