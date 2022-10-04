import TimerDestroy from './TimerDestroy';

describe('TimerDestroy', () => {
  let component;

  describe('when a default one is created', () => {
    beforeEach(() => {
      component = new TimerDestroy();
    });

    test('has a default timeout of 10 seconds', () => {
      expect(component.timeout).toBeCloseTo(10.0);
    });
  });

  describe('when a config-based one is created', () => {
    beforeEach(() => {
      component = new TimerDestroy({
        timeout: 1.5,
      });
    });

    test('has timeout set accordingly', () => {
      expect(component.timeout).toBeCloseTo(1.5);
    });
  });
});
