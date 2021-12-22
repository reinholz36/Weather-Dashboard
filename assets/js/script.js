var searchFormEl = document.querySelector("#searchcityform");
var searchCityInputEl = document.querySelector("#searchcity");
var searchHistoryCityEl = document.querySelector("#history-container");
var citySearchTermEl = document.querySelector("#city-search-term");
var cityTitleCurrentEl = document.querySelector("#weather-in");
var cityDetailCurrentEl = document.querySelector("#city-current-details");
var tmpCurrentEl = document.querySelector("#tmp-current");
var tmpDisplayCurrentEl = document.querySelector("#tmp-display-current");
var wndCurrentEl = document.querySelector("#wnd-current");
var wndDisplayCurrentEl = document.querySelector("#wnd-display-current");
var humidCurrentEl = document.querySelector("#humid-current");
var humidDisplayCurrentEl = document.querySelector("#humid-display-current");
var uvCurrentEl = document.querySelector("#uv-current");
var uvDisplayCurrentEl = document.querySelector("#uv-display-current");
var cityHistoryArray = [];


var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityname = searchCityInputEl.value.trim();

    if (cityname) {
        getCityWeather(cityname);
        saveCityName(cityname);
        searchCityInputEl.value = "";
    } else {
        alert("Please enter a City name");
    }
};

searchFormEl.addEventListener("submit", formSubmitHandler);

// pulls weather data based on city submitted
var getCityWeather = function (cityname) {
    //format the github api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=4bba3cfced2651343b44d79c2548661a";
       
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            displayCurrent(data);
            getUVData(data);
            
        });
    } else {
        alert('Error: City Not Found');
    }
    });
    
};

// pulls UV data based on city submitted
var getUVData = function (data) {
    var latEl = data.coord.lat;
    var lonEl = data.coord.lon;

    //format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=4bba3cfced2651343b44d79c2548661a&lat=" + latEl + "&lon=" + lonEl;
    
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            gradeUVIndex(data);
        });
        } else {
            alert('Error: UV Data Not Found');
        }
    });
};

//grade and display UV index
var gradeUVIndex = function (data) {
if (data.value <= 5) {
    uvDisplayCurrentEl.classList = "uvLow"
}

if (data.value >= 6 && data.value <= 7) {
    uvDisplayCurrentEl.classList = "uvModerate"

} else if (data.value >= 8){
    uvDisplayCurrentEl.classList = "uvHighRisk"
}
uvDisplayCurrentEl.textContent = " " +  data.value; 
uvCurrentEl.appendChild(uvDisplayCurrentEl);
};


// *NOT Finished* Save city name to local storage 
var saveCityName = function (cityname) {
    console.log("city name", cityname);
}

//Convert time from UNIX to month/day/year
var unixConverter = function(data) {
    var unixTime = data.dt;
    var date = new Date(unixTime * 1000)
    var convertedTime = (date.getMonth()+1)
    + "/"+
    +date.getDate()
    + "/"
    +date.getFullYear();
    return convertedTime;
}

// Display current city and weather
var displayCurrent = function(data) {
    if (data.length === 0) {
        citySearchTermEl.textContent = "No City found.";
        return;
    }
    console.log("data2", data);
    var iconEl = document.createElement("img")
    iconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
    citySearchTermEl.textContent = data.name 
    +" "
    + unixConverter(data)
    +" "
    cityTitleCurrentEl.appendChild(citySearchTermEl);
    cityTitleCurrentEl.appendChild(iconEl);

    tmpDisplayCurrentEl.textContent = " " + Math.round(data.main.temp) + " ℉"
    wndDisplayCurrentEl.textContent = " " + data.wind.speed + " MPH"
    humidDisplayCurrentEl.textContent = " " + data.main.humidity + " %"
    
    tmpCurrentEl.appendChild(tmpDisplayCurrentEl);
    wndCurrentEl.appendChild(wndDisplayCurrentEl);
    humidCurrentEl.appendChild(humidDisplayCurrentEl);

}



