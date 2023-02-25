import DisplayElement from "./DisplayElement";
import Observer from "../WeatherStation/Observer/observer";
import Subject from "../WeatherStation/Observer/subject";

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
      `Current conditions: ${this.temperature}F degrees and ${this.humidity}% humidity`
    );
  }
}

export default CurrentConditionsDisplay;
