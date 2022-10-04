import Sprite from './Sprite';
import Resource from '../asset/Resource';

describe('Sprite', () => {
  let component;

  describe('when a default one is created', () => {
    beforeEach(() => {
      component = new Sprite();
    });

    test('has default sprite width of 0', () => {
      expect(component.width).toEqual(0);
    });

    test('has default sprite height of 0', () => {
      expect(component.height).toEqual(0);
    });

    test('has no image by default', () => {
      expect(component.image).toBeNull();
    });
  });

  describe('when a config-based one is created', () => {
    var image;

    beforeEach(() => {
      image = new Resource();
      component = new Sprite({
        width: 32,
        height: 64,
        image: image,
      });
    });

    test('has sprite width set accordingly', () => {
      expect(component.width).toEqual(32);
    });

    test('has sprite height set accordingly', () => {
      expect(component.height).toEqual(64);
    });

    test('has image set accordingly', () => {
      expect(component.image).toEqual(image);
    });
  });
});
