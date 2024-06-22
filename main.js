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
  console.log(data);
  tempValue.textContent = Math.round(data.main.temp) + "°C";
  city.textContent = data.name;
  humidity.textContent = data.main.humidity + "%";
  windSpeed.textContent = data.wind.speed + " km/h";
  try {
    document
      .querySelector(".status")
      .setAttribute("src", `./images/${data.weather[0].main}.png`);
  } catch (err) {
    console.log(err);
    document
      .querySelector(".status")
      .setAttribute("src", `./images/haze.png`);
  }
  // document
  //   .querySelector(".status")
  //   .setAttribute("src", `/images/${data.weather[0].main}.png`);
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
