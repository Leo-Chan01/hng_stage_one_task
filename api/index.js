const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const getUserLocation = require('./routes/find_location');
const getWeatherData = require('./routes/get_weather_data');
const getIpAddress = require('./routes/get_ip_address');

app.use(cors({ origin: true }));
app.set('trust proxy', true)

app.get('/api/hello', async (req, res) => {
    console.log('In api hell0');
    var visitorName = req.query.visitor_name || 'Visitor';

    if (visitorName.startsWith('"') && visitorName.endsWith('"')
        || visitorName.startsWith("'") && visitorName.endsWith("'")) {
        visitorName = visitorName.slice(1, -1);
    }

    //THIS SEEMED NOT TO RETURN THE RIGHT IP FOR ME🤔
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    //Alternative
    const ipAddress = req.ip;

    //SEE IT HERE
    console.log("Client IP is " + ipAddress + " from request it is" + req.headers['x-forwarded-for']);

    try {
        const location = await getUserLocation(ipAddress);
        const temperature = await getWeatherData(location);

        res.json({
            client_ip: ipAddress,
            location: location,
            greeting: 'Hello, ' + visitorName + '!, the temperature is ' + temperature + 'degrees Celcius in ' + location
        });

    } catch (error) {
        res.status(500).send('There was an error getting this resource. ERROR => ' + error);
    }
});

app.use((req, res) => {
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