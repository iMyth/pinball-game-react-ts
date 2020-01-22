import Collision from './Collision';
import { CanvasEvent } from '../eventBus';
import { CollisionRect } from './Collision';

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

  private dx = (Math.random() * 3 + 1) | 0;

  private dy = (Math.random() * 3 + 1) | 0;

  private gameOver = false;

  private opts!: BallOptions;

  private fillStyle!: string;

  private collisions = [] as Collision[];

  public constructor(opts: BallOptions) {
    super();
    const { x, y, radius, ctx } = opts;
    this.opts = opts;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.fillStyle = `rgb(${Math.random() * 255 | 0}, ${Math.random() * 255 | 0}, ${Math.random() * 255 | 0})`;
    this.addEventListener('mousemove', this.onMouseOver.bind(this));
  }

  public reset() {
    const { x, y } = this.opts;
    this.x = x;
    this.y = y;
    this.gameOver = false;
  }

  public onMouseOver(evt: CanvasEvent) {
    this.gameOver = false;
    this.dy = - Math.abs(this.dy);
  }

  public addCollision(o: Collision) {
    this.collisions.push(o);
  }

  public addCollisionRect(rect: CollisionRect) {
    this.collisions.push({
      rect
    } as Collision);
  }

  public draw() {
    const { x, y, radius, ctx } = this;
    ctx.beginPath();
    ctx.fillStyle = this.fillStyle;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  public checkAll() {
    // buggie, Rebound speed is not true as it should obey 'Conservation of Momentum'
    this.collisions.forEach(p => {
      const hits = this.hit(p);
      if (hits.length) {
        hits.forEach(p => {
          if (['left', 'right'].includes(p)) {
            this.dx = -this.dx;
          }
          if (['top', 'bottom'].includes(p)) {
            this.dy = -this.dy;
          }
        });
      }
    });
    this.x += this.dx;
    this.y += this.dy;
  }

  public go() {
    if (this.gameOver) {
      return;
    }
    this.checkAll();
  }

  get rect() {
    const { x, y, radius } = this;
    return {
      x: x - radius, y: y - radius, height: radius * 2, width: radius * 2
    }
  }

}
