class Vector {
  constructor(vector) {
    if (vector instanceof Vector) {
      this.x = vector.x;
      this.y = vector.y;
    } else {
      const [x = 0.0, y = 0.0] = arguments;
      this.x = x;
      this.y = y;
    }
  }

  inc(vector) {
    if (vector instanceof Vector) {
      return new Vector(this.x + vector.x, this.y + vector.y);
    } else {
      const [x = 0.0, y = 0.0] = arguments;
      return new Vector(this.x + x, this.y + y);
    }
  }

  dec(vector) {
    if (vector instanceof Vector) {
      return new Vector(this.x - vector.x, this.y - vector.y);
    } else {
      const [x = 0.0, y = 0.0] = arguments;
      return new Vector(this.x - x, this.y - y);
    }
  }

  mul(amount) {
    return new Vector(this.x * amount, this.y * amount);
  }

  div(amount) {
    return new Vector(this.x / amount, this.y / amount);
  }

  get squaredLength() {
    return this.x * this.x + this.y * this.y;
  }

  get length() {
    return Math.sqrt(this.squaredLength);
  }

  resize(newLength) {
    const scale = newLength / this.length;
    return this.mul(scale);
  }

  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
}

export default Vector;
