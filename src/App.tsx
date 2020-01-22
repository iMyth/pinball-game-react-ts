import React, { useEffect } from 'react';
import './App.css';
import Animate from './Animate';
import { WIDTH, HEIGHT } from './constants';
import EventBus from './eventBus';

let animate = new Animate({});
let paddleWidth: number;

const handlerKeyDown = function (e: KeyboardEvent) {
  if (!animate.isMounted) {
    return;
  }
  animate.handlerKeyDown(e.key)
}

const handlerKeyUp = function () {
  animate.handlerKeyUp()
}

const changeWidth = function() {
  if (!paddleWidth || paddleWidth < 0 || paddleWidth > 500) {
    return;
  }
  EventBus.$emit('change-width', paddleWidth);
}

const onWidthChange = function(event: React.FormEvent<HTMLInputElement>) {
  paddleWidth = +event.currentTarget.value;
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
      <div>
        <span>Change the width of paddle:</span>
        <input onInput={onWidthChange} type="number"/>
        <button onClick={changeWidth}>change width</button>
      </div>
    </div>
  );
}

export default App;
