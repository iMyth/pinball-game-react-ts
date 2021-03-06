import Ball, { BallOptions } from './objects/Ball';
import Paddle, { PaddleOptions } from './objects/Paddle';
import Fps from './objects/Fps';
import { WIDTH, HEIGHT, BallStartPoint, PaddleStartPoint, PaddleStyle } from './constants';
import EventBus, { CanvasEvent } from './eventBus';
import { CollisionRect } from './objects/Collision';

export interface SupportedEventMap {
  'click': MouseEvent;
  'mousemove': MouseEvent;
}

const boards = [{
  x: 0, y: 0, width: 1, height: HEIGHT
}, {
  x: 0, y: 0, width: WIDTH, height: 1
}, {
  x: WIDTH, y: 0, width: 1, height: HEIGHT
}] as CollisionRect[];

const evts = ['click', 'mousemove'] as Array<keyof SupportedEventMap>;

const ballsCount = 10;

export enum Key {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight'
}

let lastPaint = Date.now();

export default class Animate {

  private ball!: Ball;

  private balls = [] as Ball[];

  private paddle!: Paddle;

  private fps!: Fps;

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
    this.fps = new Fps(ctx);
    this.paddle = new Paddle({ ctx, width: PaddleStyle.width, height: PaddleStyle.height, x: PaddleStartPoint.x, y: PaddleStartPoint.y } as PaddleOptions);
    this.initBalls(ctx);
    this.balls.forEach(p => {
      p.addCollision(this.paddle);
      boards.forEach(q => {
        p.addCollisionRect(q);
      })
      this.balls.forEach(q => {
        if (p === q) {
          return;
        }
        p.addCollision(q);
      })
    });
    this.initEvents();
    this.paint();
}

  public initEvents() {
    EventBus.$on('change-width', (width: number) => {
      this.paddle.setWidth(width);
    })
  }

  public initBalls(ctx: CanvasRenderingContext2D) {
    const balls = [] as Ball[];
    for (let i = 0; i < ballsCount; i++) {
      balls.push(new Ball({
        ctx,
        radius: 5,
        x: BallStartPoint.x + (((Math.random() * 2 | 0) + 1) * i * 15),
        y: BallStartPoint.y + (((Math.random() * 2 | 0) + 1) * i * 10)
      } as BallOptions));
    }
    this.addManyBalls(balls);
  }

  public addManyBalls(ball: Ball[]) {
    this.balls.push(...ball);
  }

  public ballsRun() {
    this.balls.forEach(p => {
      p.go();
      p.draw();
    })
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

  private measureFps(currentPaintTime: number) {
    const timespan = currentPaintTime - lastPaint;
    this.fps.setFps((1e3 / timespan) | 0)
    lastPaint = currentPaintTime;
  }

  private paint() {
    const currentPaintTime = Date.now();
    const { width, height, paint } = this;
    this.ctx.clearRect(0, 0, width, height);
    this.ballsRun();
    this.measurePaddle();
    this.paddle.draw();
    this.fps.draw();
    this.measureFps(currentPaintTime);
    requestAnimationFrame(paint.bind(this));
  }

}