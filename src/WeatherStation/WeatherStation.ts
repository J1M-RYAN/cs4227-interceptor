import WeatherData from "./WeatherData";
import CurrentConditionsDisplay from "../Displays/CurrentConditionsDisplay";
import StatisticsDisplay from "../Displays/StatisticsDisplay";
import ForecastDisplay from "../Displays/ForecastDisplay";

class WeatherStation {
  private weatherData: WeatherData;
  private currentDisplay: CurrentConditionsDisplay;
  private statisticsDisplay: StatisticsDisplay;
  private forecastDisplay: ForecastDisplay;

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;

    this.currentDisplay = new CurrentConditionsDisplay(weatherData);
    this.statisticsDisplay = new StatisticsDisplay(weatherData);
    this.forecastDisplay = new ForecastDisplay(weatherData);

    weatherData.setMeasurements(80, 65, 30.4);
  }

  public display(): void {
    this.currentDisplay.display();
    this.statisticsDisplay.display();
    this.forecastDisplay.display();
  }
}

export default WeatherStation;
