import Collection from './Collection';
import Resource from './Resource';

describe('Collection', () => {
  let collection;

  beforeEach(() => {
    collection = new Collection();
  });

  test('collection is loaded by default', () => {
    expect(collection.isLoaded).toBeTruthy();
  });

  test('collection returns undefined when finding missing resource', () => {
    expect(collection.find('missing')).toBeUndefined();
  });

  describe('when resources are registered', () => {
    let firstResource;
    let secondResource;

    beforeEach(() => {
      firstResource = new Resource();
      collection.register('first', firstResource);
      secondResource = new Resource();
      collection.register('second', secondResource);
    });

    test('is possible to find resources', () => {
      expect(collection.find('first')).toEqual(firstResource);
      expect(collection.find('second')).toEqual(secondResource);
    });

    describe('when all resources are not loaded', () => {
      test('collection is not loaded', () => {
        expect(collection.isLoaded).toBeFalsy();
      });
    });

    describe('when some of the resources are not loaded', () => {
      beforeEach(() => {
        secondResource.setLoaded(true);
      });

      test('collection is not loaded', () => {
        expect(collection.isLoaded).toBeFalsy();
      });
    });

    describe('when all resources are loaded', () => {
      beforeEach(() => {
        firstResource.setLoaded(true);
        secondResource.setLoaded(true);
      });

      test('collection is loaded', () => {
        expect(collection.isLoaded).toBeTruthy();
      });
    });

    describe('when resources are unregistered', () => {
      beforeEach(() => {
        collection.unregister('first');
        collection.unregister('second');
      });

      test('resources cannot be found anymore', () => {
        expect(collection.find('first')).toBeUndefined();
        expect(collection.find('second')).toBeUndefined();
      });

      test('collection is loaded', () => {
        expect(collection.isLoaded).toBeTruthy();
      });
    });
  });
});
