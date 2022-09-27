import Collision from './Collision';
import Circle from '../../shape/Circle';

describe('Collision', () => {
  let component;

  describe('when a default one is created', () => {
    beforeEach(() => {
      component = new Collision();
    });

    test('has default mass of 1.0', () => {
      expect(component.mass).toBeCloseTo(1.0);
    });

    test('has default friction of 0.2', () => {
      expect(component.friction).toBeCloseTo(0.2);
    });

    test('has default deflection of 0.8', () => {
      expect(component.deflection).toBeCloseTo(0.8);
    });

    test('has no shape by default', () => {
      expect(component.shape).toBeNull();
    });
  });

  describe('when a config-based one is created', () => {
    let shape;

    beforeEach(() => {
      shape = new Circle({
        radius: 5.4,
      });
      component = new Collision({
        mass: 8.9,
        friction: 0.0,
        deflection: 0.1,
        shape: shape,
      });
    });

    test('has mass set accordingly', () => {
      expect(component.mass).toBeCloseTo(8.9);
    });

    test('has friction set accordingly', () => {
      expect(component.friction).toBeCloseTo(0.0);
    });

    test('has deflection set accordingly', () => {
      expect(component.deflection).toBeCloseTo(0.1);
    });

    test('has shape set accordingly', () => {
      expect(component.shape).toEqual(shape);
    });
  });
});
