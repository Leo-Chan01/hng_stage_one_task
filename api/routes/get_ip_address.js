const axios = require('axios').default;

async function getIpAddress() {
    const response = await axios.get('https://api.myip.com');
    return response.data.ip;
}

module.exports = getIpAddress;