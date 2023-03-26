'use strict';

class SceneEvent {
	// 変数の初期化
	static options = {};

	//------------------------------------------------------------
	// 開始
	static start(gameData, userData, options) {
		this.options = options;
		GameView.add(this.tap.bind(this, gameData, userData));	// タップの登録
		GameAnim.add(this.anim.bind(this, gameData));			// アニメの登録

		if (options.town)    { GameSound.play('seTown') }		// 街到着
		if (options.win)     { GameSound.playBGM('bgmWin') }	// 戦闘勝利
		if (options.lose)    { GameSound.playBGM('bgmLose') }	// 戦闘敗北
		if (options.winLast) { GameSound.playBGM('bgmFin') }	// 最終勝利
	}

	//------------------------------------------------------------
	// タップ
	static tap(gameData, userData, x, y, type) {
		// 変数の初期化
		const options = this.options;	// 設定

		if (type === 'down') {
			// 変数の初期化
			const w = gameData.w;		// 横幅
			const h = gameData.h;		// 高さ

			// 描画対象の初期化
			const layerId = gameData.layerIds.front;	// 描画対象
			const context = gameData.canvasArr[layerId].context;	// コンテクスト
			context.clearRect(0, 0, w, h);				// 描画領域をクリア

			// 処理の分岐
			if (options.battle) {
				SceneBattle.start(gameData, userData, options.battleType);	// 戦闘開始
			} else if (options.win || options.lose) {
				SceneMap.start(gameData, userData);		// マップ
			} else if (options.winLast) {
				SceneTitle.start(gameData, userData);	// タイトル
			} else {
				SceneMap.start(gameData, userData);		// マップ開始
			}
		}
	}

	//------------------------------------------------------------
	// アニメーション
	static anim(gameData) {
		// 変数の初期化
		const options = this.options;	// 設定
		const w = gameData.w;	// 横幅
		const h = gameData.h;	// 高さ
		const chipSize = gameData.chipSize;	// チップ サイズ

		// 描画の初期化
		const layerId = gameData.layerIds.front;	// 描画対象
		const context = gameData.canvasArr[layerId].context;	// コンテクスト
		context.clearRect(0, 0, w, h);				// 描画領域をクリア

		// 背景描画
		context.fillStyle = '#000';		// 黒背景
		let backY = 0;					// 背景Y位置
		if (options.town || options.battle) {		// 街到着と戦闘開始
			backY = h * 0.1 | 0			// 背景Y位置の変更
		}
		context.fillRect(0, backY, w, h - backY * 2);	// 塗り潰し

		// 描画用関数（ずらしつつ最大3行に描画する）
		let y = h * 0.3 | 0		// Y位置
		const draw = function(txt, fontW) {
			UiText.drawCenter(context, txt, w / 2 | 0, y, fontW, 'white');
									// 文字列中央描画
			y += h * 0.2 | 0;		// Y位置移動
		};

		//------------------------------------------------------------
		// 文字の描画（イベントの種類ごとに変える）
		if (options.town) {
			// 街到達
			draw('Town', 20);
			if (options.heal) {
				draw('Get healed up your HP!', 10);
			}
			if (options.item !== undefined) {
				draw(`Get a "${gameData.treasureArr[options.item]}"!`, 10);
			}
		}
		if (options.battle) {
			// 戦闘開始
			draw('Battle!!!', 20);
			draw(gameData.enemyData[options.battleType].name + ' appeared.', 15);
			if (options.battleType === 'last') {
				draw('This is a last battle!', 10);
			}
		}
		if (options.win) {
			// 勝利
			y = h * 0.4 | 0;
			draw('You Win!', 30);
			if (options.levelUp) {
				draw('Level Up!', 15);
			}
		}
		if (options.lose) {
			// 敗北
			y = h * 0.4 | 0;
			draw('You Lose!', 30);
			if (options.levelUp) {
				draw('Level Up!', 15);
			}
		}
		if (options.winLast) {
			// 最終戦闘勝利
			draw('You won the last battle!', 10);
			draw('You saved the kingdom!', 10);

			// キャラ描画
			const charaImage = GameImage.images['chara'];	// キャラ画像
			const charaSize = chipSize * 4;					// キャラ サイズ

			UiChip.draw(	// チップ描画
				context, charaImage, chipSize, charaSize,		// 基本情報
				0, 0, (w - charaSize) / 2, y - chipSize * 1.5	// 座標情報
			);
		}
	};
}
