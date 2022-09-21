var weatherKey = "fb2e2ebfd4b84c4a0bfcee86aa0e38f3";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherKey;

fetch(queryURL)

