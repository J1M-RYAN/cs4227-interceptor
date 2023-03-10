import chalk from "chalk";
import DisplayElement from "../Displays/DisplayElement";
import Observer from "../WeatherStation/Observer/observer";
import WeatherData from "../WeatherStation/WeatherData";

class ForecastDisplay implements Observer, DisplayElement {
  private currentPressure: number = 29.92;
  private lastPressure: number = 0;
  private weatherData: WeatherData;

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  public update(temperature: number, humidity: number, pressure: number): void {
    this.lastPressure = this.currentPressure;
    this.currentPressure = pressure;

    this.display();
  }

  public display(): void {
    let forecast = "";
    let color = "";
    if (this.currentPressure > this.lastPressure) {
      forecast = "Improving weather on the way!";
      color = "greenBright";
    } else if (this.currentPressure === this.lastPressure) {
      forecast = "More of the same";
      color = "yellow";
    } else if (this.currentPressure < this.lastPressure) {
      forecast = "Watch out for cooler, rainy weather";
      color = "blueBright";
    }
    console.log(
      chalk[color].inverse.bold("Forecast:") + chalk[color](forecast)
    );
  }
}

export default ForecastDisplay;
