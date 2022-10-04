const Description = () => {
  return (
    <footer id="rules">
      <p>
        <strong>
          Bounce a ball to destroy all bricks while keeping physics in mind.
        </strong>
      </p>
      <p>
        <strong>RULES</strong>
        <br />
        The goal of the game is to hit all destroyable bricks with the ball
        without allowing it to fall to the bottom. Some bricks have special
        behavior that needs to be taken into consideration.
      </p>
      <p>
        <strong>LEVELS</strong>
        <br />
        The game features 9 levels that play in sequence. You can use{' '}
        <strong>1-9</strong> on your keyboard to jump to a specific level. Use{' '}
        <strong>BACKSPACE</strong> to restart a level.
      </p>
      <p>
        <strong>CONTROLS</strong>
        <br />
        Start each level by <strong>CLICKING</strong> with the{' '}
        <strong>MOUSE CURSOR</strong> inside the game area. <br />
        Move the slider left and right by moving the{' '}
        <strong>MOUSE CURSOR</strong>. <br />
        Hold the <strong>SHIFT</strong> key to make the slider more bouncy.
        <br />
        Press the <strong>SPACE</strong> key to pause/resume the game.
      </p>
    </footer>
  );
};

export default Description;
