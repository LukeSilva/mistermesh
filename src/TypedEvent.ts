export type Listener<T> = (event: T) => any;

export class TypedEvent<T> {

  private listeners: Array<Listener<T>> = [];

  public addListener = (listener: Listener<T>): (() => void) => {
    this.listeners.push(listener);
    return () => this.removeListener(listener);
  }

  public removeListener = (listener: Listener<T>) => {
    if (this.listeners.includes(listener)) {
      delete this.listeners[this.listeners.indexOf(listener)];
    }
  }

  public emit = (event: T) => {
    this.listeners.forEach((listener) => {
      listener(event);
    });
  }
}
