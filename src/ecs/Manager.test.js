import Manager from './Manager';
import Event from './Event';

describe('Manager', () => {
  let manager;

  beforeEach(() => {
    manager = new Manager();
  });

  test('it is possible to create entities', () => {
    const entity = manager.createEntity();
    expect(entity).toBeDefined();
  });

  describe('when multiple entities are created', () => {
    let firstEntity;
    let secondEntity;

    beforeEach(() => {
      firstEntity = manager.createEntity();
      secondEntity = manager.createEntity();
    });

    test('is possible to list those entities', () => {
      const entities = manager.listEntities();
      expect(entities).toContain(firstEntity);
      expect(entities).toContain(secondEntity);
    });

    describe('when an entity is deleted', () => {
      beforeEach(() => {
        manager.deleteEntity(firstEntity);
      });

      test('that entity is no longer accessible', () => {
        const entities = manager.listEntities();
        expect(entities).not.toContain(firstEntity);
      });

      test('other entities are still accessible', () => {
        const entities = manager.listEntities();
        expect(entities).toContain(secondEntity);
      });
    });

    describe('when all entities are deleted', () => {
      beforeEach(() => {
        manager.deleteAllEntities();
      });

      test('the manager holds zero entities', () => {
        const entities = manager.listEntities();
        expect(entities.length).toEqual(0);
      });
    });
  });

  describe('when entities are being filtered', () => {
    let firstEntity;
    let secondEntity;
    let thirdEntity;
    let firstComponent;
    let secondComponent;

    beforeEach(() => {
      firstComponent = { id: 'first' };
      secondComponent = { id: 'second' };

      firstEntity = manager.createEntity();
      firstEntity.addComponent('location', firstComponent);

      secondEntity = manager.createEntity();
      secondEntity.addComponent('motion', secondComponent);

      thirdEntity = manager.createEntity();
      thirdEntity.addComponent('location', firstComponent);
      thirdEntity.addComponent('motion', secondComponent);
    });

    test('it is possible to get only specific entities', () => {
      let entities = manager.filterEntities(['location']);
      expect(entities.length).toEqual(2);
      expect(entities).toContain(firstEntity);
      expect(entities).toContain(thirdEntity);

      entities = manager.filterEntities(['motion']);
      expect(entities.length).toEqual(2);
      expect(entities).toContain(secondEntity);
      expect(entities).toContain(thirdEntity);

      entities = manager.filterEntities(['location', 'motion']);
      expect(entities.length).toEqual(1);
      expect(entities).toContain(thirdEntity);
    });
  });

  describe('when a listener is subscribed for events', () => {
    let matchingEntity;
    let nonmatchingEntity;
    let listener;
    let event;

    beforeEach(() => {
      matchingEntity = manager.createEntity();
      matchingEntity.addComponent('location', {});
      matchingEntity.addComponent('motion', {});

      nonmatchingEntity = manager.createEntity();
      nonmatchingEntity.addComponent('location', {});

      listener = {
        onEvent: () => {},
      };
      jest.spyOn(listener, 'onEvent');

      manager.subscribe(['location', 'motion'], listener.onEvent);

      event = new Event();
    });

    describe('when a matching entity throws an event', () => {
      beforeEach(() => {
        matchingEntity.throwEvent(event);
      });

      test('the listener is called', () => {
        expect(listener.onEvent).toHaveBeenCalledWith(matchingEntity, event);
      });
    });

    describe('when a non-matching entity throws an event', () => {
      beforeEach(() => {
        nonmatchingEntity.throwEvent(event);
      });

      test('the listener is not called', () => {
        expect(listener.onEvent).not.toHaveBeenCalled();
      });
    });

    describe('when the listener is no longer subscribed', () => {
      beforeEach(() => {
        manager.unsubscribe(listener.onEvent);
      });

      describe('when a previously matching entity throws an event', () => {
        beforeEach(() => {
          matchingEntity.throwEvent(event);
        });

        test('the listener is not called', () => {
          expect(listener.onEvent).not.toHaveBeenCalled();
        });
      });
    });
  });
});
