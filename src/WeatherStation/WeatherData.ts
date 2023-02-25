import Subject from "./Observer/subject";
import Observer from "./Observer/observer";
import SetMeasurements from "./SetMeasurements";
import GetMeasurements from "./GetMeasurements";
import Dispatcher from "../Interceptor/Dispatcher";
import ContextObject from "../Interceptor/ContextObject";

class WeatherData implements Subject, SetMeasurements, GetMeasurements {
  private observers: Set<Observer> = new Set();
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  public registerObserver(observer: Observer): void {
    this.observers.add(observer);
  }

  public removeObserver(observer: Observer): void {
    this.observers.delete(observer);
  }

  public notifyObservers(): void {
    this.observers.forEach((observer) => {
      observer.update(this.temperature, this.humidity, this.pressure);
    });
  }

  public measurementsChanged(): void {
    const context = new ContextObject(this);
    Dispatcher.getInstance().dispatch(context);

    this.notifyObservers();
  }

  public setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number
  ): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;

    this.measurementsChanged();
  }

  public getTemperature(): number {
    return this.temperature;
  }

  public getHumidity(): number {
    return this.humidity;
  }

  public getPressure(): number {
    return this.pressure;
  }

  public setTemperature(temperature: number): void {
    this.temperature = temperature;
    this.measurementsChanged();
  }

  public setHumidity(humidity: number): void {
    this.humidity = humidity;
    this.measurementsChanged();
  }

  public setPressure(pressure: number): void {
    this.pressure = pressure;
    this.measurementsChanged();
  }
}

export default WeatherData;
