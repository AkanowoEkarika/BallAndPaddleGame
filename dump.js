const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://opentripmap-places-v1.p.rapidapi.com/%7Blang%7D/places/geoname',
  params: {name: 'London'},
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}