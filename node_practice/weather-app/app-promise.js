const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a:{
			default: '106台灣台北市大安區延吉街241巷1-7號',
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.argv;

const encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
	.then((res) => {
		if(res.data.status === 'ZERO_RESULTS')
			throw new Error('Unable to find that address.');

		console.log(res.data.results[0].formatted_address);
		
		var lat = res.data.results[0].geometry.location.lat;
		var lng = res.data.results[0].geometry.location.lng;
		var weatherUrl = `https://api.darksky.net/forecast/e373ac66b7b46965564f9062f976e145/${lat},${lng}`;
		return axios.get(weatherUrl);
	})
	.then((response)=>{
		var temperature = response.data.currently.temperature;
		var apparentTemperature = response.data.currently.apparentTemperature;
		console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
	})
	.catch((err) => {
			if(err.code === 'ENOTFOUND')
				console.log('Unable to connect to API servers.');
			else{
				console.log(err.message);	
			}
	});