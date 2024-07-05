const axios = require('axios').default;

async function getUserLocation(currentRequestorIP) {
    console.log("The ip of the the requestor is " + currentRequestorIP);
    const response = await axios.get('https://ipapi.co/'+currentRequestorIP+'/json/');
    return response.data.city || 'Unknown Location';
}

module.exports = getUserLocation;