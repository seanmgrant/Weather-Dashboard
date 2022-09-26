var currentCity = '';
var searchHistoryEl = $("#search-history");
var cityInput = $("#city");
var APIKey = "fb2e2ebfd4b84c4a0bfcee86aa0e38f3";
var submitBtn = $("#submitBtn");
var userFormEl = $('#user-form');
var fiveDayForecastEl = $("#five-day-forecast");
var previousSearch = '';



function getCityWeather(newCity) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=" + APIKey + "&units=imperial";  
  fetch(queryURL) 
  .then(function (response) {
    return response.json();
  })
  .then(function (res) {
    console.log("Res: " +JSON.stringify(res));
    saveSearch(newCity);
    showHistory();
    let cityWeatherHTML = `
      <div class="card col-11 m-5">
        <h2>${res.name} ${moment().format("(MM/DD/YY)")} <img src= https://openweathermap.org/img/w/${res.weather[0].icon}.png> </h2>
        <ul class="list-unstyled m-3">
          <li>Temperature: ${res.main.temp}°F</li>
          <li>Humidity: ${res.main.humidity}%</li>
          <li>Wind Speed: ${res.wind.speed} mph</li>
        </ul>
      </div>`;
  $('#city-weather').html(cityWeatherHTML);

})};


// save to local storage
var saveSearch = function(newSearch){
  let repeat = false;
  for (let i = 0; i < localStorage.length; i++) {
      if (localStorage["cities" + i] === newSearch) {
          repeat = true;
          break;
      }
  }

  if (repeat === false) {
      localStorage.setItem('cities' + localStorage.length, newSearch);
  }
}


function showHistory(){
  $('#search-history').empty();
  if (localStorage.length===0){
    if (previousSearch){
      $('.city-search').attr("value", previousSearch);
    } else {
      $('.city-search').attr("value", "Denver");
        }
  } else {
    let lastCityKey="cities"+(localStorage.length-1);
    previousSearch=localStorage.getItem(lastCityKey);
    $('.city-search').attr("value", previousSearch);
    for (let i = 0; i < localStorage.length; i++) {
      let city = localStorage.getItem("cities" + i);
      let cityEl;
        if (currentCity===""){
            currentCity=previousSearch;
        }
      cityEl = `<button type="button" class="w-100 btn-block btn-light btn-lg">${city}</button>`;
        $('#search-history').append(cityEl);
        }
}}

function getForecast(newCity){
  let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + newCity + "&units=imperial" + "&appid=" + APIKey;
  fetch(forecastQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      console.log("resp :" + JSON.stringify(res))
      let forecastHTML = `
        <h3>5-Day Forecast:</h3>
        <div ml-10></div>`;
        // 5 day forecast 
        for (let i = 0; i < res.list.length; i++) {
            let day = res.list[i];
            let dayTime = day.dt;
            let timeZone = res.city.timezone;
            let timeZoneHours = timeZone / 60 / 60;
            let thisMoment = moment.unix(dayTime).utc().utcOffset(timeZoneHours);
            let iconURL = "https://openweathermap.org/img/w/" + day.weather[0].icon + ".png";
            if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
                forecastHTML += `
                <div class="forecast">
                  <ul class="text-sm list-unstyled">
                      <li><h5>${thisMoment.format("MM/DD/YY")}</h5></li>
                      <li><img src="${iconURL}"></li>
                      <li>Temp: ${day.main.temp}&#8457;</li>
                      <li>Humidity: ${day.main.humidity}%</li>
                      <li>Wind Speed: ${day.wind.speed} mph</li>
                  </ul>
                </div>`;
           
        forecastHTML += `</div>`;

        $('#five-day-forecast').html(forecastHTML);
}}})}


submitBtn.on("click", function(event){
  event.preventDefault();
  var temp = $("#city").val();
  getCityWeather(temp);
  getForecast(temp);
});

$("#search-history").on("click", function(event){
  event.preventDefault();
  var historyBtn = event.target.textContent;
  getCityWeather(historyBtn);
  getForecast(historyBtn);
});