import Interceptor from "../Interceptor/Interceptor";
import MeasurementsChangedLogger from "../Interceptor/MeasurementsChangedLogger";

describe("interceptor interface", () => {
  it("should have property intercept", () => {
    const measurementsChangedLogger = new MeasurementsChangedLogger();
    expect(measurementsChangedLogger.intercept).toBeDefined();
  });
});
