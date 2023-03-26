'use strict';

{
	console.log('\n--< number >----------------------------');
	// 数値
	let n1 = 1 + 2;      // n1は 3
	let n2 = 0.1 + 0.2;  // n2は 0.30000000000000004

	console.log('<1-1>', n1);	// 3
	console.log('<1-2>', n2);	// 0.30000000000000004
}

{
	console.log('\n--< integer >----------------------------');
	// 整数化
	let n1 = Math.trunc(12.34);  // 12
	let n2 = 12.34 | 0;  // 12

	console.log('<2-1>', n1);	// 12
	console.log('<2-2>', n2);	// 12
}
