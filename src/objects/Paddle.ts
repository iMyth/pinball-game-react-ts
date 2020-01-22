import Collision from './Collision';

import { WIDTH } from '../constants';

export interface PaddleOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
}

export default class Paddle extends Collision {

  private x: number;

  private y: number;

  private width: number;

  private height: number;

  private ctx: CanvasRenderingContext2D;

  private step = 7;

  public constructor(opts: PaddleOptions) {
    super();
    const { x, y, width, height, ctx } = opts;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }

  public setWidth(width: number) {
    this.width = width;
  }

  public draw() {
    const { x, y, width, height, ctx } = this;
    ctx.lineWidth = height;
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.stroke();
  }

  public left() {
    if (this.x <= 0) {
      return;
    }
    requestAnimationFrame(() => {
      this.x -= this.step;
    });
  }

  public right() {
    if (this.x + this.width >= WIDTH) {
      return;
    }
    requestAnimationFrame(() => {
      this.x += this.step;
    });
  }

  get rect() {
    const { x, y, width, height } = this;
    return {
      x, y, width, height
    }
  }

}
