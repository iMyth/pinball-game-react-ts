export interface CollisionRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export abstract class Collision {

  abstract get rect(): CollisionRect;

  public hit(o: Collision) {
    const { rect: { x, y, width, height } } = this;
    const { rect } = o;
    return x + width > rect.x && x < rect.x + rect.width && y + height > rect.y && y < rect.y + rect.height;
  }

}
