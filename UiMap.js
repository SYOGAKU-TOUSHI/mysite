'use strict';

class UiMap {
	// マップと自キャラの描画
	static draw(gameData, userData, time) {
		// 変数の初期化と画面のクリア
		const w = gameData.w;			// 横幅
		const h = gameData.h;			// 高さ
		const mapW = gameData.mapW;		// マップ横幅
		const mapH = gameData.mapH;		// マップ高さ
		const chipSize   = gameData.chipSize;			// チップ サイズ
		const landImage  = GameImage.images['land'];	// 画像 土地
		const charaImage = GameImage.images['chara'];	// 画像 キャラ

		// 描画の初期化
		const layerId = gameData.layerIds.middle;	// 描画対象
		const context = gameData.canvasArr[layerId].context;	// コンテクスト
		context.clearRect(0, 0, w, h);				// 描画領域クリア

		// マップの描画用変数の初期化
		const squareW = w / chipSize | 0;		// マス数 横
		const squareH = h / chipSize | 0;		// マス数 縦
		const centerX = squareW / 2 | 0;		// 中央 X
		const centerY = squareH / 2 | 0;		// 中央 Y
		const offsetX = userData.x - centerX;	// オフセットX
		const offsetY = userData.y - centerY;	// オフセットY
		const moveX   = userData.xDiff * chipSize;	// 移動X
		const moveY   = userData.yDiff * chipSize;	// 移動Y

		// マップの描画
		for (let y = -1; y <= squareH; y ++) {
			for (let x = -1; x <= squareW; x ++) {
				// 描画参照位置の計算
				const mapX = (x + offsetX + mapW) % mapW;	// マップX
				const mapY = (y + offsetY + mapH) % mapH;	// マップY

				// 土地描画
				const land = userData.mapArr[mapY * mapW + mapX];	// 土地

				UiChip.draw(	// チップ描画
					context, landImage, chipSize, chipSize,				// 基本情報
					land, 0, x * chipSize + moveX, y * chipSize + moveY	// 座標情報
				);
			}
		}

		// 自キャラ描画
		const x = squareW / 2 | 0;		// X位置
		const y = squareH / 2 | 0;		// Y位置
		const charaX = (time.sum / 500 | 0) % 2;	// キャラ アニメ用切り替え

		UiChip.draw(	// チップ描画
			context, charaImage, chipSize, chipSize,			// 基本情報
			charaX, 0, centerX * chipSize, centerY * chipSize	// 座標情報
		);
	}
}
