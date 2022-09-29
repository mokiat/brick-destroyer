import { useEffect, useState } from 'react';
import Description from './Description';
import Footer from './Footer';
import Header from './Header';
import Playground from './Playground';

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

  return (
    <article>
      {decorations && <Header />}
      <Playground level={level} onNextLevel={handleNextLevel} />
      {decorations && <Description />}
      {decorations && <Footer />}
    </article>
  );
};

export default Application;
