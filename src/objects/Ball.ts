import { WIDTH, HEIGHT } from '../constants';
import { Collision } from './Collision';

export interface BallOptions {
  x: number;
  y: number;
  radius: number;
  ctx: CanvasRenderingContext2D;
}

export default class Ball extends Collision {

  private x: number;

  private y: number;

  private radius: number;

  private ctx: CanvasRenderingContext2D;

  private dx = 2;

  private dy = 2;

  private gameOver = false;

  private collisions = [] as Collision[];

  public constructor (opts: BallOptions) {
    super();
    const { x, y, radius, ctx } = opts;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
  }

  public addCollision(o: Collision) {
    this.collisions.push(o);
  }

  public draw () {
    const { x, y, radius, ctx } = this;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  public go () {
    if (this.gameOver) {
      return;
    }
    let { x, y, radius } = this;
    const hitPaddle = this.collisions.some(p => {
      return p.hit(this);
    });
    if (hitPaddle) {
      this.dy = -this.dy;
    }
    if (x + radius >= WIDTH) {
      this.dx = -this.dx;
    }
    if (y + radius >= HEIGHT) {
      this.gameOver = true;
      alert('game over!');
    }
    if (x <= 0) {
      this.dx = -this.dx;
    }
    if (y < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  get rect () {
    const { x, y, radius } = this;
    return {
      x, y, height: radius * 2, width: radius * 2
    }
  }

}
