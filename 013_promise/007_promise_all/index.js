'use strict';

{
	console.log('\n--< Promise reject catch 2 >----------------------------');
	let wait = function(time) {
		return new Promise(function(resolve, reject) {
			setTimeout(() => {
				console.log(`${time}ミリ秒`);
				resolve(`end: ${time}`);
			}, time);
		});
	}

	// Promise オブジェクトの配列を作る
	let arr = [];
	arr.push(wait(2000));
	arr.push(wait(1500));
	arr.push(wait(1000));
	arr.push(wait(500));

	// 全て解決するまで待つ
	Promise.all(arr)
	.then(res => {
		console.log('終了', res);
	});

	// 500ミリ秒
	// 1000ミリ秒
	// 1500ミリ秒
	// 2000ミリ秒
	// 終了 (4) ['end: 2000', 'end: 1500', 'end: 1000', 'end: 500']
}
