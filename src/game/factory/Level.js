import Image from '../graphics/Image';

class LevelFactory {
  constructor(entityFactory, resourceCollection) {
    this.entityFactory = entityFactory;
    this.resourceCollection = resourceCollection;
  }

  applyLevel(level) {
    const images = this.getImagesFromLevel(level);
    for (const name in images) {
      const path = images[name];
      const image = new Image(path);
      this.resourceCollection.register(name, image);
    }

    const types = this.getTypesFromLevel(level);
    for (const name in types) {
      const typeDefinition = types[name];
      types[name] = this.expandDefinition(typeDefinition, types);
    }

    const entities = this.getEntitiesFromLevel(level);
    for (const index in entities) {
      let entityDefinition = entities[index];
      entityDefinition = this.expandDefinition(entityDefinition, types);
      this.entityFactory.createEntity(entityDefinition);
    }
  }

  getImagesFromLevel(level) {
    if (level.images === undefined) {
      return {};
    }
    return level.images;
  }

  getTypesFromLevel(level) {
    if (level.types === undefined) {
      return {};
    }
    return level.types;
  }

  getEntitiesFromLevel(level) {
    if (level.entities === undefined) {
      return [];
    }
    return level.entities;
  }

  expandDefinition(definition, types) {
    let resultDefinition = {};
    if (definition.types !== undefined) {
      for (let typeName of definition.types) {
        resultDefinition = {
          ...resultDefinition,
          ...types[typeName],
        };
      }
    }
    resultDefinition = {
      ...resultDefinition,
      ...definition,
    };
    for (const key in resultDefinition) {
      const property = resultDefinition[key];
      if (typeof property === 'object') {
        resultDefinition[key] = this.expandDefinition(property, types);
      }
    }
    if (resultDefinition.types !== undefined) {
      delete resultDefinition['types'];
    }
    return resultDefinition;
  }
}

export default LevelFactory;
