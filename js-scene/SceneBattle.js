'use strict';

class SceneBattle {
	// 変数の初期化
	static options = {
		type: null,				// 種類
		state: null,			// 進行
		enemyData: {},			// 敵値
		actionType: null,		// 行動種類
		actionLevel: null,		// 行動レベル（呪文レベル）
		selectMenu: null,		// 選択項目
		selectTime: null,		// 選択時間
		numEffectNum:  null,	// 数字効果用値
		numEffectLast: null,	// 数字値用最終時間
		enemyRect: {},			// 敵矩形
		menuWinSize: {},		// メニュー ウィンドウ サイズ
		menuArr: []				// メニュー配列
	}

	//------------------------------------------------------------
	// 開始
	static start(gameData, userData, type) {
		// 変数の初期化
		const options = this.options;	// 設定
		const w = gameData.w;	// 横幅
		const h = gameData.h;	// 高さ
		const chipSize = gameData.chipSize;		// チップ サイズ

		options.type = type;		// 種類
		options.state = 'menu';		// 進行
		options.enemyRect = {		// 敵矩形
			x: w - chipSize * 13.5,
			y: 0,
			w: chipSize * 13.5,
			h: h
		};

		// 初期化処理
		UtilBattleData.init(gameData, userData, options);		// 値初期化
		UtilBattleMenu.init(gameData, userData, options);		// メニュー初期化
		GameView.add(this.tap.bind(this, gameData, userData));		// タップの登録
		GameAnim.add(this.anim.bind(this, gameData, userData));		// アニメの登録

		// BGMの開始
		GameSound.playBGM(type === 'last' ? 'bgmBattleLast' : 'bgmBattle');
	}

	//------------------------------------------------------------
	// タップ
	static tap(gameData, userData, x, y, type) {
		// 変数の初期化
		const options = this.options;	// 設定

		if (type === 'down') {
			// メニュー タップ判定
			UtilBattleMenu.tap(gameData, userData, options, x, y);
		}
	}

	//------------------------------------------------------------
	// アニメーション
	static anim(gameData, userData, time) {
		// 変数の初期化
		const options = this.options;	// 設定
		const w = gameData.w;
		const h = gameData.h;

		// 終了時エフェクト
		if (options.state == 'end') {
			const layerId = gameData.layerIds.front;	// 描画対象
			const context = gameData.canvasArr[layerId].context;	// コンテクスト
			context.globalAlpha = 0.1;		// 半透明に
			context.fillStyle = '#000';		// 黒
			context.fillRect(0, 0, w, h);	// 塗る
			context.globalAlpha = 1;		// 透明度を戻す
			return;		// 通常描画はおこなわない
		}

		// 画面のクリア
		gameData.canvasArr[gameData.layerIds.middle].context.clearRect(0, 0, w, h);
		gameData.canvasArr[gameData.layerIds.front] .context.clearRect(0, 0, w, h);

		// 演出 - 効果が終わったら次の進行に
		if (options.state.match(/^(select|enemy)$/)) {
			// 進行が select, enemy の場合
			if (UiBattleEffect.draw(gameData, options, time)) {			// 効果
				UtilBattleProcess.next(gameData, userData, options);	// 次に進行
			}
		}

		// 描画
		UiBattleNumEffect.draw(gameData, options, time);	// 数字効果
		UiBattleBase.draw(gameData, options, time);	// 戦闘基本描画
		UtilBattleMenu.draw(gameData, options);		// メニュー描画
		UiStatus.draw(gameData, userData);			// ステータスの描画
	}
}
