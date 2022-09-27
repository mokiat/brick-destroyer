import Description from './Description';
import Footer from './Footer';
import Header from './Header';
import Playground from './Playground';

const Application = ({ decorations = true }) => {
  return (
    <article>
      {decorations && <Header />}
      <Playground />
      {decorations && <Description />}
      {decorations && <Footer />}
    </article>
  );
};

export default Application;
