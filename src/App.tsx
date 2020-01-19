import React, { useEffect } from 'react';
import './App.css';
import Animate from './Animate';
import { WIDTH, HEIGHT } from './constants';

let animate = new Animate({});

const handlerKeyDown = function (e: KeyboardEvent) {
  if (!animate.isMounted) {
    return;
  }
  animate.handlerKeyDown(e.key)
}

const handlerKeyUp = function () {
  animate.handlerKeyUp()
}

const App: React.FC = () => {

  useEffect(() => {
    document.addEventListener('keydown', handlerKeyDown);
    document.addEventListener('keyup', handlerKeyUp);
    animate.mount();
    return () => {
      document.removeEventListener('keydown', handlerKeyDown)
      document.addEventListener('keyup', handlerKeyUp);
    };
  }, []);

  return (
    <div
      className="App"
    >
      <div className="canvas-wrapper">
        <canvas
          id="canvas1"
          width={WIDTH}
          height={HEIGHT}
        ></canvas>
      </div>
    </div>
  );
}

export default App;
