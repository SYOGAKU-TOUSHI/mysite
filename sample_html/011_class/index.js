'use strict';

{
	console.log('\n--< class >----------------------------');
	// クラスの作成
	class Chara {
		constructor(name) {
			this.name = name;
			this.hp = 100;
			this.mp = 50;
		}
		getStatus() {
			return `${this.name} : hp ${this.hp}, mp ${this.mp}`;
		}
	}

	// クラスから new 演算子でオブジェクトを作成
	let enemy = new Chara('slime');

	console.log('<1-1>', enemy.name);			// slime
	console.log('<1-2>', enemy.getStatus());		// slime : hp 100, mp 50
}

{
	console.log('\n--< static >----------------------------');
	// クラスの作成
	// 静的プロパティや静的メソッドを作る
	class Chara {
		static nameDefalt = 'unknown';
		static hpDefalt = 10;
		static mpDefalt = 5;
		static getStatusDefault() {
			return `${this.nameDefalt} : hp ${this.hpDefalt}, mp ${this.mpDefalt}`;
		}
	}

	console.log('<2-1>', Chara.nameDefalt);			// unknown
	console.log('<2-2>', Chara.getStatusDefault());	// unknown : hp 10, mp 5
}
