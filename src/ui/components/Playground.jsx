import { useEffect, useRef, useState } from 'react';
import Renderer from '../../game/graphics/Renderer';
import Controller, {
  STATE_DEFEAT,
  STATE_PAUSED,
  STATE_STOPPED,
} from '../../game/Controller';

const KEY_SHIFT = 'Shift';
const KEY_SPACE = ' ';
const KEY_BACKSPACE = 'Backspace';
const KEY_0 = '0';
const KEY_9 = '9';

const Playground = ({ level, onNextLevel, onSpecificLevel, onRandomLevel }) => {
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
    if (document.pointerLockElement !== canvasRef.current) {
      canvasRef.current.requestPointerLock();
    }
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

  let mouseX;
  let mouseY;
  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    if (document.pointerLockElement === canvasRef.current) {
      mouseX += e.movementX;
      mouseY += e.movementY;
    } else {
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }
    mouseX = Math.min(Math.max(0, mouseX), rect.right - rect.left);
    mouseY = Math.min(Math.max(0, mouseY), rect.bottom - rect.top);
    controller.moveSlider(mouseX, mouseY);
  };

  const handleKeyDown = (e) => {
    if (e.key === KEY_SHIFT) {
      controller.setBounceEnabled(true);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === KEY_SHIFT) {
      controller.setBounceEnabled(false);
    }
    if (e.key === KEY_SPACE) {
      controller.togglePaused();
      if (controller.state === STATE_PAUSED) {
        setTitle('Paused');
      } else {
        setTitle(levelTitle(level));
      }
    }
    if (e.key === KEY_BACKSPACE) {
      controller.changeLevel(level);
    }
    if (e.key === KEY_0) {
      onRandomLevel();
    }
    if (e.key > KEY_0 && e.key <= KEY_9) {
      onSpecificLevel(e.key - KEY_0 - 1);
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
