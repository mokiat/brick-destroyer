import Vector from '../../math/Vector';
import Motion from './Motion';

describe('Motion', () => {
  let component;

  describe('when a default one is created', () => {
    beforeEach(() => {
      component = new Motion();
    });

    test('has default speed of 0.0/0.0', () => {
      expect(component.speed.x).toBeCloseTo(0.0);
      expect(component.speed.y).toBeCloseTo(0.0);
    });
  });

  describe('when a config-based one is created', () => {
    beforeEach(() => {
      component = new Motion({
        speed: new Vector(2.3, 4.5),
      });
    });

    test('has speed set accordingly', () => {
      expect(component.speed.x).toBeCloseTo(2.3);
      expect(component.speed.y).toBeCloseTo(4.5);
    });
  });
});
