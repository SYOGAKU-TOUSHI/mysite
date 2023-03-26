'use strict';

class UiStatus {
	// ステータスの描画
	static draw(gameData, userData) {
		// ステータス文字列
		const func = (p, n) => `  ${p}`.substr(-n);	// 桁数揃え関数
		const level = func(userData.level, 2);		// レベル
		const exp   = func(userData.exp,   3);		// 経験値
		const hp    = func(userData.hp,    3);		// HP
		const mp    = func(userData.mp,    3);		// MP
		const hpMax = userData.hpMax;				// HP最大
		const mpMax = userData.mpMax;				// MP最大
		const at    = func(userData.at,    3);		// 攻撃力
		const df    = func(userData.df,    3);		// 防御力

		const text = [		// 描画用文字列配列
			`Lv ${level} Exp ${exp}`,
			`HP ${hp} / ${hpMax}`,
			`MP ${mp} / ${mpMax}`,
			`AT ${at} DF ${df}`
		];

		// 変数の初期化
		const layerId = gameData.layerIds.middle;	// 描画対象
		const context = gameData.canvasArr[layerId].context;	// コンテキスト
		const x = gameData.chipSize / 2 | 0;	// X位置
		const y = gameData.chipSize / 2 | 0;	// Y位置
		const winSize = UiWin.getWinSize(text.length, text[0].length);	// ウィン サイズ

		// 描画
		UiWin.drawWin(context, x, y, winSize.w, winSize.h);		// ウィンドウ描画
		text.forEach((t, i) => UiWin.drawWinText(context, x, y, t, i));	// 文字描画
	}
}
