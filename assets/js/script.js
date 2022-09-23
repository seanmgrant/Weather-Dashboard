var weatherKey = "fb2e2ebfd4b84c4a0bfcee86aa0e38f3";
var city;
var fetchButton = document.getElementById('fetch-button');
var inputField = document.getElementById('city');
var weatherBox = document.getElementById('weatherBox');


// let today = function timeStamp (){
//     $('#currentDay').text(`${moment().format('MMMM Do YYYY, h:mm a')}`);
//     };
//     today();
//     setInterval(today, 1000);

function displayWeather(mainWeatherData) {
    // do some stuff with mainWeatherData
    // and so on....
    // to get the humidity you would do mainWeatherData.humidity
    mainWeatherData.humidity
}

function getWeather() {
    console.log('inside getWeather');
    city = inputField.value;
    console.log('city is', city);

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherKey + "&units=imperial";

    fetch(queryURL)
        .then(function (response) {
            console.log('The response object looks like', response);
            return response.json();
        }, function(rejection) {
            console.log('The promise was rejected!', rejection)
        })
        .then(function (data) {
            console.log(data);
            weatherBox.textContent = data.main.temp
            // continue to add code within this then method
            // define some custom function and include it here
            displayWeather(data.main)
        });

    // fetch(queryURL)
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));
}


fetchButton.addEventListener('click', getWeather);


