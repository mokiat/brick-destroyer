import { useEffect, useState } from 'react';
import Description from './Description';
import Footer from './Footer';
import Header from './Header';
import Playground from './Playground';

const LEVEL_PATHS = [
  'levels/level_ecs.json',
  'levels/level_boom.json',
  'levels/level_physics.json',
  'levels/level_too_many.json',
  'levels/level_strange_one.json',
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
    fetchLevel('levels/level_ecs.json');
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

  const handleRandomLevel = () => {
    const index = Math.floor(Math.random() * (LEVEL_PATHS.length - 1));
    handleSpecificLevel(index);
  };

  return (
    <article>
      {decorations && <Header />}
      <Playground
        level={level}
        onNextLevel={handleNextLevel}
        onSpecificLevel={handleSpecificLevel}
        onRandomLevel={handleRandomLevel}
      />
      {decorations && <Description />}
      {decorations && <Footer />}
    </article>
  );
};

export default Application;
