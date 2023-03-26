'use strict';

{
	console.log('\n--< undefined, null >----------------------------');
	console.log('<1-1>', undefined);			// undefined
	console.log('<1-2>', null);					// null
	console.log('-----');
	console.log('<1-3>', undefined == null);	// true
	console.log('-----');
	console.log('<1-4>', undefined === null);	// false
}

{
	console.log("\n--< '', 0, false >----------------------------");
	console.log('<2-1>', '');			// 
	console.log('<2-2>', 0);			// 0
	console.log('<2-3>', false);		// false
	console.log('-----');
	console.log('<2-4>', '' == 0);		// true
	console.log('<2-5>', 0 == false);	// true
	console.log('<2-6>', '' == false);	// true
	console.log('-----');
	console.log('<2-7>', '' === 0);		// false
	console.log('<2-8>', 0 === false);	// false
	console.log('<2-9>', '' === false);	// false
}

{
	console.log('\n--< if >----------------------------');
	// if 文用の関数
	const func = function(arg) {
		if (arg <= 1) {
			console.log('<3-1>', arg, 'は1以下');
		} else if (arg <= 5) {
			console.log('<3-2>', arg, 'は1より大きく、5以下');
		} else {
			console.log('<3-2>', arg, 'は5より大きい');
		}
	}

	// 0から9まで処理を実行
	for (let i = 0; i < 10; i ++) {
		func(i);
	}

	// <3-1> 0 値は1以下
	// <3-1> 1 値は1以下
	// <3-2> 2 値は1より大きく、5以下
	// <3-2> 3 値は1より大きく、5以下
	// <3-2> 4 値は1より大きく、5以下
	// <3-2> 5 値は1より大きく、5以下
	// <3-2> 6 値は5より大きい下
	// <3-2> 7 値は5より大きい下
	// <3-2> 8 値は5より大きい下
	// <3-2> 9 値は5より大きい下
}

{
	console.log('\n--< if 2 >----------------------------');
	if (false)     {console.log('真')} else {console.log('偽')}		// 偽
	if (undefined) {console.log('真')} else {console.log('偽')}		// 偽
	if (null)      {console.log('真')} else {console.log('偽')}		// 偽
	if ('')        {console.log('真')} else {console.log('偽')}		// 偽
	if (0)         {console.log('真')} else {console.log('偽')}		// 偽
}
