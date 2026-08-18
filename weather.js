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
    //async: makes a funtion to return a promise and lets u use await inside it
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;//creating the weather API url using the city name
    const response = await fetch(url);
    //fetch: send a request to the weather Api and wait for it to respond.
    // await: wait for promise to finish then give result
    if (response.status == 404) {//check if city found or not
        alert("City not found!");
        return;
    }
    const data = await response.json();//convert api response into JSON data
    console.log(data);

    temperature.innerHTML = Math.round(data.main.temp) + "&deg;C";//get the current temperature,rounds it and display it in celcius
    city.innerHTML = data.name;//get the city name from api and displays it
    description.innerHTML = data.weather[0].main;//gets the main weather condition ani display it
    maximumTemp.innerHTML = "H:" + Math.round(data.main.temp_max) + "&deg;C";
    minimumTemp.innerHTML = "L:" + Math.round(data.main.temp_min) + "&deg;C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/h";

    const weatherCondition = data.weather[0].main;//store the current weather condition like clouds,clear or rainy

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
