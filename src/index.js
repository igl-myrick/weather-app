import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

// business Logic

function getWeather(city) {
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
    request.addEventListener("loadend", function() {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve([response, city]);
      } else {
        reject([this, response, city]);
      }
    });
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function(weatherDataArray) {
    printElements(weatherDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

// ui logic

function printError(error) {
  document.querySelector("#showResponse").innerText = `There was an error accessing the weather data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function printElements(data) {
  document.querySelector("#show-response").innerText = `The humidity in ${data[1]} is ${data[0].main.humidity}%.
  The temperature in Fahrenheit is ${((data[0].main.temp - 273.15) * 9/5 + 32).toFixed(2)} degrees.
  The weather is ${data[0].weather[0].description}.`;
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