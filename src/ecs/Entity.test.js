import DestroyedEvent from './DestroyedEvent';
import Manager from './Manager';

describe('Entity', () => {
  var manager;
  var entity;

  beforeEach(() => {
    manager = new Manager();
    entity = manager.createEntity();
  });

  test('the entity has an id', () => {
    expect(entity.id).toBeDefined();
  });

  test('the entity has a unique id', () => {
    const otherEntity = manager.createEntity();
    expect(otherEntity.id).not.toEqual(entity.id);
  });

  test('the entity is not destroyed by default', () => {
    expect(entity.isDestroyed).toBeFalsy();
  });

  describe('when the entity is destroyed', () => {
    var listener;

    beforeEach(() => {
      listener = {
        onEvent: () => {},
      };
      jest.spyOn(listener, 'onEvent');
      manager.subscribe([], listener.onEvent);

      entity.destroy();
    });

    test('the entity is destroyed', () => {
      expect(entity.isDestroyed).toBeTruthy();
    });

    test('the entity is no longer registered in the manager', () => {
      const entities = manager.listEntities();
      expect(entities).not.toContain(entity);
    });

    test('a destroy event has been thrown', () => {
      expect(listener.onEvent).toHaveBeenCalledTimes(1);
      expect(listener.onEvent).toHaveBeenCalledWith(
        entity,
        new DestroyedEvent()
      );
    });

    describe('when the entity is destroyed again', () => {
      beforeEach(() => {
        entity.destroy();
      });

      test('a second event is not sent', () => {
        expect(listener.onEvent).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when components are added', () => {
    var firstComponent;
    var secondComponent;

    beforeEach(() => {
      firstComponent = { id: 'first' };
      entity.addComponent('location', firstComponent);

      secondComponent = { id: 'second' };
      entity.addComponent('motion', secondComponent);
    });

    test('it is possible to check whether entity has a component', () => {
      expect(entity.hasComponent('location')).toBeTruthy();
      expect(entity.hasComponent('motion')).toBeTruthy();
      expect(entity.hasComponent('missing')).toBeFalsy();
    });

    test('it is possible to access the components', () => {
      expect(entity.getComponent('location')).toEqual(firstComponent);
      expect(entity.getComponent('motion')).toEqual(secondComponent);
    });

    describe('when a component is removed', () => {
      beforeEach(() => {
        entity.removeComponent('location');
      });

      test('the component is no longer accessible', () => {
        expect(entity.hasComponent('location')).toBeFalsy();
        expect(entity.getComponent('location')).toBeUndefined();
      });

      test('other components are still accessible', () => {
        expect(entity.hasComponent('motion')).toBeTruthy();
        expect(entity.getComponent('motion')).toEqual(secondComponent);
      });
    });
  });
});
