interface SetMeasurements {
  setMeasurements: (
    temperature: number,
    humidity: number,
    pressure: number
  ) => void;
}

interface Subject {
  registerObserver: (observer: Observer) => void;
  removeObserver: (observer: Observer) => void;
  notifyObservers: () => void;
}

interface Observer {
  update: (temperature: number, humidity: number, pressure: number) => void;
}

interface GetMeasurements {
  getTemperature: () => number;
  getHumidity: () => number;
  getPressure: () => number;
}

interface DisplayElement {
  display: () => void;
}

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
}

class CurrentConditionsDisplay implements Observer, DisplayElement {
  private temperature: number = 0;
  private humidity: number = 0;
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
    if (this.currentPressure > this.lastPressure) {
      forecast = "Improving weather on the way!";
    } else if (this.currentPressure === this.lastPressure) {
      forecast = "More of the same";
    } else if (this.currentPressure < this.lastPressure) {
      forecast = "Watch out for cooler, rainy weather";
    }
    console.log(`Forecast: ${forecast}`);
  }
}

class WeatherStation {
  public static main(): void {
    const weatherData = new WeatherData();

    const currentDisplay = new CurrentConditionsDisplay(weatherData);
    const statisticsDisplay = new StatisticsDisplay(weatherData);
    const forecastDisplay = new ForecastDisplay(weatherData);

    weatherData.setMeasurements(80, 65, 30.4);
    weatherData.setMeasurements(82, 70, 29.2);
    weatherData.setMeasurements(78, 90, 29.2);
  }
}

interface IRequest {}

interface Interceptor {
  intercept: (request: IRequest) => void;
}

interface IDispatcher {
  registerInterceptor: (interceptor: Interceptor) => void;
  removeInterceptor: (interceptor: Interceptor) => void;
  dispatch: (request: IRequest) => void;
}

class Dispatcher implements IDispatcher {
  private interceptors: Set<Interceptor> = new Set();

  public registerInterceptor(interceptor: Interceptor): void {
    this.interceptors.add(interceptor);
  }

  public removeInterceptor(interceptor: Interceptor): void {
    this.interceptors.delete(interceptor);
  }

  public dispatch(request: IRequest): void {
    this.interceptors.forEach((interceptor) => {
      interceptor.intercept(request);
    });
  }
}

class Application {
  private dispatcher: IDispatcher;

  constructor(dispatcher: IDispatcher) {
    this.dispatcher = dispatcher;
  }

  public run(): void {
    const request: IRequest = {};
    this.dispatcher.dispatch(request);
  }

  public registerInterceptor(interceptor: Interceptor): void {
    this.dispatcher.registerInterceptor(interceptor);
  }

  public removeInterceptor(interceptor: Interceptor): void {
    this.dispatcher.removeInterceptor(interceptor);
  }
}

WeatherStation.main();
