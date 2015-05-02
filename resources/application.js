oop.namespace("brickdest.app");

brickdest.app.KEY_SHIFT = 16;
brickdest.app.KEY_ESCAPE = 27;

brickdest.app.Application = oop.class({
  __create__: function() {
    this.lastUpdate = new Date().getTime();

    this.titleElement = $("#message");

    var canvas = document.getElementById("screen");
    this.canvasPosition = $(canvas).position();

    var levelURL = "/resources/levels/level_ecs.json";
    if (window.location.hash) {
      levelURL = window.location.hash.substring(1);
    }

    var renderer = new brickdest.graphics.Renderer(canvas);
    this.brickGame = new game.Game(renderer, levelURL);
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
    var y = event.pageY - Math.round(this.canvasPosition.top);
    this.brickGame.onMouseMove(x, y);
  },
  onMouseClick: function(event) {
    this.brickGame.startLevel();
  },
  onTimerTick: function() {
    this.updateTitle();
    this.updateGame();
  },
  updateTitle: function() {
    switch (this.brickGame.getGameState()) {
      case game.StateLoadingLevel:
        this.setTitle("Loading level...");
        break;
      case game.StateLoadingContent:
        this.setTitle("Loading data...");
        break;
      case game.StatePaused:
        this.setTitle("Paused!");
        break;
      case game.StateVictory:
        this.setTitle("Congratulations, you have successfully completed all levels!");
        break;
      case game.StateGameOver:
        this.setTitle("Game Over!");
        break;
      default:
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
