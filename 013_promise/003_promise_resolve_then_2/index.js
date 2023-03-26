'use strict';

{
	console.log('\n--< Promise resolve then 2 >----------------------------');
	let wait = function(time) {
		return new Promise(function(resolve, reject) {
			setTimeout(() => {
				console.log(`${time}ミリ秒`);
				resolve(`end: ${time}`);
			}, time);
		});
	}

	wait(2000)
	.then(res => {
		console.log(res);
		return wait(1500);
	})
	.then(res => {
		console.log(res);
		return wait(1000);
	})
	.then(res => {
		console.log(res);
		return wait(500);
	})
	.then(res => {
		console.log(res);
	});

	// 2000ミリ秒
	// end: 2000
	// 1500ミリ秒
	// end: 1500
	// 1000ミリ秒
	// end: 1000
	// 500ミリ秒
	// end: 500
}
