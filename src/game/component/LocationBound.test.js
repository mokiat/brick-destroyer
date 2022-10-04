import LocationBound from './LocationBound';

describe('LocationBound', () => {
  let component;

  describe('when a default one is created', () => {
    beforeEach(() => {
      component = new LocationBound();
    });

    test('has a very negative min X', () => {
      expect(component.minX).toBeCloseTo(-5000.0);
    });

    test('has a very positive max X', () => {
      expect(component.maxX).toBeCloseTo(5000.0);
    });

    test('has a very negative min Y', () => {
      expect(component.minY).toBeCloseTo(-5000.0);
    });

    test('has a very positive max Y', () => {
      expect(component.maxY).toBeCloseTo(5000.0);
    });
  });

  describe('when a config-based one is created', () => {
    beforeEach(() => {
      component = new LocationBound({
        minX: -13.2,
        maxX: 15.8,
        minY: -8.5,
        maxY: 3.9,
      });
    });

    test('has min X set accordingly', () => {
      expect(component.minX).toBeCloseTo(-13.2);
    });

    test('has max X set accordingly', () => {
      expect(component.maxX).toBeCloseTo(15.8);
    });

    test('has min Y set accordingly', () => {
      expect(component.minY).toBeCloseTo(-8.5);
    });

    test('has max Y set accordingly', () => {
      expect(component.maxY).toBeCloseTo(3.9);
    });
  });
});
