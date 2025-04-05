
const apiKey = '0a7d947a4641774bc9562c026c366437';
const city = 'Lagos';

// Weather emoji map
const weatherEmoji = {
    'clear sky': '☀️',
    'few clouds': '🌤️',
    'scattered clouds': '☁️',
    'broken clouds': '☁️',
    'shower rain': '🌧️',
    'rain': '🌦️',
    'thunderstorm': '⛈️',
    'snow': '❄️',
    'mist': '🌫️'
};

async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].description.toLowerCase();
        const emoji = weatherEmoji[condition] || '🌡️';

        const display = `${emoji} ${temp}°C - ${condition}`;
        document.getElementById('weather-info').textContent = display;
    } catch (error) {
        document.getElementById('weather-info').textContent = 'Weather unavailable.';
        console.error('Weather fetch error:', error);
    }
}

// Call the function to load weather
getWeather();
