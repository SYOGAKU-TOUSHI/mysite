'use strict';

class UtilUrlData {
	// 保存
	static save(userData) {
		// 複製したオブジェクトを作成
		const obj = JSON.parse(JSON.stringify(userData));

		// 不要な要素を削除
		delete obj.xDiff;
		delete obj.yDiff;
		delete obj.mapArr;
		delete obj.townArr;
		delete obj.castle;

		// 保存
		const hash = encodeURIComponent(JSON.stringify(obj));	// 文字列化してエンコード
		location.hash = hash;		// URLのハッシュとして設定
	};

	// 復帰
	static load(userData) {
		if (location.hash.length <= 1) { return }	// URLのハッシュがないなら終了

		// 復帰
		try {
			const t = decodeURIComponent(location.hash.substr(1));	// 取り出してデコード
			const q = JSON.parse(t);	// JSONとしてパース

			// データの各プロパティを復帰
			Object.keys(userData).forEach(key => {
				if (q[key] !== undefined) { userData[key] = q[key] }	// 値を反映
			});
		} catch(e) {}
	}
}
