import Vector from '../../math/Vector';
import Location from './Location';

describe('Location', () => {
  let component;

  describe('when a default one is created', () => {
    beforeEach(() => {
      component = new Location();
    });

    test('has default location of 0.0/0.0', () => {
      expect(component.location.x).toBeCloseTo(0.0);
      expect(component.location.y).toBeCloseTo(0.0);
    });
  });

  describe('when a config-based one is created', () => {
    beforeEach(() => {
      component = new Location({
        location: new Vector(1.2, 3.4),
      });
    });

    test('has location set accordingly', () => {
      expect(component.location.x).toBeCloseTo(1.2);
      expect(component.location.y).toBeCloseTo(3.4);
    });
  });
});
