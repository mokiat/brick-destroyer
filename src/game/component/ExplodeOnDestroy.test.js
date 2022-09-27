import ExplodeOnDestroy from './ExplodeOnDestroy';

describe('ExplodeOnDestroy', () => {
  let component;

  describe('when a default one is created', () => {
    beforeEach(() => {
      component = new ExplodeOnDestroy();
    });

    test('has a default radius of 100', () => {
      expect(component.explosionRadius).toBeCloseTo(100.0);
    });
  });

  describe('when a config-based one is created', () => {
    beforeEach(() => {
      component = new ExplodeOnDestroy({
        explosionRadius: 15.4,
      });
    });

    test('has explosion radius set accordingly', () => {
      expect(component.explosionRadius).toBeCloseTo(15.4);
    });
  });
});
