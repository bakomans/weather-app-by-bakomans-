$(document).ready(function () {
    // My Api key
    const apiKey = "a4a04040b26ae7120449f277bffe523d";
  
    // Event listener for the form 
    $("#search-form").submit(function (event) {
      event.preventDefault();
      const cityName = $("#search-input").val().trim();
  
      if (cityName !== "") {
        $("#search-input").val("");
        getWeather(cityName);
      }
    });
  
    // Function to fetch weather data
    function getWeather(cityName) {
      const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  
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
      const currentWeather = data.list[0];
      const city = data.city.name;
      const date = dayjs().format("MM/DD/YYYY");
      const iconCode = currentWeather.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;
      const temperature = currentWeather.main.temp;
      const humidity = currentWeather.main.humidity;
      const windSpeed = currentWeather.wind.speed;
  
      const currentWeatherHTML = `
        <h2>${city} (${date}) <img src="${iconURL}" alt="Weather Icon"></h2>
        <p>Temperature: ${temperature} &#8457;</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} MPH</p>
      `;
  
      $("#today").html(currentWeatherHTML);
    }
  
    // Function to display 5-day forecast
    function displayForecast(data) {
        const forecast = data.list.slice(1, 6);
      
        let forecastHTML = "";
        forecast.forEach((item) => {
          const date = dayjs(item.dt_txt).format("MM/DD/YYYY");
          const iconCode = item.weather[0].icon;
          const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;
          const temperature = item.main.temp;
          const humidity = item.main.humidity;
      
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
      const historyItem = `<button type="button" class="list-group-item">${cityName}</button>`;
      $("#history").prepend(historyItem);
  
      // Event listener for history item 
      $(".list-group-item").click(function () {
        const selectedCity = $(this).text();
        getWeather(selectedCity);
      });
    }
  });
  