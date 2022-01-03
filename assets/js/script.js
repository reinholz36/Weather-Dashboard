var searchFormEl = document.querySelector("#searchcityform");
var searchCityInputEl = document.querySelector("#searchcity");
var searchHistoryCityEl = document.querySelector("#history-container");
var searchHistoryDisplayEl = document.querySelector("#city-history-list-group");
var citySearchTermEl = document.querySelector("#city-search-term");
var cityTitleCurrentEl = document.querySelector("#weather-in");
var cityDetailCurrentEl = document.querySelector("#city-current-details");
var cityIconCurrentEl = document.querySelector("#current-icon");
var tmpCurrentEl = document.querySelector("#tmp-current");
var tmpDisplayCurrentEl = document.querySelector("#tmp-display-current");
var wndCurrentEl = document.querySelector("#wnd-current");
var wndDisplayCurrentEl = document.querySelector("#wnd-display-current");
var humidCurrentEl = document.querySelector("#humid-current");
var humidDisplayCurrentEl = document.querySelector("#humid-display-current");
var uvCurrentEl = document.querySelector("#uv-current");
var uvDisplayCurrentEl = document.querySelector("#uv-display-current");
var fiveDayTitleEl = document.querySelector("#five-day-title-container");
var fiveDayTitleErrorEl = document.querySelector("#five-day-error-alert");
var dayOneContainerEl = document.querySelector("#day-one-container");
var dayTwoContainerEl = document.querySelector("#day-two-container");
var dayThreeContainerEl = document.querySelector("#day-three-container");
var dayFourContainerEl = document.querySelector("#day-four-container");
var dayFiveContainerEl = document.querySelector("#day-five-container");
var dayOneDateEl = document.querySelector("#day-one-date");
var dayTwoDateEl = document.querySelector("#day-two-date");
var dayThreeDateEl = document.querySelector("#day-three-date");
var dayFourDateEl = document.querySelector("#day-four-date");
var dayFiveDateEl = document.querySelector("#day-five-date");
var dayOneIconEl = document.querySelector("#day-one-icon");
var dayTwoIconEl = document.querySelector("#day-two-icon");
var dayThreeIconEl = document.querySelector("#day-three-icon");
var dayFourIconEl = document.querySelector("#day-four-icon");
var dayFiveIconEl = document.querySelector("#day-five-icon");
var dayOneIconDisplayEl = document.querySelector("#day-one-icon-display");
var dayTwoIconDisplayEl = document.querySelector("#day-two-icon-display");
var dayThreeIconDisplayEl = document.querySelector("#day-three-icon-display");
var dayFourIconDisplayEl = document.querySelector("#day-four-icon-display");
var dayFiveIconDisplayEl = document.querySelector("#day-five-icon-display");
var dayOneTmpEl = document.querySelector("#day-one-tmp");
var dayTwoTmpEl = document.querySelector("#day-two-tmp");
var dayThreeTmpEl = document.querySelector("#day-three-tmp");
var dayFourTmpEl = document.querySelector("#day-four-tmp");
var dayFiveTmpEl = document.querySelector("#day-five-tmp");
var dayOneWndEl = document.querySelector("#day-one-wnd");
var dayTwoWndEl = document.querySelector("#day-two-wnd");
var dayThreeWndEl = document.querySelector("#day-three-wnd");
var dayFourWndEl = document.querySelector("#day-four-wnd");
var dayFiveWndEl = document.querySelector("#day-five-wnd");
var dayOneHumdityEl = document.querySelector("#day-one-humidity");
var dayTwoHumdityEl = document.querySelector("#day-two-humidity");
var dayThreeHumdityEl = document.querySelector("#day-three-humidity");
var dayFourHumdityEl = document.querySelector("#day-four-humidity");
var dayFiveHumdityEl = document.querySelector("#day-five-humidity");
var cityHistoryArray = [];

// Event listener for search input
var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityname = searchCityInputEl.value.trim();

    if (!cityname || cityname === "" || !isNaN(cityname)) {
        alert("Please enter a City name");
        searchCityInputEl.value = "";
        
    } else {
        getCityWeather(cityname);
        searchCityInputEl.value = "";
        
    }
};

// Event listener for city history
function historySelectHandler(event) {
    event.preventDefault();
    if(event.target.matches("button")) {
        var citynameHistory = event.target.textContent;
        getCityWeatherHistory(citynameHistory);
    }  
}

searchHistoryDisplayEl.addEventListener("click", historySelectHandler)
searchFormEl.addEventListener("submit", formSubmitHandler);

// Pulls weather data based on city submitted
var getCityWeather = function (cityname) {
    //format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=4bba3cfced2651343b44d79c2548661a";
       
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            displayCurrent(data);
            getUVData(data);
            getFiveDayData(data);
            saveCityName(cityname);
        });
    } else {
        alert('Error: City Not Found');
    }
    });
    
};

// Pulls weather data based on city History button
var getCityWeatherHistory = function (citynameHistory) {
    //format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citynameHistory + "&units=imperial&appid=4bba3cfced2651343b44d79c2548661a";
       
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            displayCurrent(data);
            getUVData(data);
            getFiveDayData(data);
            
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

// pulls 5 day forcast data based on city submitted
var getFiveDayData = function (data) {
    var fiveDayCity = data.name;
    //format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + fiveDayCity + "&units=imperial&appid=4bba3cfced2651343b44d79c2548661a";
    
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            displayFiveDay(data);
        });
        } else {
            alert('Error: 5-Day Forcast Data Not Found');
        }
    });
};

