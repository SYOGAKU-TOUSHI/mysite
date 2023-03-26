'use strict';

{
	console.log('\n--< object >----------------------------');
	// オブジェクトの作成
	let user = {name: 'hawk', hp: 100, mp: 50, level: 1, exp: 10};

	// プロパティの読み取り
	console.log('<1-1>', user.name);   // hawk
	console.log('<1-2>', user['hp']);  // 100

	// 空のプロパティは「undefined」（未定義）になる
	console.log('<1-3>', user.skill);  // undefined

	// プロパティの変更
	user.skill = 'fire';
	console.log('<1-4>', user.skill);  // fire
}

{
	console.log('\n--< rewrite object >----------------------------');
	// 定数としてオブジェクトを作成
	const user = {name: 'hawk', hp: 100, mp: 50, level: 1, exp: 10};
	console.log('<2-1>', user['hp']);  // 100

	// 定数「user」自体に新しい値は入れられないが、
	// プロパティは書き換え可能
	user.hp = 10;
	console.log('<2-2>', user['hp']);  // 10
}

{
	console.log('\n--< rewrite array >----------------------------');
	// 定数として配列を作成
	let arr = ['a', 'b', 'c', 'd', 'e'];
	console.log('<3-1>', arr[1]);  // b

	// 定数「arr」自体に新しい値は入れられないが、
	// 要素は書き換え可能
	arr[1] = 'B';
	console.log('<3-2>', arr[1]);  // B
}

