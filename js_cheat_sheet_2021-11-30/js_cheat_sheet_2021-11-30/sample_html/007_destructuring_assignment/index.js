'use strict';

{
	console.log('\n--< array >----------------------------');
	// 配列の作成
	const arr = ['dog', 'cat', 'monkey', 'bird'];

	// 配列の要素を先頭から分割代入
	const [a, b, c] = arr;

	console.log('<1-1>', a);	// dog
	console.log('<1-2>', b);	// cat
	console.log('<1-3>', c);	// monkey
}

{
	console.log('\n--< object >----------------------------');
	// オブジェクトの作成
	const chara = {name: 'Bob', hp: 100, mp: 8, skill: 'sword'};

	// オブジェクトのプロパティから、プロパティ名の値を分割代入
	const {name, hp, mp} = chara;

	console.log('<2-1>', name);	// Bob
	console.log('<2-2>', hp);	// 100
	console.log('<2-3>', mp);	// 8
}

