import LevelFactory from './Level';
import Collection from '../asset/Collection';

describe('LevelFactory', () => {
  let entityFactory;
  let resourceCollection;
  let factory;

  beforeEach(() => {
    entityFactory = {
      createEntity: () => {},
    };
    jest.spyOn(entityFactory, 'createEntity');

    resourceCollection = new Collection();

    factory = new LevelFactory(entityFactory, resourceCollection);
  });

  describe('when an empty level is applied', () => {
    beforeEach(() => {
      factory.applyLevel({});
    });

    test('EntityManager is not used', () => {
      expect(entityFactory.createEntity).not.toHaveBeenCalled();
    });
  });

  describe('when a level with images is applied', () => {
    beforeEach(() => {
      factory.applyLevel({
        images: {
          ball: '/resources/img/ball',
          brick: '/resources/img/brick',
        },
      });
    });

    test('the images should have been registered in the resource collection', () => {
      const ballImage = resourceCollection.find('ball');
      expect(ballImage).toBeDefined();
      expect(ballImage).not.toBeNull();
      expect(ballImage.getPath()).toEqual('/resources/img/ball');

      const brickImage = resourceCollection.find('brick');
      expect(brickImage).toBeDefined();
      expect(brickImage).not.toBeNull();
      expect(brickImage.getPath()).toEqual('/resources/img/brick');
    });
  });

  describe('when a level with an empty entity is applied', () => {
    beforeEach(() => {
      factory.applyLevel({
        entities: [{}],
      });
    });

    test('EntityManager is called with an empty definition', () => {
      expect(entityFactory.createEntity).toHaveBeenCalledTimes(1);
      expect(entityFactory.createEntity).toHaveBeenCalledWith({});
    });
  });

  describe('when a level with an entity with components is applied', () => {
    beforeEach(() => {
      factory.applyLevel({
        entities: [
          {
            location: {
              x: 1.2,
              y: 7.4,
            },
            solid: {},
          },
        ],
      });
    });

    test('EntityManager is called with the correct definition', () => {
      expect(entityFactory.createEntity).toHaveBeenCalledTimes(1);
      expect(entityFactory.createEntity).toHaveBeenCalledWith({
        location: {
          x: 1.2,
          y: 7.4,
        },
        solid: {},
      });
    });
  });

  describe('when a level with multiple entities is applied', () => {
    beforeEach(() => {
      factory.applyLevel({
        entities: [
          {
            location: {
              x: 1.2,
              y: 7.4,
            },
          },
          {
            sprite: {
              image: 'monkey',
            },
          },
        ],
      });
    });

    test('EntityManager is called multiple times with the correct definitions', () => {
      expect(entityFactory.createEntity).toHaveBeenCalledTimes(2);
      expect(entityFactory.createEntity).toHaveBeenNthCalledWith(1, {
        location: {
          x: 1.2,
          y: 7.4,
        },
      });
      expect(entityFactory.createEntity).toHaveBeenNthCalledWith(2, {
        sprite: {
          image: 'monkey',
        },
      });
    });
  });

  describe('when a level with an entity with types is applied', () => {
    beforeEach(() => {
      factory.applyLevel({
        types: {
          locatable: {
            location: {
              x: 1.2,
              y: 7.4,
            },
          },
          drawable: {
            sprite: {
              image: 'donkey',
            },
          },
        },
        entities: [
          {
            types: ['locatable', 'drawable'],
          },
        ],
      });
    });

    test('EntityManager is called with the correct definitions', () => {
      expect(entityFactory.createEntity).toHaveBeenCalledTimes(1);
      expect(entityFactory.createEntity).toHaveBeenCalledWith({
        location: {
          x: 1.2,
          y: 7.4,
        },
        sprite: {
          image: 'donkey',
        },
      });
    });
  });

  describe('when a level with an entity with transitive types is applied', () => {
    beforeEach(() => {
      factory.applyLevel({
        types: {
          base: {
            location: {
              x: 1.2,
              y: 7.4,
            },
          },
          derived: {
            types: ['base'],
            sprite: {
              image: 'donkey',
            },
          },
        },
        entities: [
          {
            types: ['derived'],
          },
        ],
      });
    });

    test('EntityManager is called with the correct definitions', () => {
      expect(entityFactory.createEntity).toHaveBeenCalledTimes(1);
      expect(entityFactory.createEntity).toHaveBeenCalledWith({
        location: {
          x: 1.2,
          y: 7.4,
        },
        sprite: {
          image: 'donkey',
        },
      });
    });
  });
});
