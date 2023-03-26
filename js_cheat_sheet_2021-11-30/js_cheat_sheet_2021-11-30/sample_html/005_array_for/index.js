'use strict';

{
	console.log('\n--< array >----------------------------');
	// 配列の初期化
	let a1 = new Array(2);   // [empty × 2]
	let a2 = ['a', 'b'];     // ['a', 'b']

	console.log('<1-1>', a1);  // [empty × 2]
	console.log('<1-2>', a2);  // ['a', 'b']

	// 配列の要素数
	console.log('<1-3>', a2.length);  // 2

	// ネストした配列
	let a3 = ['a', ['b', 'c']];  // ['a', ['b', 'c']]

	console.log('<1-4>', a2.length);  // ['a', ['b', 'c']]
}

{
	console.log('\n--< index >----------------------------');
	// 添え字を用いて値の変更や読み取り
	let a4 = [];
	a4[0] = 'abc';	// 先頭の添え字は「0」
	a4[1] = 'def';
	a4[4] = 'ghi';

	// 各要素を出力
	// 中身がない要素は「undefined」（未定義）になる
	console.log('<2-1>', a4);      // ['abc', 'def', empty × 2, 'ghi']
	console.log('<2-2>', a4[-1]);  // undefined
	console.log('<2-3>', a4[0]);   // abc
	console.log('<2-4>', a4[1]);   // def
	console.log('<2-5>', a4[2]);   // undefined
	console.log('<2-6>', a4[3]);   // undefined
	console.log('<2-7>', a4[4]);   // ghi
}

{
	console.log('\n--< for >----------------------------');
	// 配列の要素数だけ処理をおこない、各要素を出力
	let arr = ['a', 'b', 'c'];
	for (let i = 0; i < arr.length; i ++) {
	    console.log('<3-1>', i, arr[i]);
	}

	// 0 'a'
	// 1 'b'
	// 2 'c'
}

{
	console.log('\n--< array method >----------------------------');
	// 配列のメソッド（関数）
	let a = ['a', 'b', 'c', 'd', 'e'];
	a.push('f');	// 末尾に追加
	console.log('<4-1>', a);  // ['a', 'b', 'c', 'd', 'e', 'f']
}

{
	console.log('\n--< forEach >----------------------------');
	// 配列の反復メソッド（繰り返し処理用の関数）
	let arr = ['a', 'b', 'c'];
	arr.forEach((x, i) => {
		console.log('<5-1>', i, arr[i]);
	});

	// 0 'a'
	// 1 'b'
	// 2 'c'
}
