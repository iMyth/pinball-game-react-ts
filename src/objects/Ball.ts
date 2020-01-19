import { WIDTH, HEIGHT } from '../constants';
import { Collision } from './Collision';
import { CanvasEvent } from '../eventBus';

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

  private opts!: BallOptions;

  private collisions = [] as Collision[];

  public constructor(opts: BallOptions) {
    super();
    const { x, y, radius, ctx } = opts;
    this.opts = opts;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.addEventListener('mousemove', this.onClick.bind(this))
  }

  public reset() {
    const { x, y } = this.opts;
    this.x = x;
    this.y = y;
    this.gameOver = false;
  }

  public onClick(evt: CanvasEvent) {
    this.dy = - Math.abs(this.dy);
  }

  public addCollision(o: Collision) {
    this.collisions.push(o);
  }

  public draw() {
    const { x, y, radius, ctx } = this;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  public go() {
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
      if (window.confirm('Game over! Would you like another try?')) {
        this.reset();
      }
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

  get rect() {
    const { x, y, radius } = this;
    return {
      x: x - radius, y: y - radius, height: radius * 2, width: radius * 2
    }
  }

}
