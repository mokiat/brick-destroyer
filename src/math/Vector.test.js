import Vector from './Vector';

describe('Vector', () => {
  let vector;

  const assertVector = (vec, expectedX, expectedY) => {
    expect(vec.x).toBeCloseTo(expectedX);
    expect(vec.y).toBeCloseTo(expectedY);
  };

  beforeEach(() => {
    vector = new Vector(2.0, 3.0);
  });

  test('has correct values', () => {
    assertVector(vector, 2.0, 3.0);
  });

  test('has copy constructor', () => {
    const copy = new Vector(vector);
    assertVector(copy, 2.0, 3.0);
  });

  test('can be created without values', () => {
    const vector = new Vector();
    assertVector(vector, 0.0, 0.0);
  });

  test('can be incremented with values', () => {
    const result = vector.inc(3.5, 6.7);
    assertVector(result, 5.5, 9.7);
  });

  test('can be incremented with vector', () => {
    const increment = new Vector(3.5, 6.7);
    const result = vector.inc(increment);
    assertVector(result, 5.5, 9.7);
  });

  test('can be decremented with values', () => {
    const result = vector.dec(2.3, 1.4);
    assertVector(result, -0.3, 1.6);
  });

  test('can be decremented with vector', () => {
    const decrement = new Vector(2.3, 1.4);
    const result = vector.dec(decrement);
    assertVector(result, -0.3, 1.6);
  });

  test('can be multiplied by value', () => {
    const result = vector.mul(2.0);
    assertVector(result, 4.0, 6.0);
  });

  test('can be divided by value', () => {
    const result = vector.div(2.0);
    assertVector(result, 1.0, 1.5);
  });

  test('can return squared length', () => {
    const result = vector.squaredLength;
    expect(result).toBeCloseTo(13);
  });

  test('can return length', () => {
    const result = vector.length;
    expect(result).toBeCloseTo(3.6055512);
  });

  test('can return resized vector', () => {
    const result = vector.resize(1.0);
    assertVector(result, 0.5547002, 0.83205031);
  });

  test('can return dot product', () => {
    const other = new Vector(4.2, 3.1);
    const result = vector.dot(other);
    expect(result).toBeCloseTo(17.7);
  });
});
