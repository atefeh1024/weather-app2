let now = new Date();
function formatDate(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = days[time.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `Last updated:${weekday} , ${hours}:${minutes}`;
}
let date = document.querySelector("#time");
date.innerHTML = formatDate(now);

function displayWeatherCondition(response) {
  document.querySelector("h2").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
}

function searchCity(city) {
  let apiKey = "70b5a5a8o3c4532b4520aadfatf8fd00";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function replace(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}
let searchcity = document.querySelector("#input-city");
searchcity.addEventListener("submit", replace);

let celsiusTemperature = null;

function CelusToFarenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");

  let farenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);

  temperature.innerHTML = farenheitTemp;
  celsius.classList.remove("active");
  farenheit.classList.add("active");
}
let farenheit = document.querySelector("#fahrenheit-link");
farenheit.addEventListener("click", CelusToFarenheit);

/// Farenheit to Celsius

function FarenheitToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  farenheit.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", FarenheitToCelsius);
