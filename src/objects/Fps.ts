import { WIDTH } from '../constants';

export default class Fps {

  private fps: number;

  private ctx: CanvasRenderingContext2D;

  public constructor(ctx: CanvasRenderingContext2D) {
    this.fps = 60;
    this.ctx = ctx;
  }

  public setFps(fps: number) {
    this.fps = fps;
  }

  public draw() {
    const { ctx } = this;
    ctx.fillStyle = '#666';
    ctx.font = '16px Arial';
    ctx.fillText(`FPS: ${this.fps}`, WIDTH - 80, 20);
  }

}
