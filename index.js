

function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let windElement = document.querySelector("#wind"); 
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time *1000);
    let iconElement = document.querySelector("#icon");
    
   
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed} m/h`;
    temperatureElement.innerHTML = Math.round(temperature);

    getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}



function citySearch(city) {
    let apiKey ="fd09t4eabb5a4a07bf90fbe0e2oe3ae5";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(refreshWeather);

}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
     cityElement.innerHTML = searchInput.value;
     citySearch(searchInput.value);

}

function formatDay(timestamp) {
    let date = new Date(timestamp *1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast (city) {
    let apiKey = "fd09t4eabb5a4a07bf90fbe0e2oe3ae5";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios(apiUrl).then(displayForecast);
}



function displayForecast(response) {
    
    let forecastHtml = "";

    response.data.daily.forEach(function (day , index) {
       if (index < 5)  {
    forecastHtml = forecastHtml + 
    `
    <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
    <div class="weather-forecast-temperatures">   
       <span class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°    </span>  
       <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span> 
    </div>
</div>
`;
    }
});


let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector('.search-form');
searchFormElement.addEventListener("submit", handleSearchSubmit);

citySearch("Denver");





