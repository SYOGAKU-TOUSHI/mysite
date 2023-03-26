'use strict';

{
	console.log('\n--< try catch >----------------------------');
	try {
		const str = '{"name": "Ken", "hp": 100}';
		const obj = JSON.parse(str);
		console.log('<1-1>', '[Success]', obj);
	} catch(e) {
		console.log('<1-2>', '[Error]', e);
	}

	try {
		const str = '{name: "Ken", hp: 100}';
		const obj = JSON.parse(str);
		console.log('<1-3>', '[Success]', obj);
	} catch(e) {
		console.log('<1-4>', '[Error]', e);
	}

	// <1-1> [Success] { name: 'Ken', hp: 100 }
	// <1-4> [Error] SyntaxError: Unexpected token n in JSON at position 1
	//     （詳細なエラー情報）
}

{
	console.log('\n--< throw >----------------------------');
	try {
		throw 'Oh!';
		console.log('<2-1>', '[Success]')
	} catch(e) {
		console.log('<2-2>', '[Error]', e);
	}

	try {
		throw new Error('happning!');
		console.log('<2-3>', '[Success]')
	} catch(e) {;
		console.log('<2-4>', '[Error]', e)
	}

	// <2-2> [Error] Oh!
	// <2-4> [Error] Error: happning!
	//     （詳細なエラー情報）
}

{
	console.log('\n--< nest >----------------------------');
	const func1 = function() {
		console.log('<3-1>', 'func1: start');

		const func2 = function() {
			console.log('<3-2>', 'func2: start');

			throw new Error('happning!');

			console.log('<3-3>', 'func2: end');
		};
		func2();

		console.log('<3-4>', 'func1: end');
	};

	try {
		console.log('<3-5>', 'try')
		func1();
		console.log('<3-6>', '[Success]')
	} catch(e) {
		console.log('<3-7>', '[Error]', e)
	}

	// <3-5> try
	// <3-1> func1: start
	// <3-2> func2: start
	// <3-7> [Error] Error: happning!
	//     （詳細なエラー情報）
}
