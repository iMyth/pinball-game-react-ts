import EventBus, { CanvasEvent } from '../eventBus';
import { CollisionRect } from './Collision';

export interface Point {
  x: number;
  y: number;
}

export default abstract class ClickAble {

  abstract get rect(): CollisionRect;

  public addEventListener(type: string, handle: (evt: CanvasEvent) => void) {
    EventBus.addEventListener(type, (evt: CanvasEvent) => {
      if (!this.shouldDispatch(evt)) {
        return;
      }
      handle(evt);
    });
  }

  public removeEventListener(type: string, handle: (evt: CanvasEvent) => void) {
    EventBus.removeEventListener(type, handle);
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