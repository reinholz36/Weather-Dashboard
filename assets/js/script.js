var searchFormEl = document.querySelector("#searchcityform");
var searchCityInputEl = document.querySelector("#searchcity");
var searchHistoryCityEl = document.querySelector("#history-container");
var citySearchTermEl = document.querySelector("#city-search-term");


var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityname = searchCityInputEl.value.trim();

    if (cityname) {
        //Update this function name(getUserRepos) example only! 
        getCityWeather(cityname);
        searchCityInputEl.value = "";
    } else {
        alert("Please enter a City name");
    }
    console.log(event);
};

searchFormEl.addEventListener("submit", formSubmitHandler);

// pulls weather data based on city submitted
var getCityWeather = function (cityname) {
    //format the github api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=4bba3cfced2651343b44d79c2548661a";
       
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

