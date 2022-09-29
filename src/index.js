import React from 'react';
import { createRoot } from 'react-dom/client';
import Application from './ui/components/App';
import './index.css';

const headless = process.env.REACT_APP_HEADLESS === 'true';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Application decorations={!headless} />
  </React.StrictMode>
);
