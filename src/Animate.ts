import Ball, { BallOptions } from './objects/Ball';
import Paddle, { PaddleOptions } from './objects/Paddle';
import { WIDTH, HEIGHT, BallStartPoint, PaddleStartPoint, PaddleStyle } from './constants';
import EventBus, { CanvasEvent } from './eventBus';

export interface SupportedEventMap {
  'click': MouseEvent;
  'mousemove': MouseEvent;
}

const evts = ['click', 'mousemove'] as Array<keyof SupportedEventMap>;

export enum Key {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight'
}

export default class Animate {

  private ball!: Ball;

  private paddle!: Paddle;

  private ctx!: CanvasRenderingContext2D;

  private width: number;

  private height: number;

  private mounted = false;

  private isLeftKeyPressed = false;

  private isRightKeyPressed = false;

  public constructor({ width = WIDTH, height = HEIGHT }) {
    this.width = width;
    this.height = height;
  }

  public mount() {
    const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('!')
    }
    this.delegateMouseEvents(canvas);
    this.mounted = true;
    this.ctx = ctx;
    this.paddle = new Paddle({ ctx, width: PaddleStyle.width, height: PaddleStyle.height, x: PaddleStartPoint.x, y: PaddleStartPoint.y } as PaddleOptions);
    this.ball = new Ball({ ctx, radius: 5, x: BallStartPoint.x, y: BallStartPoint.y } as BallOptions);
    this.ball.addCollision(this.paddle);
    this.paint();
  }

  public delegateMouseEvents(canvas: HTMLCanvasElement) {
    const left = canvas.offsetLeft;
    const top = canvas.offsetTop;
    evts.forEach(p => {
      canvas.addEventListener(p, (e: MouseEvent) => {
        const cx = e.pageX - left;
        const cy = e.pageY - top;
        EventBus.dispatchEvent({
          cx, cy, native: e
        } as CanvasEvent);
      });
    })
  }

  public handlerKeyUp() {
    this.isLeftKeyPressed = false;
    this.isRightKeyPressed = false;
  }

  public handlerKeyDown(key: String) {
    this.isLeftKeyPressed = key === Key.ArrowLeft;
    this.isRightKeyPressed = key === Key.ArrowRight;
  }

  public isMounted() {
    return this.mounted;
  }

  public measurePaddle() {
    if (this.isLeftKeyPressed) {
      this.paddle.left();
    }
    if (this.isRightKeyPressed) {
      this.paddle.right();
    }
  }

  private paint() {
    const { width, height, paint } = this;
    this.ctx.clearRect(0, 0, width, height);
    this.ball.go();
    this.ball.draw();
    this.measurePaddle();
    this.paddle.draw();
    requestAnimationFrame(paint.bind(this));
  }

}