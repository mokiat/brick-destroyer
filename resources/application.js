oop.namespace("brickdest.app");

brickdest.app.KEY_SHIFT = 16;
brickdest.app.KEY_ESCAPE = 27;

brickdest.app.Application = oop.class({
  __create__: function() {
    this.lastUpdate = new Date().getTime();

    this.titleElement = $("#message");

    var canvas = document.getElementById("screen");
    this.canvasPosition = $(canvas).position();

    var renderer = new brickdest.graphics.Renderer(canvas);
    this.brickGame = new game.Game(renderer);
  },
  onKeyDown: function(event) {
    if (event.which == brickdest.app.KEY_SHIFT) {
      this.brickGame.enableSlider();
    }
  },
  onKeyUp: function(event) {
    if (event.which == brickdest.app.KEY_SHIFT) {
      this.brickGame.disableSlider();
    }
    if (event.which == brickdest.app.KEY_ESCAPE) {
      this.brickGame.togglePaused();
    }
  },
  onMouseMove: function(event) {
    var x = event.pageX - Math.round(this.canvasPosition.left);
    this.brickGame.moveSlider(x);
  },
  onMouseClick: function(event) {
    this.brickGame.startLevel();
  },
  onTimerTick: function() {
    this.updateTitle();
    this.updateGame();
  },
  updateTitle: function() {
    if (this.brickGame.isLoading()) {
      this.setTitle("Loading...");
    } else if (this.brickGame.isPaused()) {
      this.setTitle("Paused!");
    } else {
      this.setTitle("Level: " + this.brickGame.getLevelName());
    }
  },
  setTitle: function(text) {
    if (this.titleElement.text() != text) {
      this.titleElement.text(text);
    }
  },
  updateGame: function() {
    var currentTime = new Date().getTime();
    var elapsedSeconds = (currentTime - this.lastUpdate) / 1000.0;
    this.brickGame.update(elapsedSeconds);
    this.lastUpdate = currentTime;
  }
});

$(function() {
  application = new brickdest.app.Application();

  setInterval(function() {
    application.onTimerTick();
  }, 33);

  $(document).keyup(function(event) {
    application.onKeyUp(event);
  });

  $(document).keydown(function(event) {
    application.onKeyDown(event);
  });

  $(document).click(function(event) {
    application.onMouseClick(event);
  });

  $(document).mousemove(function(event) {
    application.onMouseMove(event);
  });
});
