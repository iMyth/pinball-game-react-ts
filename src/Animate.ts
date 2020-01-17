import Ball, { BallOptions } from './objects/Ball';
import Paddle, { PaddleOptions } from './objects/Paddle';
import { WIDTH, HEIGHT, BallStartPoint, PaddleStartPoint, PaddleStyle } from './constants';

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

  public constructor ({ width = WIDTH, height = HEIGHT }) {
    this.width = width;
    this.height = height;
  }

  public mount () {
    const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('!')
    }
    this.mounted = true;
    this.ctx = ctx;
    this.paddle = new Paddle({ ctx, width: PaddleStyle.width, height: PaddleStyle.height, x: PaddleStartPoint.x, y: PaddleStartPoint.y } as PaddleOptions);
    this.ball = new Ball({ ctx, radius: 5, x: BallStartPoint.x, y: BallStartPoint.y } as BallOptions);
    this.ball.addCollision(this.paddle);
    this.paint();
  }

  public handlerKeyDown (key: String) {
    if (key === Key.ArrowLeft) {
      this.paddle.left();
    }
    if (key === Key.ArrowRight) {
      this.paddle.right();
    }
  }

  public isMounted () {
    return this.mounted;
  }

  private paint () {
    const { width, height, paint } = this;
    this.ctx.clearRect(0, 0, width, height);
    this.ball.go();
    this.ball.draw();
    this.paddle.draw();
    requestAnimationFrame(paint.bind(this));
  }

}