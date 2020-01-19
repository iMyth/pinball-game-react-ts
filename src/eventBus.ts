export interface Dictionary<T> {
  [key: string]: T
}

export interface CanvasEvent {
  cx: number;
  cy: number;
  native: MouseEvent
}

const eventListeners = [] as Dictionary<Function>[];

export default class {

  public static addEventListener(type: string, handle: (evt: CanvasEvent) => void) {
    eventListeners.push({ [type]: handle });
  }

  public static dispatchEvent(e: CanvasEvent) {
    const type = e.native.type;
    eventListeners.filter(p => p[type]).map(p => p[type]).forEach(p => p(e));
  }

}