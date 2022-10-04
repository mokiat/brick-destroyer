import SpawnOnDestroy from './SpawnOnDestroy';

describe('SpawnOnDestroy', () => {
  let component;

  describe('when a default one is created', () => {
    beforeEach(() => {
      component = new SpawnOnDestroy();
    });

    test('has an empty definition', () => {
      expect(component.definition).toEqual({});
    });
  });

  describe('when a config-based one is created', () => {
    beforeEach(() => {
      component = new SpawnOnDestroy({
        definition: {
          some_component: {
            some_key: 'some_value',
          },
        },
      });
    });

    test('has a definition accordingly', () => {
      expect(component.definition).toEqual({
        some_component: {
          some_key: 'some_value',
        },
      });
    });
  });
});
