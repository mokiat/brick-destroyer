import BounceToggleable from './BounceToggleable';
import Resource from '../asset/Resource';
import Vector from '../../math/Vector';

describe('BounceToggleable', () => {
  let component;

  describe('when a default one is created', () => {
    beforeEach(() => {
      component = new BounceToggleable();
    });

    test('has no active image', () => {
      expect(component.activeImage).toBeNull();
    });

    test('has no inactive image', () => {
      expect(component.inactiveImage).toBeNull();
    });

    test('has horizontal deflection set to 0.1 by default', () => {
      expect(component.deflection.x).toBeCloseTo(0.1);
    });

    test('has vertical deflection set to 0.1 by default', () => {
      expect(component.deflection.y).toBeCloseTo(0.1);
    });
  });

  describe('when a config-based one is created', () => {
    let activeImage;
    let inactiveImage;

    beforeEach(() => {
      activeImage = new Resource();
      inactiveImage = new Resource();

      component = new BounceToggleable({
        activeImage: activeImage,
        inactiveImage: inactiveImage,
        deflection: new Vector(7.6, 5.3),
      });
    });

    test('has active image set accordingly', () => {
      expect(component.activeImage).toBe(activeImage);
    });

    test('has inactive image set accordingly', () => {
      expect(component.inactiveImage).toBe(inactiveImage);
    });

    test('has horizontal deflection set accordingly', () => {
      expect(component.deflection.x).toBeCloseTo(7.6);
    });

    test('has vertical deflection set accordingly', () => {
      expect(component.deflection.y).toBeCloseTo(5.3);
    });
  });
});
