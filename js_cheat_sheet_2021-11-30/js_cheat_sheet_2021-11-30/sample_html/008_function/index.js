'use strict';

{
	console.log('\n--< function >----------------------------');
	// 関数の作成
	function func1 (arg1, arg2) {
		// 処理
		return `result: ${arg1}, ${arg2}`;
	}

	// 関数の呼び出し
	console.log('<1-1>', func1(111, 222));	// result: 111, 222

	// 関数の作成
	let func2 = function (arg1, arg2) {
		// 処理
		return `result: ${arg1}, ${arg2}`;
	};

	// 関数の呼び出し
	console.log('<1-2>', func2(333, 444));	// result: 333, 444
}

{
	console.log('\n--< arrow function >----------------------------');
	// アロー関数 基本
	let arrow1 = (arg1, arg2) => {
		return `result: ${arg1}, ${arg2}`;
	};

	console.log('<2-1>', arrow1(111, 222));

	// アロー関数 簡略
	// 処理がreturn文1行なら、波括弧とreturnを省ける
	let arrow2 = (arg1, arg2) => `result: ${arg1}, ${arg2}`;

	console.log('<2-2>', arrow2(333, 444));

	// アロー関数 簡略
	// 引数が1つなら丸括弧を省ける
	let arrow3 = arg1 => {  
		return `result: ${arg1}`;
	};

	console.log('<2-3>', arrow3(555));

	// アロー関数 簡略
	// 引数が0なら丸括弧のみを書く
	let arrow4 = () => {
		return `result`;
	};

	console.log('<2-4>', arrow4());

	// アロー関数 簡略
	// このように短く書く処理もある
	let arrow5 = arg1 => `result: ${arg1}`;

	console.log('<2-5>', arrow5(666));
}

{
	console.log('\n--< forEach >----------------------------');
	// 配列を初期化
	let arr = [123, 456, 489];

	// 配列の反復メソッドを利用
	console.log('<3-1>', arr.map((x, i) => `${i}: ${x * 10}`));
						// ['0: 1230', '1: 4560', '2: 4890']
}

{
	console.log('\n--< this >----------------------------');
	// 親に当たるオブジェクトが this になる。
	let user1 = {
		name: 'hawk',
		getName1: function() {
			return this.name
		},
		getName2() {
			return this.name
		}
	};

	console.log('<4-1>', user1.getName1());	// hawk
	console.log('<4-2>', user1.getName2());	// hawk
}

{
	console.log('\n--< this 2 >----------------------------');
	// 「user1」オブジェクト
	let user1 = {
		name: 'hawk',
		getName: function() {
			return this.name;
		}
	};

	// 「user2」オブジェクト
	let user2 = {
		name: 'snake'
	};

	// メソッドの付け替え
	// メソッドを付け替えると、その後の親に当たるオブジェクトが this になる
	user2.getName = user1.getName;

	console.log('<5-1>', user1.getName());	// hawk
	console.log('<5-2>', user2.getName());	// snake
}

{
	console.log('\n--< this 3 >----------------------------');
	// 関数から new 演算子でオブジェクトを作る
	function Enemy() {
		this.name = 'dark king';
		this.getName = function() {
			return this.name;
		}
	}

	// 関数「Enemy」を雛形にして、インスタンス（実体のオブジェクト）を作る
	let enemy = new Enemy();

	console.log('<6-1>', enemy.getName());	// dark king
}
