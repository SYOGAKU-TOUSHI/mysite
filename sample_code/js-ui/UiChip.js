'use strict';

class UiChip {
	// チップ描画
	//   コンテクスト、画像、チップ サイズ、描画サイズ
	//   参照位置X、参照位置Y、描画X、描画Y
	static draw(
		context, image, chipSize, drawSize,	// 基本情報
		refX, refY, drawX, drawY			// 座標情報
	) {
		// 描画
		context.drawImage(
			// 画像
			image,
			// 参照座標情報
			chipSize * refX,	// 画像参照 X
			chipSize * refY,	// 画像参照 Y
			chipSize,			// 画像参照 横幅
			chipSize,			// 画像参照 高さ
			// 描画座標情報
			drawX,		// 描画 X
			drawY,		// 描画 Y
			drawSize,	// 描画 横幅
			drawSize	// 描画 高さ
		);
	}
}
