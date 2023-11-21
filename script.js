// creating Dom and Variables
document.addEventListener('DOMContentLoaded', function () {
    var apiKey = 'a4a04040b26ae7120449f277bffe523d';
    var searchForm = document.getElementById('search-form');
    var searchInput = document.getElementById('search-input');
    var todaySection = document.getElementById('today');
    var forecastSection = document.getElementById('forecast');
    var historyList = document.getElementById('history');
  
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var city = searchInput.value.trim();
  
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