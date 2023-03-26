'use strict';

{
	console.log('\n--< nest >----------------------------');
	// ネストが深い非同期処理
	setTimeout(() => {
		console.log('1つめの処理');
		setTimeout(() => {
			console.log('2つめの処理');
			setTimeout(() => {
				console.log('3つめの処理');
			}, 1000);
		}, 1000);
	}, 1000);

	// 1つめの処理
	// 2つめの処理
	// 3つめの処理
}
