'use strict';

class GameAnim {
	// アニメーション実行用関数（ブラウザ依存を吸収）
	static requestAnim(cb) {	// 実行
		return (
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			(cb => window.setTimeout(cb, 1000 / 60))
		)(cb);
	};

	//------------------------------------------------------------
	// アニメーション用変数
	static funcUpdate = null;	// 更新実行関数（アニメ更新の度に呼び出される）
	static time = {	// 時間オブジェクト
		sum:  0,		// 合計
		old:  null,		// 旧 Date
		now:  0,		// 新 Date
		diff: 0			// 差分
	};
	static flagStop = false;	// 停止フラグ

	//------------------------------------------------------------
	// アニメーションの開始
	static start() {
		this.flagStop = false;			// 停止フラグを偽に
		this.time.old = + new Date();	// 時間 旧の初期化

		// アニメーション ループ
		const anmFnc = () => {
			this.update();			// アニメ更新
			if (! this.flagStop) { this.requestAnim(anmFnc) }	// 再描画で実行
		};
		anmFnc();	// 初回実行
	};

	//------------------------------------------------------------
	// アニメーションの停止
	static stop() {
		this.flagStop = true;		// 停止フラグを真に
	};

	//------------------------------------------------------------
	// アニメーションの更新
	static update() {
		// 差分時間と経過時間を計算
		const time = this.time;
		time.now  =  + new Date();	// 時間 新の設定
		if (time.old == null || time.now - time.old >= 1000) {
			time.old = time.now;	// 1秒以上遅延があるなら、いったん差分を0にする
		}
		time.diff =  time.old == null ? 0 : time.now - time.old;	// 時間 差分
		time.sum  += time.diff;		// 時間 合計
		time.old  =  time.now;		// 時間 旧の更新

		// 更新実行関数の実行
		if (typeof this.funcUpdate === 'function') {
			this.funcUpdate(this.time);
		}
	};

	//------------------------------------------------------------
	// 更新実行関数を設定
	static add(func) {
		this.funcUpdate = func;
	}
}
