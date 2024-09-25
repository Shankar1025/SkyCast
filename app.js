const apiKey = 'dd3b236bbd0300d81b11418f111acf27';

const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('searchBtn');
const weatherInfoDiv = document.querySelector('.weather-info');
const cityName = document.getElementById('city-name');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert('City not found');
        }
    } catch (error) {
        alert('Error fetching weather data');
    }
}

function displayWeather(data) {
    cityName.innerText = `${data.name}, ${data.sys.country}`;
    temp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    description.innerText = capitalizeFirstLetter(data.weather[0].description);

    const weatherId = data.weather[0].id;
    if (weatherId >= 200 && weatherId <= 232) {
        weatherIcon.className = 'fas fa-bolt icon';
    } else if (weatherId >= 300 && weatherId <= 321) {
        weatherIcon.className = 'fas fa-cloud-rain icon';
    } else if (weatherId >= 500 && weatherId <= 531) {
        weatherIcon.className = 'fas fa-cloud-showers-heavy icon';
    } else if (weatherId >= 600 && weatherId <= 622) {
        weatherIcon.className = 'fas fa-snowflake icon';
    } else if (weatherId >= 701 && weatherId <= 781) {
        weatherIcon.className = 'fas fa-smog icon';
    } else if (weatherId === 800) {
        weatherIcon.className = 'fas fa-sun icon';
    } else if (weatherId >= 801 && weatherId <= 804) {
        weatherIcon.className = 'fas fa-cloud icon';
    }

    weatherInfoDiv.style.display = 'block';
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
