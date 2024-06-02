

function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");

    cityElement.innerHTML = response.data.city;
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


