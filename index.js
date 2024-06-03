

function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let windElement = document.querySelector("#wind");
    let wind = response.data.wind.speed;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
   
   
   
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = Math.round(wind);
    temperatureElement.innerHTML = Math.round(temperature);

    
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


let searchFormElement = document.querySelector('.search-form');
searchFormElement.addEventListener("submit", handleSearchSubmit);

citySearch("Denver");


