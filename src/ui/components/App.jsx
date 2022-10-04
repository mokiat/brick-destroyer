import { useEffect, useState } from 'react';
import Description from './Description';
import Title from './Title';
import Playground from './Playground';

const LEVEL_PATHS = [
  'levels/standard-bricks.json',
  'levels/some-go-boom.json',
  'levels/strange-tunnel.json',
  'levels/too-many.json',
  'levels/aisle-two.json',
  'levels/use-the-bounce.json',
  'levels/pass-along.json',
  'levels/many-ways-to-fail.json',
  'levels/elevator-pitch.json',
];

const Application = ({ decorations = true }) => {
  const [level, setLevel] = useState(null);

  const fetchLevel = (path) => {
    fetch(path)
      .then((res) => res.json())
      .then(
        (data) => {
          setLevel(data);
        },
        (error) => {
          setLevel({
            name: `Error loading level... We are sorry!`,
            entities: [
              {
                location: {},
                shouldDestroy: {},
              },
            ],
          });
          console.log(`Error loading level: ${error}`);
        }
      );
  };

  useEffect(() => {
    fetchLevel('levels/victory.json');
  }, []);

  const handleNextLevel = () => {
    if (level && level.next) {
      fetchLevel(level.next);
    }
  };

  const handleSpecificLevel = (index) => {
    if (index >= 0 && index < LEVEL_PATHS.length) {
      fetchLevel(LEVEL_PATHS[index]);
    }
  };

  return (
    <article>
      {decorations && <Title />}
      <Playground
        level={level}
        onNextLevel={handleNextLevel}
        onSpecificLevel={handleSpecificLevel}
      />
      {decorations && <Description />}
    </article>
  );
};

export default Application;
