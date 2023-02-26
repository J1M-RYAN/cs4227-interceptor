import DisplayElement from "./DisplayElement";
import Observer from "../WeatherStation/Observer/observer";
import Subject from "../WeatherStation/Observer/subject";
import chalk from "chalk";

class CurrentConditionsDisplay implements Observer, DisplayElement {
  private temperature: number = -1;
  private humidity: number = -1;
  private weatherData: Subject;

  constructor(weatherData: Subject) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  public update(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;

    this.display();
  }

  public display(): void {
    console.log(
      chalk.cyan.inverse.bold("Current conditions:") +
        chalk.yellowBright(`${this.temperature}F degrees and `) +
        chalk.magentaBright(`${this.humidity}% humidity`)
    );
  }
}

export default CurrentConditionsDisplay;
