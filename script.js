const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const cities = document.querySelectorAll('.city');

let cityInput = "London";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (search.value.trim() === "") {
        alert('Please enter a city name');
        return;
    }
    cityInput = search.value;
    fetchWeatherData();
    search.value = "";
    app.style.opacity = "0";
});

function dayOfTheWeek(day, month, year) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(`${year}-${month}-${day}`).getDay()];
}

function fetchWeatherData() {
    const apiKey = "685aaf0acc4f4f0386c113332252001";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            temp.innerHTML = `${data.current.temp_c}&#176;`;
            console.log(data);
            conditionOutput.innerHTML = data.current.condition.text;
            cloudOutput.innerHTML = `${data.current.cloud}%`;
            humidityOutput.innerHTML = `${data.current.humidity}%`;
            windOutput.innerHTML = `${data.current.wind_kph} km/h`;

            const date = data.location.localtime;
            const [y, m, d] = date.substr(0, 10).split('-');
            const time = date.substr(11);

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}-${m}-${y}`;
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.location.name;

            icon.src = `https:${data.current.condition.icon}?timestamp=${Date.now()}`;

            let timeOfDay = data.current.is_day ? "day" : "night";
            const code = data.current.condition.code;

            if (code === 1000) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;     // Sunny Day 
            } else if (code >= 1003 && code <= 1030) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;  // cloudy Day 
            } else {
                app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;   // rainy Day 
            }

            app.style.opacity = "1";
        })
        .catch(err => {
            alert("city Not found");
            app.style.opacity = "1";
        });
}

fetchWeatherData();