//grade and display UV index
var gradeUVIndex = function (data) {
if (data.value <= 5) {
    uvDisplayCurrentEl.classList = "uvLow"
}

if (data.value >= 6 && data.value <= 7.9) {
    uvDisplayCurrentEl.classList = "uvModerate"

} else if (data.value >= 8){
    uvDisplayCurrentEl.classList = "uvHighRisk"
}
uvDisplayCurrentEl.textContent = " " +  data.value; 
uvCurrentEl.appendChild(uvDisplayCurrentEl);
};


//Save city name to local storage
var saveCityName = function (cityname) {
    var combineHistory = JSON.parse(localStorage.getItem("cityHistoryArray"));
    if (combineHistory == null) combineHistory = [];
    var enterHistory = {
        key: "cityname",
        value: cityname
    };
    localStorage.setItem("enterHistory", JSON.stringify(enterHistory));
    combineHistory.push(enterHistory);
    localStorage.setItem("cityHistoryArray", JSON.stringify(combineHistory));
    var displayCity = document.createElement("button");
        displayCity.textContent = cityname;
        displayCity.className = "col-12 cityH"
        searchHistoryDisplayEl.appendChild(displayCity);
};


//display historical search
window.onload = () => {
    var loadCityName = JSON.parse(localStorage.getItem("cityHistoryArray")) ?? [];
    var cityNumber = 0;
    
    for (var i = 0; i < loadCityName.length; i++) {
        var pullCityName = loadCityName[i].value
        if (cityNumber < loadCityName.length) {
            cityNumber++
        }

        var displayCity = document.createElement("button");
        displayCity.textContent = pullCityName;
        displayCity.className = "col-12 cityH"
        displayCity.id = "CN" + cityNumber;
        searchHistoryDisplayEl.appendChild(displayCity);
    }
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
    cityIconCurrentEl.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
    citySearchTermEl.textContent = data.name 
    +" "
    + unixConverter(data)
    +" "
    cityTitleCurrentEl.appendChild(citySearchTermEl);
    cityTitleCurrentEl.appendChild(cityIconCurrentEl);

    tmpDisplayCurrentEl.textContent = " " + Math.round(data.main.temp) + " ℉"
    wndDisplayCurrentEl.textContent = " " + Math.round(data.wind.speed) + " MPH"
    humidDisplayCurrentEl.textContent = " " + data.main.humidity + " %"
    
    tmpCurrentEl.appendChild(tmpDisplayCurrentEl);
    wndCurrentEl.appendChild(wndDisplayCurrentEl);
    humidCurrentEl.appendChild(humidDisplayCurrentEl);
}

// Display 5 day forcast
var displayFiveDay = function(data) {
    if (data.length === 0) {
        fiveDayTitleErrorEl.textContent = "No Five Day Forcast found.";
        return;
    }

    dayOneDateEl.textContent = moment.unix(data.list[7].dt).format("ddd MM/DD/YYYY")
    dayTwoDateEl.textContent = moment.unix(data.list[14].dt).format("ddd MM/DD/YYYY")
    dayThreeDateEl.textContent = moment.unix(data.list[21].dt).format("ddd MM/DD/YYYY")
    dayFourDateEl.textContent = moment.unix(data.list[28].dt).format("ddd MM/DD/YYYY")
    dayFiveDateEl.textContent = moment.unix(data.list[35].dt).format("ddd MM/DD/YYYY")

    dayOneIconDisplayEl.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[7].weather[0].icon + ".png")
    dayTwoIconDisplayEl.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[14].weather[0].icon + ".png")
    dayThreeIconDisplayEl.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[21].weather[0].icon + ".png")
    dayFourIconDisplayEl.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[28].weather[0].icon + ".png")
    dayFiveIconDisplayEl.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[35].weather[0].icon + ".png")

    dayOneTmpEl.textContent = "Temp: " + Math.round(data.list[7].main.temp) + " ℉"
    dayTwoTmpEl.textContent = "Temp: " + Math.round(data.list[14].main.temp) + " ℉"
    dayThreeTmpEl.textContent = "Temp: " + Math.round(data.list[21].main.temp) + " ℉"
    dayFourTmpEl.textContent = "Temp: " + Math.round(data.list[28].main.temp) + " ℉"
    dayFiveTmpEl.textContent = "Temp: " + Math.round(data.list[35].main.temp) + " ℉"

    dayOneWndEl.textContent = "Wind: " + Math.round(data.list[7].wind.speed) + " MPH"
    dayTwoWndEl.textContent = "Wind: " + Math.round(data.list[14].wind.speed) + " MPH"
    dayThreeWndEl.textContent = "Wind: " + Math.round(data.list[21].wind.speed) + " MPH"
    dayFourWndEl.textContent = "Wind: " + Math.round(data.list[28].wind.speed) + " MPH"
    dayFiveWndEl.textContent = "Wind: " + Math.round(data.list[35].wind.speed) + " MPH"

    dayOneHumdityEl.textContent = "Humidity: " + data.list[7].main.humidity + " %"
    dayTwoHumdityEl.textContent = "Humidity: " + data.list[14].main.humidity + " %"
    dayThreeHumdityEl.textContent = "Humidity: " + data.list[21].main.humidity + " %"
    dayFourHumdityEl.textContent = "Humidity: " + data.list[28].main.humidity + " %"
    dayFiveHumdityEl.textContent = "Humidity: " + data.list[35].main.humidity + " %"

}



