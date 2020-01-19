import ClickAble from './ClickAble';

export interface CollisionRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Dictionary<T> {
  [key: string]: T
}

export default abstract class Collision extends ClickAble {

  public hit(o: Collision) {
    const { rect: { x, y, width, height } } = this;
    const { rect } = o;
    const collided = x + width > rect.x && x < rect.x + rect.width && y + height > rect.y && y < rect.y + rect.height;

    if (!collided) {
      return [];
    }

    const leftCollision = rect.x + rect.width - x;
    const rightCollision = x + width - rect.x;
    const topCollision = rect.y + rect.height - y;
    const bottomCollision = y + height - rect.y;

    const possiblyHit = Math.min(leftCollision, rightCollision, topCollision, bottomCollision);

    const sides = [{
      key: 'left',
      value: leftCollision
    }, {
      key: 'right',
      value: rightCollision
    }, {
      key: 'top',
      value: topCollision
    }, {
      key: 'bottom',
      value: bottomCollision
    }].filter(p => p.value === possiblyHit).map(p => p.key);

    return sides;
  }

}
