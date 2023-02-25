import WeatherData from "./WeatherData";
import CurrentConditionsDisplay from "../Displays/CurrentConditionsDisplay";
import StatisticsDisplay from "../Displays/StatisticsDisplay";
import ForecastDisplay from "../Displays/ForecastDisplay";

class WeatherStation {
  private weatherData: WeatherData;
  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;

    const currentDisplay = new CurrentConditionsDisplay(weatherData);
    const statisticsDisplay = new StatisticsDisplay(weatherData);
    const forecastDisplay = new ForecastDisplay(weatherData);

    weatherData.setMeasurements(80, 65, 30.4);
  }
}

export default WeatherStation;
