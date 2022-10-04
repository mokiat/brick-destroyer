import EntityFactory from './Entity';
import EntityManager from '../../ecs/Manager';
import Entity from '../../ecs/Entity';
import Resource from '../asset/Resource';
import Collection from '../asset/Collection';
import Circle from '../../shape/Circle';
import Rectangle from '../../shape/Rectangle';

describe('Entity', () => {
  let resourceCollection;
  let factory;
  let entity;

  beforeEach(() => {
    const manager = new EntityManager();
    resourceCollection = new Collection();
    factory = new EntityFactory(manager, resourceCollection);
  });

  describe('when definition is empty', () => {
    beforeEach(() => {
      entity = factory.createEntity({});
    });

    test('an empty entity should have been created', () => {
      expect(entity).toBeDefined();
      expect(entity instanceof Entity).toBeTruthy();
    });
  });

  describe('when definition has location', () => {
    beforeEach(() => {
      entity = factory.createEntity({
        location: {
          x: 21.3,
          y: 36.7,
        },
      });
    });

    test('an entity with location component should have been created', () => {
      expect(entity.hasComponent('location')).toBeTruthy();
      const component = entity.getComponent('location');
      expect(component.location.x).toBeCloseTo(21.3);
      expect(component.location.y).toBeCloseTo(36.7);
    });
  });

  describe('when definition has motion', () => {
    beforeEach(() => {
      entity = factory.createEntity({
        motion: {
          speed: {
            x: 1.2,
            y: 3.4,
          },
        },
      });
    });

    test('an entity with motion component should have been created', () => {
      expect(entity.hasComponent('motion')).toBeTruthy();
      const component = entity.getComponent('motion');
      expect(component.speed.x).toBeCloseTo(1.2);
      expect(component.speed.y).toBeCloseTo(3.4);
    });
  });

  describe('when definition has collision with circle shape', () => {
    beforeEach(() => {
      entity = factory.createEntity({
        collision: {
          deflection: 0.6,
          friction: 0.4,
          mass: 0.5,
          shape_circle: {
            radius: 0.3,
          },
        },
      });
    });

    test('an entity with collision component with circle shape should have been created', () => {
      expect(entity.hasComponent('collision')).toBeTruthy();
      const component = entity.getComponent('collision');
      expect(component.deflection).toBeCloseTo(0.6);
      expect(component.friction).toBeCloseTo(0.4);
      expect(component.mass).toBeCloseTo(0.5);
      expect(component.shape instanceof Circle).toBeTruthy();
      const shape = component.shape;
      expect(shape.radius).toBeCloseTo(0.3);
    });
  });

  describe('when definition has collision with rectangle shape', () => {
    beforeEach(() => {
      entity = factory.createEntity({
        collision: {
          deflection: 0.6,
          friction: 0.4,
          mass: 0.5,
          shape_rectangle: {
            width: 81.3,
            height: 35.2,
          },
        },
      });
    });

    test('an entity with collision component with rectangle shape should have been created', () => {
      expect(entity.hasComponent('collision')).toBeTruthy();
      const component = entity.getComponent('collision');
      expect(component.deflection).toBeCloseTo(0.6);
      expect(component.friction).toBeCloseTo(0.4);
      expect(component.mass).toBeCloseTo(0.5);
      expect(component.shape instanceof Rectangle).toBeTruthy();
      const shape = component.shape;
      expect(shape.width).toBeCloseTo(81.3);
      expect(shape.height).toBeCloseTo(35.2);
    });
  });

  describe('when definition has sprite', () => {
    let image;

    beforeEach(() => {
      image = new Resource();
      resourceCollection.register('some_image', image);

      entity = factory.createEntity({
        sprite: {
          width: 32,
          height: 64,
          image: 'some_image',
        },
      });
    });

    test('an entity with sprite component should have been created', () => {
      expect(entity.hasComponent('sprite')).toBeTruthy();
      const component = entity.getComponent('sprite');
      expect(component.width).toEqual(32);
      expect(component.height).toEqual(64);
      expect(component.image).toEqual(image);
    });
  });

  describe('when definition has mouseBound', () => {
    beforeEach(() => {
      entity = factory.createEntity({
        mouseBound: {
          axisX: false,
          axisY: true,
        },
      });
    });

    test('an entity with mouseBound component should have been created', () => {
      expect(entity.hasComponent('mouseBound')).toBeTruthy();
      const component = entity.getComponent('mouseBound');
      expect(component.axisXBound).toBeFalsy();
      expect(component.axisYBound).toBeTruthy();
    });
  });

  describe('when definition has locationBound', () => {
    beforeEach(() => {
      entity = factory.createEntity({
        locationBound: {
          minX: -1.1,
          maxX: 2.2,
          minY: -3.3,
          maxY: 4.4,
        },
      });
    });

    test('an entity with locationBound component should have been created', () => {
      expect(entity.hasComponent('locationBound')).toBeTruthy();
      const component = entity.getComponent('locationBound');
      expect(component.minX).toBeCloseTo(-1.1);
      expect(component.maxX).toBeCloseTo(2.2);
      expect(component.minY).toBeCloseTo(-3.3);
      expect(component.maxY).toBeCloseTo(4.4);
    });
  });

  describe('when definition has destroyOnHit', () => {
    beforeEach(() => {
      entity = factory.createEntity({
        destroyOnHit: {},
      });
    });

    test('an entity with destroyOnHit component should have been created', () => {
      expect(entity.hasComponent('destroyOnHit')).toBeTruthy();
    });
  });

  describe('when definition has spawnOnDestroy', () => {
    beforeEach(() => {
      entity = factory.createEntity({
        spawnOnDestroy: {
          definition: {
            location: {
              x: 6.5,
              y: 3.4,
            },
          },
        },
      });
    });

    test('an entity with spawnOnDestory component should have been created', () => {
      expect(entity.hasComponent('spawnOnDestroy')).toBeTruthy();
      const component = entity.getComponent('spawnOnDestroy');
      expect(component.definition).toEqual({
        location: {
          x: 6.5,
          y: 3.4,
        },
      });
    });
  });

  describe('when definition has bounceToggleable', () => {
    let sliderOnImage;
    let sliderOffImage;

    beforeEach(() => {
      sliderOnImage = new Resource();
      resourceCollection.register('slider_on', sliderOnImage);

      sliderOffImage = new Resource();
      resourceCollection.register('slider_off', sliderOffImage);

      entity = factory.createEntity({
        bounceToggleable: {
          activeImage: 'slider_on',
          inactiveImage: 'slider_off',
          deflection: {
            x: 0.3,
            y: 0.4,
          },
        },
      });
    });

    test('an entity with bounceToggleable component should have been created', () => {
      expect(entity.hasComponent('bounceToggleable')).toBeTruthy();
      const component = entity.getComponent('bounceToggleable');
      expect(component.activeImage).toBe(sliderOnImage);
      expect(component.inactiveImage).toBe(sliderOffImage);
      expect(component.deflection.x).toBeCloseTo(0.3);
      expect(component.deflection.y).toBeCloseTo(0.4);
    });
  });

  describe('when definition has shouldDestroy', () => {
    beforeEach(() => {
      entity = factory.createEntity({
        shouldDestroy: {},
      });
    });

    test('an entity with shouldDestroy component should have been created', () => {
      expect(entity.hasComponent('shouldDestroy')).toBeTruthy();
    });
  });

  describe('when definition has shouldNotDestroy', () => {
    beforeEach(() => {
      entity = factory.createEntity({
        shouldNotDestroy: {},
      });
    });

    test('an entity with shouldNotDestroy component should have been created', () => {
      expect(entity.hasComponent('shouldNotDestroy')).toBeTruthy();
    });
  });

  describe('when definition has timerDestroy', () => {
    beforeEach(() => {
      entity = factory.createEntity({
        timerDestroy: {
          timeout: 5.4,
        },
      });
    });

    test('an entity with timerDestroy component should have been created', () => {
      expect(entity.hasComponent('timerDestroy')).toBeTruthy();
      const component = entity.getComponent('timerDestroy');
      expect(component.timeout).toBeCloseTo(5.4);
    });
  });

  describe('when definition has destroyOnExplode', () => {
    beforeEach(() => {
      entity = factory.createEntity({
        destroyOnExplode: {},
      });
    });

    test('an entity with destroyOnExplode component should have been created', () => {
      expect(entity.hasComponent('destroyOnExplode')).toBeTruthy();
    });
  });

  describe('when definition has explodeOnDestroy', () => {
    beforeEach(() => {
      entity = factory.createEntity({
        explodeOnDestroy: {
          explosionRadius: 8.2,
        },
      });
    });

    test('an entity with explodeOnDestroy component should have been created', () => {
      expect(entity.hasComponent('explodeOnDestroy')).toBeTruthy();
      const component = entity.getComponent('explodeOnDestroy');
      expect(component.explosionRadius).toBeCloseTo(8.2);
    });
  });
});
