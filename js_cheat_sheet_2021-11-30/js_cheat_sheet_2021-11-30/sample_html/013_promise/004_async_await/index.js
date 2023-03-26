'use strict';

{
	console.log('\n--< async await >----------------------------');
	let wait = function(time) {
		return new Promise(function(resolve, reject) {
			setTimeout(() => {
				console.log(`${time}ミリ秒`);
				resolve(`end: ${time}`);
			}, time);
		});
	};

	(async function() {
		await wait(2000);
		await wait(1500);
		await wait(1000);
		await wait(500);
	})();

	// 2000ミリ秒
	// 1500ミリ秒
	// 1000ミリ秒
	// 500ミリ秒
}
