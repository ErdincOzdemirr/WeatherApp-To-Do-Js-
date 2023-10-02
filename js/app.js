const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const ApiKey = "93bbbf1a54364548f7080778169453da";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&units=metric&appid=${ApiKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "420px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error.style.display = "block";
        error.classList.add("fadeIn");
        return;
      }

      error.style.display = "none";
      error.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperatures = document.querySelector(".weather-box .temperature");
      const descriptions = document.querySelector(".weather-box .description");
      const humidities = document.querySelector(".weather-details .humidity span");
      const winds = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/clouds.png";
          break;
        case "Haze":
          image.src = "images/haze.png";
          break;
        default:
          image.src = "";
      }

      temperatures.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      descriptions.innerHTML = `${json.weather[0].description}`;
      humidities.innerHTML = `%${json.main.humidity}`;
      winds.innerHTML = `${json.wind.speed} km/s`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "605px";
    });
});
