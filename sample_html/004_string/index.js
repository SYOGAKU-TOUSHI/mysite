'use strict';

{
	console.log('\n--< string >----------------------------');
	// 数値
	let s1 = 'abc';      // abc
	let s2 = "\"def\"";  // "def"
	let s3 = `ABC ${s1} ${s2} DEF`;  // ABC abc "def" DEF

	console.log('<1-1>', s1);	// abc
	console.log('<1-2>', s2);	// "def"
	console.log('<1-3>', s3);	// ABC abc "def" DEF
}

{
	console.log('\n--< length >----------------------------');
	// 文字列の長さを得る
	let s = 'abcdefg';
	let n = s.length;

	console.log('<2-1>', s, n);  // abcdefg 7
}

{
	console.log('\n--< substr >----------------------------');
	// 文字列の一部を得る
	let s1 = 'abcdefg';
	let s2 = s1.substring(2, 5);

	console.log('<3-1>', s1, s2);  // abcdefg cde
}
