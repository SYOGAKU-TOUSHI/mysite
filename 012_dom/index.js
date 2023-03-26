'use strict';

{
	// DOMの準備が終わったあとに処理を実行
	window.addEventListener('DOMContentLoaded', event => {
		console.log('\n--< DOMContentLoaded >----------------------------');
		console.log('<1-1>', 'DOMの準備が完了');
	});
}

{
	window.addEventListener('DOMContentLoaded', event => {
		console.log('\n--< querySelector >----------------------------');
		// 要素を選択
		let element = document.querySelector('#id');

		console.log('<2-1>', element);	// （要素を出力）

		// 要素を選択（存在しない場合）
		let element2 = document.querySelector('#id2');

		console.log('<2-2>', element2);	// null
	});
}

{
	window.addEventListener('DOMContentLoaded', event => {
		console.log('\n--< querySelectorAll >----------------------------');
		// 要素を全て選択
		let nodeList = document.querySelectorAll('.news');
		let elementArray = Array.from(nodeList);

		console.log('<3-1>', nodeList);		// （ノードリストを出力）
		console.log('<3-2>', elementArray);	// （要素の配列を出力）
	});
}

{
	window.addEventListener('DOMContentLoaded', event => {
		console.log('\n--< attribute >----------------------------');
		// a 要素の target の値を取得したあと書き換え
		let elementArray = Array.from(document.querySelectorAll('a'));
		elementArray.forEach(element => {
			const target = element.target;
			console.log('<4-1>', target);
			element.target = '_blank';
			console.log('<4-2>', element.target);
		});
	});
}

{
	window.addEventListener('DOMContentLoaded', event => {
		console.log('\n--< innerHTML >----------------------------');
		// a 要素内の HTML を書き換え
		let elementArray = Array.from(document.querySelectorAll('a'));
		elementArray.forEach(element => {
			console.log('<5-1>', element.innerHTML);
			element.innerHTML = 'hogehoge';
		});
	});
}

{
	window.addEventListener('DOMContentLoaded', event => {
		console.log('\n--< style >----------------------------');
		// a 要素の文字色を赤に変える
		let elementArray = Array.from(document.querySelectorAll('a'));
		elementArray.forEach(element => {
			element.style.color = 'red';
			console.log('<6-1>', element.style);
		});
	});
}

{
	window.addEventListener('DOMContentLoaded', event => {
		console.log('\n--< classList >----------------------------');
		// a 要素のクラスを書き換え
		let elementArray = Array.from(document.querySelectorAll('a'));
		elementArray.forEach(element => {
			element.classList.add('big');
			console.log('<7-1>', element.classList);
		});
	});
}

{
	window.addEventListener('DOMContentLoaded', event => {
		console.log('\n--< value >----------------------------');
		// フォームの部品の値を JavaScript! に書き換える
		let elementArray = Array.from(document.querySelectorAll('input'));
		elementArray.forEach(element => {
			console.log('<8-1>', element.value);
			element.value = 'JavaScript!';
		});
	});
}

{
	window.addEventListener('DOMContentLoaded', event => {
		console.log('\n--< addEventListener >----------------------------');
		// フォームの部品をクリックすると、その部品の値とイベントオブジェクトを出力する
		let elementArray = Array.from(document.querySelectorAll('input'));
		elementArray.forEach(element => {
			element.addEventListener('click', function(e) {
				console.log(this.value, e);
			});
		});
	});
}

{
	window.addEventListener('DOMContentLoaded', event => {
		console.log('\n--< button >----------------------------');
		// ボタンをクリックすると処理を実行する
		let button = document.querySelector('#exec');
		button.addEventListener('click', function(e) {
			let elementArray = Array.from(document.querySelectorAll('input'));
			elementArray.forEach(element => {
				element.value = '';
			});
		});
	});
}
