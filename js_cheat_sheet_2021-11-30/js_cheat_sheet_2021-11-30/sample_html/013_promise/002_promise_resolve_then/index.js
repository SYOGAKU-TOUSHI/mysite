'use strict';

{
	console.log('\n--< Promise resolve then >----------------------------');
	// Promise を利用した非同期処理
	new Promise(function(resolve, reject) {
		setTimeout(() => {
			console.log('1つめの処理');
			resolve();
		}, 1000);
	})
	.then(function() {
		return new Promise(function(resolve, reject) {
			setTimeout(() => {
				console.log('2つめの処理');
				resolve();
			}, 1000);
		});
	})
	.then(function() {
		return new Promise(function(resolve, reject) {
			setTimeout(() => {
				console.log('3つめの処理');
				resolve();
			}, 1000);
		});
	});

	// 1つめの処理
	// 2つめの処理
	// 3つめの処理
}
