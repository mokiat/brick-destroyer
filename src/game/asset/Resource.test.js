import Resource from './Resource';

describe('Resource', () => {
  let resource;

  beforeEach(() => {
    resource = new Resource();
  });

  test('is not loaded by default', () => {
    expect(resource.isLoaded).toBeFalsy();
  });

  describe('when resource is loaded', () => {
    beforeEach(() => {
      resource.setLoaded(true);
    });

    test('is loaded', () => {
      expect(resource.isLoaded).toBeTruthy();
    });
  });
});
