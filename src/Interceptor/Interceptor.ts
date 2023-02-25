import ContextObject from "./ContextObject";

interface Interceptor {
  intercept: (request: ContextObject) => void;
}

export default Interceptor;
