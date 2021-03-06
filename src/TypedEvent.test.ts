import {TypedEvent} from "./TypedEvent";

describe("TypedEvent", () => {

  test("it adds a listener and receives an event", () => {
    const events = new TypedEvent<number>();
    const hook = jest.fn();
    events.addListener(hook);

    events.emit(5);

    expect(hook).toBeCalledWith(5);
  });

  test("removeListener removes a listener", () => {
    const events = new TypedEvent<number>();
    const hook = jest.fn();
    events.addListener(hook);

    events.emit(5);
    expect(hook).toBeCalledWith(5);

    events.removeListener(hook);
    hook.mockClear();

    events.emit(6);
    expect(hook).not.toBeCalled();
  });

  test("removeListener doesn't remove an irrelevant listener", () => {
    const events = new TypedEvent<number>();
    const hook1 = jest.fn();
    const hook2 = jest.fn();

    events.addListener(hook1);
    events.removeListener(hook2);

    events.emit(5);
    expect(hook1).toBeCalledWith(5);
  });

  test("addListener returns a function to remove the listener", () => {
    const events = new TypedEvent<number>();
    const hook = jest.fn();
    const unregister = events.addListener(hook);

    events.emit(5);
    expect(hook).toBeCalledWith(5);

    unregister();
    hook.mockClear();

    events.emit(6);
    expect(hook).not.toBeCalled();
  });

  test("multiple listeners can be added", () => {
    const events = new TypedEvent<number>();
    const hook1 = jest.fn();
    const hook2 = jest.fn();
    events.addListener(hook1);
    events.addListener(hook2);

    events.emit(1);
    expect(hook1).toBeCalledWith(1);
    expect(hook2).toBeCalledWith(1);
  });

  test("multiple listeners can be added and removed", () => {
    const events = new TypedEvent<number>();
    const hook1 = jest.fn();
    const hook2 = jest.fn();
    const unregister1 = events.addListener(hook1);
    events.emit(1);
    expect(hook1).toBeCalledWith(1);
    expect(hook2).not.toBeCalled();
    hook1.mockClear();

    events.addListener(hook2);
    events.emit(2);
    expect(hook1).toBeCalledWith(2);
    expect(hook2).toBeCalledWith(2);
    hook1.mockClear();
    hook2.mockClear();

    unregister1();

    events.emit(3);
    expect(hook1).not.toBeCalled();
    expect(hook2).toBeCalledWith(3);
    hook2.mockClear();

    events.removeListener(hook2);
    events.emit(1);

    expect(hook1).not.toBeCalled();
    expect(hook2).not.toBeCalled();
  });
});
