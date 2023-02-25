import WeatherData from "../WeatherStation/WeatherData";

class ContextObject {
  private weatherData: WeatherData;

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;
  }

  public setTemperature(temperature: number): void {
    this.weatherData.setTemperature(temperature);
  }

  public setHumidity(humidity: number): void {
    this.weatherData.setHumidity(humidity);
  }

  public setPressure(pressure: number): void {
    this.weatherData.setPressure(pressure);
  }

  public getTemperature(): number {
    return this.weatherData.getTemperature();
  }

  public getHumidity(): number {
    return this.weatherData.getHumidity();
  }

  public getPressure(): number {
    return this.weatherData.getPressure();
  }
}

export default ContextObject;
