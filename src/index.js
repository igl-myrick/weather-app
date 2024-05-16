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
    }
  });

  request.open("GET", url, true);
  request.send();
}

// ui logic

function printElements(apiResponse, city) {
  document.querySelector("#show-response").innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
  The temperature in Kelvins is ${apiResponse.main.temp} degrees.`;
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