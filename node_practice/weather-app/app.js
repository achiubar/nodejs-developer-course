const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
	.options({
		a:{
			demand: true,
			alias: 'address',
			describe: "Address to fetch weather for",
			string: true
		}
	})
	.help()
	.argv;


geocode.geocodeAddress(argv.address, (errorMessage, results) => {
	if(errorMessage)
		console.log(errorMessage);
	else{
		console.log(results.address);
		weather.getWeather(results.latitude, results.longitute, 
			(errorMsg, weatherResults)=>{
			if(errorMsg)
				console.log(errorMsg);
			else
				console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
			}
		);
	}
});

