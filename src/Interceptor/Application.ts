import IDispatcher from "./IDispatcher";
import Interceptor from "./Interceptor";
import ContextObject from "./ContextObject";

class Application {
  private dispatcher: IDispatcher;

  constructor(dispatcher: IDispatcher) {
    this.dispatcher = dispatcher;
  }

  public dispatch(request: ContextObject): void {
    this.dispatcher.dispatch(request);
  }

  public registerInterceptor(interceptor: Interceptor): void {
    this.dispatcher.registerInterceptor(interceptor);
  }

  public removeInterceptor(interceptor: Interceptor): void {
    this.dispatcher.removeInterceptor(interceptor);
  }
}

export default Application;
