let searchIcon = document.querySelector(".search .icon");
let searchInput = document.querySelector(".search input");
let tempValue = document.querySelector(".temperature");
let city = document.querySelector(".city-name");
let humidity = document.querySelector(".humidity-value");
let windSpeed = document.querySelector(".wind-speed");
let cityName = "Tahta";
const apiKey = "ce7bbeabdb7da1e5dbb46642071ba685";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function checkWeather() {
  const response = await fetch(apiUrl + `&q=${cityName}` + `&appid=${apiKey}`);
  document.querySelector(".error").style.display = "none";
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    setTimeout(() => {
      document.querySelector(".error").style.display = "none";
    }, 10000);
  }
  const data = await response.json();
  tempValue.textContent = Math.round(data.main.temp) + "°C";
  city.textContent = data.name;
  humidity.textContent = data.main.humidity + "%";
  windSpeed.textContent = data.wind.speed + " km/h";
  let status = data.weather[0].main;
  switch (status) {
    case "Clear":
      document.querySelector(".status").setAttribute("src", `./Clear.png`);
      break;
    case "Clouds":
      document.querySelector(".status").setAttribute("src", `./Clouds.png`);
      break;
    case "Drizzle":
      document.querySelector(".status").setAttribute("src", `./Drizzle.png`);
      break;
    case "Fog":
      document.querySelector(".status").setAttribute("src", `./Fog.png`);
      break;
    case "Haze":
      document.querySelector(".status").setAttribute("src", `./Haze.png`);
      break;
    case "Mist":
      document.querySelector(".status").setAttribute("src", `./Mist.png`);
      break;
    case "Rain":
      document.querySelector(".status").setAttribute("src", `./Rain.png`);
      break;
    case "Snow":
      document.querySelector(".status").setAttribute("src", `./Snow.png`);
      break;
    case "Wind":
      document.querySelector(".status").setAttribute("src", `./Wind.png`);
      break;
    default:
      document.querySelector(".status").setAttribute("src", `./Mist.png`);
      break;
  }
}

window.onload = () => {
  searchInput.focus();
};

checkWeather();
searchIcon.onclick = () => {
  cityName = searchInput.value;
  searchInput.value = "";
  checkWeather();
  searchInput.focus();
};
searchInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    searchIcon.click();
  }
});
