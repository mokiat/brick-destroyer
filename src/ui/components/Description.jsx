const Description = () => {
  return (
    <footer id="rules">
      <p>
        <strong>
          Bounce a ball to destroy all bricks while keeping physics in mind.
        </strong>
      </p>
      <p>
        <strong>Rules:</strong>
        <br />
        The goal of the game is to hit all destroyable bricks with the ball
        without allowing it to fall to the bottom. Some bricks have special
        behavior that needs to be taken into consideration.
      </p>
      <p>
        <strong>Levels:</strong>
        <br />
        The game features a number of introductory levels. Once those levels are
        completed, the game presents random levels from a larger pool. Use{' '}
        <strong>1-5</strong> to jump to a specific introductory level. Use{' '}
        <strong>0</strong> to pick a random level. Use{' '}
        <strong>BACKSPACE</strong> to restart a level if you ever get stuck.
      </p>
      <p>
        <strong>Controls:</strong>
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
