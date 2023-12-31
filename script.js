$(document).ready(function () {
    // My Api key
    var apiKey = "a4a04040b26ae7120449f277bffe523d";
  
    // Event listener for the form 
    $("#search-form").submit(function (event) {
      event.preventDefault();
      var cityName = $("#search-input").val().trim();
  
      if (cityName !== "") {
        $("#search-input").val("");
        getWeather(cityName);
      }
    });
  
    // Function to fetch weather data
    function getWeather(cityName) {
      var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        displayCurrentWeather(response);
        displayForecast(response);
        addToHistory(cityName);
      });
    }
  
    // Function to display current weather
    function displayCurrentWeather(data) {
      var currentWeather = data.list[0];
      var city = data.city.name;
      var date = dayjs().format("MM/DD/YYYY");
      var iconCode = currentWeather.weather[0].icon;
      var iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;
      var temperature = currentWeather.main.temp;
      var humidity = currentWeather.main.humidity;
      var windSpeed = currentWeather.wind.speed;
  
      var currentWeatherHTML = `
        <h2>${city} (${date}) <img src="${iconURL}" alt="Weather Icon"></h2>
        <p>Temperature: ${temperature} &#8457;</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} MPH</p>
      `;
  
      $("#today").html(currentWeatherHTML);
    }
  
    // Function to display 5-day forecast
    function displayForecast(data) {
        var forecast = data.list.slice(1, 6);
      
        let forecastHTML = "";
        forecast.forEach((item) => {
          var date = dayjs(item.dt_txt).format("MM/DD/YYYY");
          var iconCode = item.weather[0].icon;
          var iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;
          var temperature = item.main.temp;
          var humidity = item.main.humidity;
      
          forecastHTML += `
            <div class="col-md">
              <div class="card bg-primary text-white">
                <div class="card-body">
                  <h5>${date}</h5>
                  <img src="${iconURL}" alt="Weather Icon">
                  <p>Temp: ${temperature} &#8457;</p>
                  <p>Humidity: ${humidity}%</p>
                </div>
              </div>
            </div>
          `;
        });
      
        $("#forecast").html(forecastHTML);
      }
  
    // Function to add the city to the search 
    function addToHistory(cityName) {
      var historyItem = `<button type="button" class="list-group-item">${cityName}</button>`;
      $("#history").prepend(historyItem);
  
      // Event listener for history item 
      $(".list-group-item").click(function () {
        var selectedCity = $(this).text();
        getWeather(selectedCity);
      });
    }
  });
// Function to clear the search history
function clearHistory() {
    localStorage.removeItem("searchHistory");
    $("#history").empty(); // Clear the history displayed on the page
  }
  
  // Event listener for the "Clear History" button
  $("#clear-history-button").on("click", function () {
    clearHistory();
  });  
  