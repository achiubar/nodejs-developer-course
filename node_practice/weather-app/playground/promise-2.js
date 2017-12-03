var request = require('request');

var geocodeAddress = (address) => {
	return new Promise((res, rej) => {
		const encodedAddress = encodeURIComponent(address);

		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
			json: true
		}, (error, response, body) => {
			
				if(error)
					rej('unable to connect to google servers.');
				else if(body.status === 'ZERO_RESULTS')
					rej('unable to find that address.');
				else if(body.status === 'OK')
					res({
						address: body.results[0].formatted_address,
						latitude: body.results[0].geometry.location.lat,
						longitute: body.results[0].geometry.location.lng
					});
			
		});
	});
};

var getWeather = (lat, lng) => {
	return new Promise((res, rej) => {
		request({
			url: `https://api.darksky.net/forecast/e373ac66b7b46965564f9062f976e145/${lat},${lng}`,
			json: true
			}, (error, response, body) => {
				if(!error && response.statusCode === 200){
					res({
						temperature: body.currently.temperature,
						apparentTemperature: body.currently.apparentTemperature
					});
				}
				else{
					rej('Unable to fetch the weather');
				}
		});
	});
};

geocodeAddress('19146')
	.then((location) => {
		console.log(JSON.stringify(location, undefined, 2));

		return getWeather(location.latitude, location.longitute);
	})
	.then((temperatureInfo) => {
		console.log(JSON.stringify(temperatureInfo, undefined, 2));
	})
	.catch((errMsg) => {
		console.log(errMsg);
	});