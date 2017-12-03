const request = require('request');

var getWeather = (lat, lng, callBack) => {
	request({
		url: `https://api.darksky.net/forecast/e373ac66b7b46965564f9062f976e145/${lat},${lng}`,
		json: true
		}, (error, response, body) => {
			if(!error && response.statusCode === 200){
				callBack(undefined, {
					temperature: body.currently.temperature,
					apparentTemperature: body.currently.apparentTemperature
				});
			}
			else{
				callBack('Unable to fetch the weather');
			}
	});
}

module.exports = {
	getWeather
}