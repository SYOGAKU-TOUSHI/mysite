'use strict';

class UiText {
	// 変数の初期化
	static fontW = 5;	// フォント横幅
	static fontH = 10;	// フォント高さ
	static images = {black: null, white: null};	// 画像

	//------------------------------------------------------------
	// 画像設定
	//   黒(black)と白(white)は、画像の設定が必要
	static setImage(id, image) {
		this.images[id] = image;
	}

	//------------------------------------------------------------
	// 文字描画
	// color - black, white
	static draw(context, text, x, y, charW, color) {
		// 白か黒のフォント画像を取得
		const image = this.images[color];

		// 文字列の文字コードから画像を切り出して描画する
		for (let i = 0; i < text.length; i ++) {
			const refY = text.charCodeAt(i) * this.fontH;	// Y参照位置
			context.drawImage(image,		// 1文字描画
				0, refY, this.fontW, this.fontH,
				x + charW * i, y, charW, charW * this.fontH / this.fontW | 0
			);
		}
	};

	//------------------------------------------------------------
	// 文字描画 中央位置
	static drawCenter(context, text, x, y, charW, color) {
		x -= text.length * charW / 2 | 0;				// X方向を半分左に
		y -= charW * this.fontH / this.fontW / 2 | 0;	// Y方向を半分上に
		this.draw(context, text, x, y, charW, color);	// 文字描画
	};

	//------------------------------------------------------------
	// 白抜き/黒抜き文字描画（指定と逆の色で周囲を囲む）
	// isC - 中央位置の描画か否か
	static drawFrame(context, text, x, y, charW, color, isCenter) {
		const colorFrame = {white: 'black', black: 'white'}[color];	// 外周色

		// 枠描画（色はcolorFrame）
		for (let y2 = -1; y2 <= 1; y2 ++) {
			for (let x2 = -1; x2 <= 1; x2 ++) {
				if (isCenter) {
					this.drawCenter(context, text, x + x2, y + y2, charW, colorFrame);
				} else {
					this.draw(context, text, x + x2, y + y2, charW, colorFrame);
				}
			}
		}

		// 中央描画（色はcolor）
		if (isCenter) {
			this.drawCenter(context, text, x, y, charW, color);
		} else {
			this.draw(context, text, x, y, charW, color);
		}
	};
}
