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

//Top: Not working Yet!!!! Example function that pulls from weather API or translates GP coordinates from city 
var getCityWeather = function (cityname) {
    //format the github api url
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityname + "&limit=5&appid=4bba3cfced2651343b44d79c2548661a";
   
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};
getCityWeather()
//Bottom: Not working Yet!!!! Example function that pulls from weather API or translates GP coordinates from city 