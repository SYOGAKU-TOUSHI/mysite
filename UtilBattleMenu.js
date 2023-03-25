'use strict';

class UtilBattleMenu {
	// メニュー初期化
	static init(gameData, userData, options) {
		// 有効アイテム名前配列の取得
		options.menuArr = UtilMisc.getMyItemNames(gameData, userData, true, '> ');
		options.menuArr.unshift('> Sword');		// 先頭に Sword を追加
	}

	//------------------------------------------------------------
	// メニュー描画
	static draw(gameData, options) {
		// 変数の初期化
		const h = gameData.h;					// 高さ
		const chipSize = gameData.chipSize;		// チップ サイズ

		// メニュー用サイズと位置の初期化
		const winSize = UiWin.getWinSize(options.menuArr.length, 13); // ウィン サイズ
		winSize.x = chipSize / 2;					// X位置
		winSize.y = h - winSize.h - chipSize / 2;	// Y位置
		options.menuWinSize = winSize;				// 格納

		// ウィンドウ描画
		const layerId = gameData.layerIds.middle;		// 描画対象
		const context = gameData.canvasArr[layerId].context;	// コンテクスト
		UiWin.drawWin(context, winSize.x, winSize.y, winSize.w, winSize.h);
													// ウィンドウ描画

		// 進行が sel なら選択位置を描画
		if (options.state === 'select') {
			// 選択位置描画
			const rect = UiWin.getLineRect(winSize.x, winSize.y,	// 行矩形
					winSize, options.selectMenu);
			context.fillStyle = '#888';							// 灰色
			context.fillRect(rect.x, rect.y, rect.w, rect.h);	// 選択描画
		}

		// メニュー描画
		options.menuArr.forEach(
			(t, i) => UiWin.drawWinText(context, winSize.x, winSize.y, t, i)
													// 文字描画
		);
	}

	//------------------------------------------------------------
	// メニュー タップ判定
	static tap(gameData, userData, options, x, y) {
		if (options.state === 'menu') {
			// メニュー時

			// メニュー選択判定
			let select = -1;		// 選択項目
			const winSize = options.menuWinSize;
			winSize.lineRect.forEach((o, i) => {
				// 各行の矩形内をタップしているか判定
				const rect = UiWin.getLineRect(winSize.x, winSize.y, winSize, i);
				if (GameUtil.inRectObj(x, y, rect)) { select = i }	// 選択項目
			});

			// 選択しているか判定
			if (select != -1) {
				// メニューを選択している

				// 設定の更新
				options.state = 'select';		// 進行を「選択」に
				options.selectMenu = select;	// 選択項目

				// メニューの取り出し
				const match = options.menuArr[select]
							.replace(/> |.*:/g, '')		// 項目取り出し
							.match(/([A-z]+)(\d*)/);	// 英字と数を分離
				options.actionType  = match[1];			// 選択行動
				options.actionLevel = match[2] * 1;		// 呪文レベル

				options.selectTime = GameAnim.time.sum;		// 選択時間
				UtilBattleData.calc(gameData, userData, options, 'user');	// 自計算

				// 効果音を鳴らす
				GameSound.play(options.actionType === 'Heal' ? 'seHeal' : 'seAt');
			}
		}
	}
}
