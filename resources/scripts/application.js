(function(ns, undefined) {

  ns.KeyShift = 16;
  ns.KeyEscape = 27;

  ns.Application = function() {
    this.lastUpdate = new Date().getTime();

    this.titleElement = $("#message");

    var canvas = document.getElementById("screen");
    this.canvasPosition = $(canvas).position();

    var levelURL = "resources/levels/level_ecs.json";
    if (window.location.hash) {
      levelURL = window.location.hash.substring(1);
    }

    var renderer = new graphics.Renderer(canvas);
    this.brickGame = new game.Controller(renderer, levelURL);
  };

  ns.Application.prototype.onKeyDown = function(event) {
    switch (event.which) {
    case ns.KeyShift:
      this.brickGame.enableSlider();
      break;
    }
  };

  ns.Application.prototype.onKeyUp = function(event) {
    switch (event.which) {
    case ns.KeyShift:
      this.brickGame.disableSlider();
      break;
    case ns.KeyEscape:
      this.brickGame.togglePaused();
      break;
    }
  };

  ns.Application.prototype.onMouseMove = function(event) {
    var x = event.pageX - Math.round(this.canvasPosition.left);
    var y = event.pageY - Math.round(this.canvasPosition.top);
    this.brickGame.onMouseMove(x, y);
  };

  ns.Application.prototype.onMouseClick = function(event) {
    this.brickGame.startLevel();
  };

  ns.Application.prototype.onTimerTick = function() {
    this.updateTitle();
    this.updateGame();
  };

  ns.Application.prototype.updateTitle = function() {
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
  };

  ns.Application.prototype.setTitle = function(text) {
    if (this.titleElement.text() != text) {
      this.titleElement.text(text);
    }
  };

  ns.Application.prototype.updateGame = function() {
    var currentTime = new Date().getTime();
    var elapsedSeconds = (currentTime - this.lastUpdate) / 1000.0;
    this.brickGame.update(elapsedSeconds);
    this.lastUpdate = currentTime;
  };

})(window.app = window.app || {});

$(function() {
  var application = new app.Application();

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
