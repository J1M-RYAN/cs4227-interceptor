import inquirer from "inquirer";
import chalk from "chalk";

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
  private weatherData: WeatherData;
  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;

    const currentDisplay = new CurrentConditionsDisplay(weatherData);
    const statisticsDisplay = new StatisticsDisplay(weatherData);
    const forecastDisplay = new ForecastDisplay(weatherData);

    weatherData.setMeasurements(80, 65, 30.4);
  }
}

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

interface Interceptor {
  intercept: (request: ContextObject) => void;
}

class MeasurementsChangedLogger implements Interceptor {
  public intercept(context: ContextObject): void {
    console.log(chalk.yellow.bgBlack.bold("MeasurementsChangedLogger"));
    console.log(
      chalk.yellow.bgBlack.bold("Temperature: " + context.getTemperature())
    );
    console.log(
      chalk.yellow.bgBlack.bold("Humidity: " + context.getHumidity())
    );
    console.log(
      chalk.yellow.bgBlack.bold("Pressure: " + context.getPressure())
    );
  }
}

interface IDispatcher {
  registerInterceptor: (interceptor: Interceptor) => void;
  removeInterceptor: (interceptor: Interceptor) => void;
  dispatch: (request: ContextObject) => void;
}

class Dispatcher implements IDispatcher {
  private interceptors: Set<Interceptor> = new Set();
  private static dispatcher: IDispatcher;

  public static getInstance(): IDispatcher {
    if (!Dispatcher.dispatcher) {
      Dispatcher.dispatcher = new Dispatcher();
    }
    return Dispatcher.dispatcher;
  }

  public registerInterceptor(interceptor: Interceptor): void {
    this.interceptors.add(interceptor);
  }

  public removeInterceptor(interceptor: Interceptor): void {
    this.interceptors.delete(interceptor);
  }

  public dispatch(contextObject: ContextObject): void {
    this.interceptors.forEach((interceptor) => {
      interceptor.intercept(contextObject);
    });
  }
}

class Application {
  private dispatcher: IDispatcher;

  constructor(dispatcher: IDispatcher) {
    this.dispatcher = dispatcher;
  }

  public dispatch(request: ContextObject): void {
    this.dispatcher.dispatch(request);
  }

  public registerInterceptor(interceptor: Interceptor): void {
    this.dispatcher.registerInterceptor(interceptor);
  }

  public removeInterceptor(interceptor: Interceptor): void {
    this.dispatcher.removeInterceptor(interceptor);
  }
}

const weatherData = new WeatherData();
const weatherStation = new WeatherStation(weatherData);
const dispatcher = Dispatcher.getInstance();
const application = new Application(dispatcher);

application.registerInterceptor(new MeasurementsChangedLogger());

function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "weatherAction",
        message: "Which action would you like to perform?",
        choices: ["View Weather Data", "Edit Weather Data", "Exit"],
      },
    ])
    .then((answers) => {
      console.info("Answer:", answers.weatherAction);

      if (answers.weatherAction === "View Weather Data") {
        weatherData.getTemperature();

        promptUser();
      } else if (answers.weatherAction === "Edit Weather Data") {
        inquirer
          .prompt([
            {
              type: "list",
              name: "weatherProperty",
              message: "Which weather property would you like to edit?",
              choices: ["temperature", "humidity", "pressure"],
            },
            {
              type: "number",
              name: "newValue",
              message:
                "What is the new value for the selected weather property?",
            },
          ])
          .then((answers) => {
            if (answers.weatherProperty === "temperature") {
              weatherData.setTemperature(answers.newValue);
            } else if (answers.weatherProperty === "humidity") {
              weatherData.setHumidity(answers.newValue);
            } else if (answers.weatherProperty === "pressure") {
              weatherData.setPressure(answers.newValue);
            }
            promptUser();
          });
      } else if (answers.weatherAction === "Exit") {
        console.log("Exiting program.");
      }
    });
}

promptUser();

/// add remove interceptor to prompt
// add or remove logger
