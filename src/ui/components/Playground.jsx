import { useEffect, useRef, useState } from 'react';
import Renderer from '../../game/graphics/Renderer';
import Controller, {
  STATE_DEFEAT,
  STATE_PAUSED,
  STATE_STOPPED,
} from '../../game/Controller';

const KEY_SHIFT = 16;
const KEY_ESCAPE = 27;

const Playground = ({ level, onNextLevel }) => {
  const [title, setTitle] = useState('Welcome!');

  const levelTitle = (level) => {
    return level ? level.name : 'Welcome!';
  };

  useEffect(() => {
    setTitle(levelTitle(level));
  }, [level]);

  const canvasRef = useRef(null);
  const [controller] = useState(new Controller());

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new Renderer(canvas);
    controller.initialize(renderer);
    return () => {
      controller.release();
    };
  }, [controller]);

  useEffect(() => {
    controller.changeLevel(level);
  }, [controller, level]);

  controller.notify(
    () => {
      setTitle('Victory!');
      onNextLevel();
    },
    () => {
      setTitle('Game over!');
    }
  );

  const handleClick = () => {
    switch (controller.state) {
      case STATE_STOPPED:
        controller.startLevel();
        return;
      case STATE_DEFEAT:
        controller.changeLevel(level);
        setTitle(levelTitle(level));
        return;
      default:
        return;
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    controller.moveSlider(x, y);
  };

  const handleKeyDown = (e) => {
    if (e.which === KEY_SHIFT) {
      controller.setBounceEnabled(true);
    }
  };

  const handleKeyUp = (e) => {
    if (e.which === KEY_SHIFT) {
      controller.setBounceEnabled(false);
    }
    if (e.which === KEY_ESCAPE) {
      controller.togglePaused();
      if (controller.state === STATE_PAUSED) {
        setTitle('Paused');
      } else {
        setTitle(levelTitle(level));
      }
    }
  };

  return (
    <div id="playground">
      <div id="playgroundTop">
        <div id="borderTop">
          <span id="message">{title}</span>
        </div>
      </div>
      <div id="playgroundMiddle">
        <div id="borderLeft"></div>
        <canvas
          id={'screen'}
          tabIndex={1}
          width={600}
          height={406}
          ref={canvasRef}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        ></canvas>
        <div id="borderRight"></div>
      </div>
      <div id="playgroundBottom">
        <div id="borderBottom"></div>
      </div>
    </div>
  );
};

export default Playground;
