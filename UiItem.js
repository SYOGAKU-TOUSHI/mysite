'use strict';

class UiItem {
	// アイテムの描画
	static draw(gameData, userData) {
		// アイテムリストの作成
		const arr = UtilMisc.getMyItemNames(gameData, userData, false, '  ');
											// 有効アイテム取得
		if (arr.length === 0) { return }	// アイテムがないなら終了
		arr.unshift('Item:');				// 先頭に文字列を追加

		// 変数の初期化
		const layerId = gameData.layerIds.middle;				// 描画対象
		const context = gameData.canvasArr[layerId].context;	// コンテキスト

		const charW = 5;		// 文字幅
		const lineH = 10;		// 行の高さ

		const chipSize = gameData.chipSize;		// チップ サイズ
		const x = chipSize / 2 | 0;										// X位置
		const y = gameData.h - (chipSize / 8 | 0) - arr.length * lineH;	// Y位置

		// アイテムの描画　1行ずつ内容を描画
		arr.forEach(
			(t, i) => UiText.drawFrame(context, t, x, y + i * lineH, charW, 'white')
		);
	}
}
