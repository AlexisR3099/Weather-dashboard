var key = '65a6ef9e53b138d495fa2864b093996c';
var historyArray = [];

var formSubmit = function(event) {
    event.preventDefault();
    let city = document.getElementById('citySearch').value.trim();
    if(city) {
        cityData(city);
        city.value = '';
    } else {
        alert('Enter a city');
    }
};

var cityData = function(city) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    fetch(apiURL).then((response) => {
        if(response.ok) {
            response.json().then((data) => {
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                var callAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`
                fetch(callAPI).then((response) => {
                    response.json().then((data) => {
                        currentWeather(city, data);
                        //futureWeather(data);
                        console.log(data);
                    })
                })
            })
        }
    })
};

function currentWeather(city, data) {
    var newCity = city.charAt(0).toUpperCase() + city.slice(1);

    var currentTime = moment.unix(data.current.dt).format('MM/DD/YYYY');
    var currentTemperature = ((data.current.temp - 273.15) * 1.8) + 32;
    var currentWind = data.current.wind_speed;
    var currentHumidity = data.current.humidity;
    var currentUvi = data.current.uvi;

    var currentWeatherNews = document.querySelector('#city-weather');

    currentWeatherNews.innerHTML = 
    `<h5>${newCity} (${currentTime})<h4>
    <p>Temperature: ${currentTemperature.toFixed(2)}&deg;F</p>
    <p>Humidity: ${currentHumidity}%<p>
    <p>UV Index: <span id='currentUvi'>${currentUvi}</span></p>`
}

document.querySelector("#search-btn").addEventListener('click', formSubmit);