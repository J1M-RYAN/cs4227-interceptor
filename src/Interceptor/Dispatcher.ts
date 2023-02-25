import ContextObject from "./ContextObject";
import IDispatcher from "./IDispatcher";
import Interceptor from "./Interceptor";

class Dispatcher implements IDispatcher {
  private interceptors: Set<Interceptor> = new Set();
  private static dispatcher: IDispatcher;

  public static getInstance(): IDispatcher {
    if (!Dispatcher.dispatcher) {
      Dispatcher.dispatcher = new Dispatcher();
    }
    return Dispatcher.dispatcher;
  }

  public registerInterceptor(interceptor: Interceptor): void {
    this.interceptors.add(interceptor);
  }

  public removeInterceptor(interceptor: Interceptor): void {
    this.interceptors.delete(interceptor);
  }

  public dispatch(contextObject: ContextObject): void {
    this.interceptors.forEach((interceptor) => {
      interceptor.intercept(contextObject);
    });
  }
}

export default Dispatcher;
