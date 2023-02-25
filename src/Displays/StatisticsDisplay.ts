import DisplayElement from "../Displays/DisplayElement";
import Observer from "../WeatherStation/Observer/observer";
import WeatherData from "../WeatherStation/WeatherData";

class StatisticsDisplay implements Observer, DisplayElement {
  private maxTemp: number = 0;
  private minTemp: number = 200;
  private tempSum: number = 0;
  private numReadings: number = 0;
  private weatherData: WeatherData;

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  public update(temperature: number, humidity: number, pressure: number): void {
    this.tempSum += temperature;
    this.numReadings++;

    if (temperature > this.maxTemp) {
      this.maxTemp = temperature;
    }

    if (temperature < this.minTemp) {
      this.minTemp = temperature;
    }

    this.display();
  }

  public display(): void {
    console.log(
      `Avg/Max/Min temperature = ${this.tempSum / this.numReadings}/${
        this.maxTemp
      }/${this.minTemp}`
    );
  }
}

export default StatisticsDisplay;
