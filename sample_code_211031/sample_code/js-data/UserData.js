'use strict';

class UserData {
	// コンストラクター
	constructor() {
		this.level = 1;		// レベル
		this.exp   = 0;		// 経験値
		this.hp	   = 100;	// HP
		this.hpMax = 100;	// 最大HP
		this.mp	   = 100;	// MP
		this.mpMax = 100;	// 最大MP
		this.at	   = 10;	// 攻撃力
		this.df	   = 10;	// 防御力
	}

	//------------------------------------------------------------
	// 開始時点データに
	setStart(gameData) {
		this.seed = + new Date();	// 乱数固定用シード（マップ生成で使用）

		// 地図用データ
		this.mapArr  = [];	// マップ
		this.townArr = [];	// 街
		this.castle  = {};	// 城

		// アイテム（宝物配列と同サイズの0埋め配列）
		this.item = gameData.treasureArr.map(o => 0);

		// 移動用データ
		this.direction = null;	// 向き
		this.moveCount = 0;		// 移動カウンタ
		this.x = gameData.mapW / 2 | 0;		// x位置
		this.y = gameData.mapH / 2 | 0;		// y位置
		this.xDiff = 0;			// x差分
		this.yDiff = 0;			// y差分
	}
}
