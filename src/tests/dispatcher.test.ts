import Dispatcher from "../Interceptor/Dispatcher";

describe("dispatcher interface", () => {
  it("should have property dispatch which is a function", () => {
    const dispatcher = new Dispatcher();
    expect(dispatcher.dispatch).toBeDefined();
    expect(typeof dispatcher.dispatch).toBe("function");
  });

  it("should have property registerInterceptor which is a function", () => {
    const dispatcher = new Dispatcher();
    expect(dispatcher.registerInterceptor).toBeDefined();
    expect(typeof dispatcher.registerInterceptor).toBe("function");
  });

  it("should have property removeInterceptor which is a function", () => {
    const dispatcher = new Dispatcher();
    expect(dispatcher.removeInterceptor).toBeDefined();
    expect(typeof dispatcher.removeInterceptor).toBe("function");
  });
});
