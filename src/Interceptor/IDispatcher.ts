import Interceptor from "./Interceptor";
import ContextObject from "./ContextObject";

interface IDispatcher {
  registerInterceptor: (interceptor: Interceptor) => void;
  removeInterceptor: (interceptor: Interceptor) => void;
  dispatch: (request: ContextObject) => void;
}

export default IDispatcher;
