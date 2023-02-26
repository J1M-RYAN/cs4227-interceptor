import inquirer from "inquirer";
import WeatherData from "./WeatherStation/WeatherData";
import WeatherStation from "./WeatherStation/WeatherStation";
import Dispatcher from "./Interceptor/Dispatcher";
import Application from "./Interceptor/Application";
import MeasurementsChangedLogger from "./Interceptor/MeasurementsChangedLogger";

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
        weatherStation.display();
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
