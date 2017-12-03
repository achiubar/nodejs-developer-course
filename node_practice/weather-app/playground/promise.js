var asyncAdd = (a, b) => {
	return new Promise((resolve, reject) =>  {
		setTimeout(() => {
			if(typeof a === 'number' && typeof b === 'number'){
				resolve(a+b);
			}
			reject('Arguments have to be numbers');
		}, 1500);
	});
};

asyncAdd(5,'7').then((res) => {
	console.log('Result: ', res);
	return asyncAdd(res, 33);
}).then((res) => {
	console.log('Should be 45', res)
}).catch((errorMsg) => {
	console.log(errorMsg);
});

// var somePromise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		//resolve('Hey. It worked!');
// 		reject('unable to fullfill promise');
// 	}, 2500);
// });

// somePromise.then((msg) => {
// 	console.log('Sucess:', msg);
// }, (errorMsg) => {
// 	console.log('Error:', errorMsg);
// });