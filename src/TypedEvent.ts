export type Listener<T> = (event: T) => any;

export class TypedEvent<T> {

  public addListener = (listener: Listener<T>): (() => void) => {
    return () => null;
  }

  public removeListener = (listener: Listener<T>) => {
    //
  }

  public emit = (event: T) => {
    //
  }
}
