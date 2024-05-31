import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import WeatherService from "./weather-service";

// business Logic

function getWeather(city) {
  WeatherService.getWeather(city)
    .then(function(response) {
      if (response.main) {
        printElements(response, city);
      } else {
        printError(response, city);
      }
    });
}

// ui logic

function printError(error, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: ${error}.`;
}

function printElements(response, city) {
  document.querySelector('#show-response').innerText = `The humidity in ${city} is ${response.main.humidity}%.
  The temperature in Fahrenheit is ${((response.main.temp - 273.15) * 9/5 + 32).toFixed(2)} degrees.
  The weather is ${response.weather[0].description}.`;
}

function handleFormSubmission(e) {
  e.preventDefault();
  const city = document.querySelector("#location").value;
  document.querySelector("#location").value = null;
  getWeather(city);
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});