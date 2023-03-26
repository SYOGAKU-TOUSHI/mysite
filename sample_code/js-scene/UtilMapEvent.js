'use strict';

class UtilMapEvent {
	// イベント判定
	static check(gameData, userData, options) {
		// 変数の初期化
		const x = userData.x;
		const y = userData.y;
		let eventOpt;

		// 最後の判定位置なら無視
		if (options.lastX === x && options.lastY === y) { return false }

		// 最後の判定位置の記録
		options.lastX = x;
		options.lastY = y;

		// 開始直後は無視
		if (userData.moveCount < 2) { return false }

		//------------------------------------------------------------
		// 街位置を取得
		const townIndex = userData.townArr.findIndex(
			o => o.x === x && o.y === y
		);

		// 街判定
		if (townIndex !== -1) {
			// 街である
			eventOpt = {town: 1, heal: 1};		// 街、回復

			// その街の宝を既に持っているか判定
			if (! userData.item[townIndex]) {
				// その街の宝を持っていない
				userData.item[townIndex] = 1;	// 宝物獲得
				eventOpt.item = townIndex;		// 宝物獲得イベント追加
			}

			SceneEvent.start(gameData, userData, eventOpt);		// イベント開始
			UtilLevel.calc(gameData, userData);		// 能力値計算
													//（宝物獲得の可能性があるため）
			userData.hp = userData.hpMax;	// HP回復
			userData.mp = userData.mpMax;	// MP回復
			return true;	// イベントあり
		}

		//------------------------------------------------------------
		// 城判定
		if (userData.castle.x === x && userData.castle.y === y) {
			eventOpt = {battle: 1, battleType: 'last'};	// 戦闘発生、最終
			SceneEvent.start(gameData, userData, eventOpt);		// イベント開始
			return true;	// イベントあり
		}

		//------------------------------------------------------------
		// 戦闘判定用変数
		const land = userData.mapArr[y * gameData.mapW + x];	// 土地
		const enemy = gameData.enemyData[land];

		// 戦闘が発生する土地で、発生確率があるか確認
		if (enemy && enemy.rate !== undefined) {
			// 戦闘発生判定
			if (gameData.xors.random() % enemy.rate === 0) {
				eventOpt = {battle: 1, battleType: land};	// 戦闘発生、戦闘種類
				SceneEvent.start(gameData, userData, eventOpt);		// イベント開始
				return true;	// イベントあり
			}
		}

		//------------------------------------------------------------
		return false;	// イベントなし
	}
}
