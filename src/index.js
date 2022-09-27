import React from 'react';
import ReactDOM from 'react-dom';
import Application from './ui/components/App';

import './index.css';

const headless = process.env.REACT_APP_HEADLESS === 'true';

ReactDOM.render(
  <React.StrictMode>
    <Application decorations={!headless} />
  </React.StrictMode>,
  document.getElementById('root')
);
