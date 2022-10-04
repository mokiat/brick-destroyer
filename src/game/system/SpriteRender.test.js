import SpriteRender from './SpriteRender';
import EntityManager from '../../ecs/Manager';
import Resource from '../asset/Resource';
import Vector from '../../math/Vector';
import Sprite from '../component/Sprite';
import Location from '../component/Location';

describe('SpriteRenderSystem', () => {
  let manager;
  let entity;
  let system;
  let renderer;
  let image;

  beforeEach(() => {
    manager = new EntityManager();

    renderer = {
      drawScaledImage: () => {},
    };
    jest.spyOn(renderer, 'drawScaledImage');

    image = new Resource();

    system = new SpriteRender(manager, renderer);
    manager.addSystem(system);

    entity = manager.createEntity();

    entity.addComponent(
      'location',
      new Location({
        location: new Vector(5.4, 4.6),
      })
    );

    entity.addComponent(
      'sprite',
      new Sprite({
        width: 64,
        height: 32,
        image: image,
      })
    );
  });

  describe('when updated', () => {
    beforeEach(() => {
      manager.update(1.0);
    });

    test('entities are renderered', () => {
      expect(renderer.drawScaledImage).toHaveBeenCalledWith(
        image,
        -27,
        -12,
        64,
        32
      );
    });
  });
});
