import EventBus, { CanvasEvent } from '../eventBus';

export interface CollisionRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Dictionary<T> {
  [key: string]: T
}

export abstract class Collision {

  abstract get rect(): CollisionRect;

  public hit(o: Collision) {
    const { rect: { x, y, width, height } } = this;
    const { rect } = o;
    return x + width > rect.x && x < rect.x + rect.width && y + height > rect.y && y < rect.y + rect.height;
  }

  public addEventListener(type: string, handle: (evt: CanvasEvent) => void) {
    EventBus.addEventListener(type, (evt: CanvasEvent) => {
      if (!this.shouldDispatch(evt)) {
        return;
      }
      handle(evt);
    });
  }

  public pointInRect(point: Point) {
    const { rect: { x, y, width, height } } = this;
    return point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height;
  }

  public shouldDispatch(e: CanvasEvent) {
    const { cx, cy } = e;
    return this.pointInRect({
      x: cx,
      y: cy
    });
  }

}
