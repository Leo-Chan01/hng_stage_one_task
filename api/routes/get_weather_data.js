const axios = require('axios').default;

async function getWeatherData(requestorLocation) {
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get('http://api.weatherapi.com/v1/current.json?key='+ weatherApiKey+'&q=' + requestorLocation);
    return response.data.current.temp_c || 'Unknown Weather';
}

module.exports = getWeatherData;