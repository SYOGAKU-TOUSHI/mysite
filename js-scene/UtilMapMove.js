'use strict';

class UtilMapMove {
	// 移動
	static move(gameData, userData, options, time) {
		if (time.sum > options.lastMove + options.unitTime) {
			// 移動終了
			if (UtilMapEvent.check(gameData, userData, options)) {		// イベント判定
				this.moveMiddle(userData, options, time);	// 移動中の処理を一度実行
				options.keepDown = false;					// 押下維持解除
				return;
			}

			// 押しっぱなしか否かで処理を変える
			if (options.keepDown) {
				// 押下維持の場合
				options.lastMove = time.sum;					// 最終時間の更新
				this.moveStart(gameData, userData, options);	// 移動開始
				this.moveMiddle(userData, options, time);		// 移動中
			} else {
				// 押下維持でない場合
				userData.direction = null;		// キャラの移動方向をリセット
				this.moveMiddle(userData, options, time);	// 移動中処理
			}
		} else {
			// 移動中
			this.moveMiddle(userData, options, time);		// 移動中処理
		}
	}

	//------------------------------------------------------------
	// 移動開始
	static moveStart(gameData, userData, options) {
		// 方向から移動先を計算
		let x = userData.x + {U:  0, D: 0, R: 1, L: -1}[options.direction];	// 移動先X
		let y = userData.y + {U: -1, D: 1, R: 0, L:  0}[options.direction];	// 移動先Y
		x = (x + gameData.mapW) % gameData.mapW;	// マップのループ
		y = (y + gameData.mapH) % gameData.mapH;	// マップのループ

		// 移動の可否
		const land = userData.mapArr[y * gameData.mapW + x];		// 土地

		if (land == gameData.landIds.water) {
			// 水のマスは侵入不可
			userData.direction = null;
			return;
		}

		// 移動の反映
		userData.x = x;	// X
		userData.y = y;	// Y
		userData.direction = options.direction;	// 方向
		userData.moveCount ++;		// 移動カウントを更新

		// 保存
		UtilUrlData.save(userData);
	}

	//------------------------------------------------------------
	// 移動中処理　経過時間から位置移動アニメーションを生成
	static moveMiddle(userData, options, time) {
		// 単位時間あたりの移動比率を0～1.0で計算
		let rate = (time.sum - options.lastMove) / options.unitTime;
		rate = GameUtil.minMax(0, rate, 1);

		// 差分を計算
		if (userData.direction === null) {userData.xDiff = userData.yDiff = 0}
		if (userData.direction === 'U')  {userData.yDiff = -(1 - rate)}
		if (userData.direction === 'D')  {userData.yDiff =  (1 - rate)}
		if (userData.direction === 'L')  {userData.xDiff = -(1 - rate)}
		if (userData.direction === 'R')  {userData.xDiff =  (1 - rate)}
	}
}
