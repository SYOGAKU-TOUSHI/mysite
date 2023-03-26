'use strict';

{
	console.log('\n--< Promise reject catch >----------------------------');
	// then の2つめの関数を設置
	new Promise(function(resolve, reject) {
		setTimeout(() => {
			console.log('1つめの処理');
			reject();
		}, 1000);
	})
	.then(function() {
		return new Promise(function(resolve, reject) {
			console.log('resolveである');
			setTimeout(() => {
				resolve();
			}, 1000);
		});
	}, function() {
		return new Promise(function(resolve, reject) {
			console.log('rejectである');
			setTimeout(() => {
				resolve();
			}, 1000);
		});
	});

	// 1つめの処理
	// rejectである
}
