class SpriteRender {
  constructor(manager, renderer) {
    this.manager = manager;
    this.renderer = renderer;
  }

  update(elapsedSeconds) {
    const entities = this.manager.filterEntities(['location', 'sprite']);
    for (const entity of entities) {
      this.renderEntity(entity);
    }
  }

  renderEntity(entity) {
    const location = entity.getComponent('location');
    const sprite = entity.getComponent('sprite');
    const width = sprite.width;
    const height = sprite.height;
    const left = Math.floor(location.location.x) - width / 2;
    const top = Math.floor(location.location.y) - height / 2;
    this.renderer.drawScaledImage(sprite.image, left, top, width, height);
  }
}

export default SpriteRender;
