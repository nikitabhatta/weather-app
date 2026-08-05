const apiKey = "4c3c823c7c2d967106d950012cfcaefd";
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

    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "images/cloud.png";
    }
    else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "images/clear.png";
    }
    else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "images/heavy-rain.png";
    }
    else {
        weatherIcon.src = "images/weather.png";
    }
}

searchButton.addEventListener("click", function () {
    const cityName = cityInput.value;
    getWeather(cityName);
});
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather(cityInput.value);
    }

});
