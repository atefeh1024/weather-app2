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

function ToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  let temperature = temp.innerHTML;
  temp.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", ToFahrenheit);
function convertToCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  let temperature = temp.innerHTML;
  temp.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
