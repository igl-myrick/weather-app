import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

// business Logic

function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
  
  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, city);
    } else {
      printError(this, response, city);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// ui logic

function printError(request, apiResponse, city) {
  document.querySelector("#show-response").innerText = `There was an error accessing the weather data for ${city}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse, city) {
  console.log(apiResponse);
  document.querySelector("#show-response").innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
  The temperature in Fahrenheit is ${((apiResponse.main.temp - 273.15) * 9/5 + 32).toFixed(2)} degrees.
  The weather is ${apiResponse.weather[0].description}.`;
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