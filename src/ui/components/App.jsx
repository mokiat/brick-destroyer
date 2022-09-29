import { useEffect, useState } from 'react';
import Description from './Description';
import Footer from './Footer';
import Header from './Header';
import Playground from './Playground';

const Application = ({ decorations = true }) => {
  const [level, setLevel] = useState(null);

  useEffect(() => {
    fetch('levels/level_ecs.json')
      .then((res) => res.json())
      .then(
        (data) => {
          console.log(`level loaded: ${JSON.stringify(data)}`);
          setLevel(data);
        },
        (error) => {
          // TODO: Change title!
          console.log(`level error ${error}`);
        }
      );
  }, []);

  return (
    <article>
      {decorations && <Header />}
      <Playground level={level} />
      {decorations && <Description />}
      {decorations && <Footer />}
    </article>
  );
};

export default Application;
