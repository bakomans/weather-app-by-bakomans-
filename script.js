// creating Dom and Variables
document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'a4a04040b26ae7120449f277bffe523d';
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const todaySection = document.getElementById('today');
    const forecastSection = document.getElementById('forecast');
    const historyList = document.getElementById('history');
  
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const city = searchInput.value.trim();
  
      if (city) {
        // Fetch current weather
        fetchWeatherData(city);
      }
    });
  
    historyList.addEventListener('click', function (e) {
      if (e.target.matches('.history-item')) {
        const city = e.target.textContent;
        // Fetch weather data for the selected city
        fetchWeatherData(city);
      }
    });
  
    function fetchWeatherData(city) {
      // Call OpenWeatherMap API to get weather data
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Display current weather
          displayCurrentWeather(data);
  
          // Add city to search history
          addToSearchHistory(city);
  
          // Call OpenWeatherMap API to get 5-day forecast
          return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        })
        .then(response => response.json())
        .then(data => {
          // Display 5-day forecast
          displayForecast(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
    }
  
    function displayCurrentWeather(data) {
      // Implement code to display current weather
      todaySection.innerHTML = `
        <h2>${data.name} - ${dayjs().format('MMMM D, YYYY')}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
    }
  
    function displayForecast(data) {
      // Implement code to display 5-day forecast
      forecastSection.innerHTML = '<h2>5-Day Forecast</h2>';
      for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        forecastSection.innerHTML += `
          <div class="col-md-2">
            <p>Date: ${dayjs(forecast.dt_txt).format('MMMM D, YYYY')}</p>
            <p>Temperature: ${forecast.main.temp}°C</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
          </div>
        `;
      }
    }
  
    function addToSearchHistory(city) {
      // Add city to search history
      const historyItem = document.createElement('div');
      historyItem.textContent = city;
      historyItem.classList.add('history-item', 'list-group-item', 'list-group-item-action');
      historyList.prepend(historyItem);
    }
  });
  function displayCurrentWeather(data) {
    todaySection.innerHTML = `
      <h2>${data.name} - ${dayjs().format('MMMM D, YYYY')}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <p>Weather: ${data.weather[0].description} <i class="fas fa-${getWeatherIcon(data.weather[0].icon)}"></i></p>
    `;
  }
  
  function getWeatherIcon(iconCode) {
    // Map OpenWeatherMap icon codes to FontAwesome icons
    const iconMap = {
      '01d': 'sun',
      '01n': 'moon',
      '02d': 'cloud-sun',
      '02n': 'cloud-moon',
      '03d': 'cloud',
      '03n': 'cloud',
      '04d': 'cloud',
      '04n': 'cloud',
      '09d': 'cloud-showers-heavy',
      '09n': 'cloud-showers-heavy',
      '10d': 'cloud-sun-rain',
      '10n': 'cloud-moon-rain',
      '11d': 'bolt',
      '11n': 'bolt',
      '13d': 'snowflake',
      '13n': 'snowflake',
      '50d': 'smog',
      '50n': 'smog',
    };
  
    return iconMap[iconCode] || 'question-circle';
  }
  