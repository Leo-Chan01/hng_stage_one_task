const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const getUserLocation = require('./routes/find_location');
const getWeatherData = require('./routes/get_weather_data');

app.use(cors({ origin: true }));

// app.get('*', (req, res) => {
//     res.status(404).send('Resource not found');
//     console.log("Illgal resource");
// });

app.get('/api/hello', async (req, res) => {
    console.log('In api hell0');
    const visitorName = req.query.vistor_name || 'Visitor';
    const clientIp = req.header['x-forwarded-for'] || req.socket.remoteAddress;

    try {
        const location = await getUserLocation(clientIp);
        const temperature = await getWeatherData(location);
        
        res.json({
            client_ip: clientIp,
            location: location,
            greeting: 'Hello, ' + visitorName + '!, the temperature is ' + temperature + 'degrees Celcius in ' + location
        });
    } catch (error) {
        res.status(500).send('There was an error getting this resource. ERROR => ' +error);
    }
});

app.use((req, res)=>{
    res.status(404).json({
        error: 'Endpoint not found',
        message: "The Endpoint you requested doesn't exist. Contact the dev if you're not the owner"
    });
});

let PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log("app listening in http://localhost:" + PORT);
});

module.exports = app;