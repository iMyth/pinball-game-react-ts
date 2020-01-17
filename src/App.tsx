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

const App: React.FC = () => {

  useEffect(() => {
    document.addEventListener('keydown', handlerKeyDown);
    animate.mount();
    return () => {
      document.removeEventListener('keydown', handlerKeyDown)
    };
  }, []);

  return (
    <div
      className="App"
    >
      <canvas
        id="canvas1"
        width={WIDTH}
        height={HEIGHT}
      ></canvas>
    </div>
  );
}

export default App;
