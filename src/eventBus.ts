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
    this.$on(type, handle);
  }

  public static removeEventListener(type: string, handle: (evt: CanvasEvent) => void) {
    const index = eventListeners.findIndex(p => p.type === handle);
    if (index === -1) {
      return;
    }
    eventListeners.splice(index, 1);
  }

  public static dispatchEvent(e: CanvasEvent) {
    const type = e.native.type;
    this.$emit(type, e);
  }

  public static $emit(event: string, e: any) {
    eventListeners.filter(p => p[event]).map(p => p[event]).forEach(p => p(e));
  }

  public static $on(event: string, handle: Function) {
    eventListeners.push({ [event]: handle });
  }

}