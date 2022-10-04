class Renderer {
  constructor(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext('2d');
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  drawImage(image, x, y) {
    var width = image.getImg().width;
    var height = image.getImg().height;
    this.context.drawImage(
      image.getImg(),
      x - width / 2,
      y - height / 2,
      width,
      height
    );
  }

  drawScaledImage(image, left, top, width, height) {
    this.context.drawImage(image.getImg(), left, top, width, height);
  }
}

export default Renderer;
