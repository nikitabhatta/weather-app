const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const temperature = document.querySelector(".temperature");
const city = document.querySelector(".city");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
const maximumTemp = document.querySelector(".maximum-temp");
const minimumTemp = document.querySelector(".minimum-temp");

async function getWeather(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    if (response.status == 404) {
        alert("City not found!");
        return;
    }
    const data = await response.json();
    console.log(data);

    temperature.innerHTML = Math.round(data.main.temp) + "&deg;C";
    city.innerHTML = data.name;
    description.innerHTML = data.weather[0].main;
    maximumTemp.innerHTML = "H:" + Math.round(data.main.temp_max) + "&deg;C";
    minimumTemp.innerHTML = "L:" + Math.round(data.main.temp_min) + "&deg;C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/h";

    const weatherCondition = data.weather[0].main;

    const icons = {
        Clouds: "images/cloud.png",
        Clear: "images/clear.png",
        Rain: "images/heavy-rain.png",

    };

    weatherIcon.src = icons[weatherCondition];
}

function searchWeather() {
    const cityName = cityInput.value.trim();
    if (cityName === "") {
        alert("Please enter a city name");
        return;
    }

    getWeather(cityName);
}
searchButton.addEventListener("click", searchWeather);
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchWeather();
    }
});
