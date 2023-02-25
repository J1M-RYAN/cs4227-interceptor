interface GetMeasurements {
  getTemperature: () => number;
  getHumidity: () => number;
  getPressure: () => number;
}

export default GetMeasurements;
