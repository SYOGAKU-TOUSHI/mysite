'use strict';

class UiBattleBase {
	// 戦闘基本描画
	static draw(gameData, options, time) {
		// 変数の初期化
		const chipSize = gameData.chipSize;	// チップ サイズ
		const rect = options.enemyRect;		// 敵矩形

		// 描画の初期化
		const layerId = gameData.layerIds.middle;	// 描画対象
		const context = gameData.canvasArr[layerId].context;	// コンテクスト
		context.save();									// 保存
		context.translate(rect.x, rect.y);				// 原点移動
		UiWin.drawWin(context, 0, 0, rect.w, rect.h);	// ウィンドウ描画

		// 自ダメージ演出（赤くする）
		if (options.state == 'enemy') {
			context.globalAlpha = 0.5;					// 半透明に
			context.fillStyle = '#f00';					// ダメージ色の赤
			context.fillRect(0, 0, rect.w, rect.h);		// 敵矩形内を塗り潰し
			context.globalAlpha = 1;					// 透明度を戻す
		}

		// 敵ステータスの描画
		const enemy = options.enemyData;		// 敵値
		const text = `${enemy.name} Lv ${enemy.level}`	// 敵ステータス
			+ `  HP ${enemy.hp} / ${enemy.hpMax}`
			+ `  AT ${enemy.at} DF ${enemy.df}`;
		UiText.drawCenter(context, text, rect.w / 2 | 0, 12, 5, 'white');	// 文字列描画

		// 揺れ演出（キャラを揺らす）
		let moveX = 0;	// 座標移動X位置
		let moveY = 0;	// 座標移動Y位置
		if (options.state !== 'menu' && options.actionType !== 'Heal') {	// 攻撃時
			moveX = ((time.sum / 50 | 0) * 17 % 4) - 2;		// 揺れ移動X
			moveY = ((time.sum / 50 | 0) * 31 % 4) - 2;		// 揺れ移動Y
		}

		// キャラの描画の初期化
		const refX = enemy.image	// キャラ参照位置X
		const refY = 1;				// キャラ参照位置Y
		const charaImage = GameImage.images['chara'];	// キャラ画像
		const drawSize = chipSize * 9;					// 敵描画サイズ
		const drawX = ((rect.w - drawSize) / 2 | 0) + moveX;	// 敵描画X位置
		const drawY = ((rect.h - drawSize) / 2 | 0) + moveY;	// 敵描画Y位置

		// キャラの描画
		UiChip.draw(	// チップ描画
			context, charaImage, chipSize, drawSize,	// 基本情報
			refX, refY, drawX, drawY					// 座標情報
		);

		// 原点復帰
		context.restore();
	}
}
