import MouseBound from './MouseBound';

describe('MouseBound', () => {
  let component;

  describe('when a default one is created', () => {
    beforeEach(() => {
      component = new MouseBound();
    });

    test('has axis X bound by default', () => {
      expect(component.axisXBound).toBeTruthy();
    });

    test('has axis Y bound by default', () => {
      expect(component.axisYBound).toBeTruthy();
    });
  });

  describe('when a config-based one is created', () => {
    beforeEach(() => {
      component = new MouseBound({
        axisXBound: false,
        axisYBound: false,
      });
    });

    test('has axis X bound set accordingly', () => {
      expect(component.axisXBound).toBeFalsy();
    });

    test('has axis Y bound set accordingly', () => {
      expect(component.axisYBound).toBeFalsy();
    });
  });
});
