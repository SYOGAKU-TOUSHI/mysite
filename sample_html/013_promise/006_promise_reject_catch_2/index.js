'use strict';

{
	console.log('\n--< Promise reject catch 2 >----------------------------');
	// catch の使用
	// 最初の reject で一気に catch まで飛ぶ
	new Promise(function(resolve, reject) {
		console.log('1つめの処理');
		setTimeout(() => {
			reject();
		}, 1000);
	})
	.then(function() {
		console.log('2つめの処理');
		return new Promise(function(resolve, reject) {
			setTimeout(() => {
				resolve();
			}, 1000);
		});
	})
	.then(function() {
		console.log('3つめの処理');
		return new Promise(function(resolve, reject) {
			setTimeout(() => {
				resolve();
			}, 1000);
		});
	})
	.catch(function() {
		console.log('catchした');
	});

	// 1つめの処理
	// catchした
}
