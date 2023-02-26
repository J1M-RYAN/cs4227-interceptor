import chalk from "chalk";
import ContextObject from "./ContextObject";
import Interceptor from "./Interceptor";

class MeasurementsChangedLogger implements Interceptor {
  public intercept(context: ContextObject): void {
    console.log(chalk.yellow.bgBlack.bold("MeasurementsChangedLogger"));
    console.log(
      chalk.yellow.bgBlack.bold(
        "Temperature: " +
          context.getTemperature() +
          ", Humidity: " +
          context.getHumidity() +
          ", Pressure: " +
          context.getPressure()
      )
    );
  }
}

export default MeasurementsChangedLogger;
