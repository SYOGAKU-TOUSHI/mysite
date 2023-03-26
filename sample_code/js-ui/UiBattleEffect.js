'use strict';

class UiBattleEffect {
	// エフェクト描画
	static draw(gameData, options, time) {
		// 変数の初期化
		const rect = options.enemyRect;	// 敵矩形
		const centerX = rect.w / 2;		// 中央X
		const centerY = rect.h / 2;		// 中央Y

		// 時間の計算
		const timeDiff = time.sum - options.selectTime;	// 時間差分
		const timeLen  = 600;						// 期間
		const rate     = timeDiff / timeLen;		// 比率

		// 描画の初期化
		const layerId = gameData.layerIds.front;			// 描画対象
		const context = gameData.canvasArr[layerId].context	// コンテクスト
		context.save();						// 保存
		context.translate(rect.x, rect.y);	// 原点移動
		context.fillStyle = context.strokeStyle = {		// 種類により色変更
			Sword: '#f00',
			Arrow: '#aaa',
			Wind:  '#8ff',
			Heal:  '#ff0',
			Fire:  '#f10',
			Ice:   '#8ff',
			Death: '#80f'
		}[options.actionType];

		// 描画範囲をクリップ
		context.beginPath();		// パス作成開始
		context.rect(3, 3, rect.w - 6, rect.h - 6);	// 矩形設定
		context.clip();				// クリップ

		//------------------------------------------------------------
		// 効果種類による分岐
		if (options.actionType.match(/Sword|Arrow|Wind/)) {
			// 剣、弓矢、風（斜め線を、交互にバツ印に描画）

			// 変数の初期化
			const margin = 8;	// マージン
			const lineW  = 8;	// 線の太さ

			// 描画
			context.beginPath();			// パス作成開始
			if (timeDiff < timeLen / 2) {
				// 前半（左上から右下への斜め斬撃）
				context.moveTo(margin,          margin);			// 左上
				context.lineTo(centerX - lineW, centerY + lineW);	// 中央左下
				context.lineTo(rect.w - margin, rect.h - margin);	// 右下
				context.lineTo(centerX + lineW, centerY - lineW);	// 中央右上
			} else {
				// 後半（右上から左下への斜め斬撃）
				context.moveTo(rect.w - margin, margin);			// 右上
				context.lineTo(centerX - lineW, centerY - lineW);	// 中央左上
				context.lineTo(margin,          rect.h - margin);	// 左下
				context.lineTo(centerX + lineW, centerY + lineW);	// 中央右下
			}
			context.fill();		// 塗り潰し

		} else if (options.actionType === 'Heal') {
			// 回復（光の柱）

			// 変数の初期化
			const step = 15;			// 分割数
			context.globalAlpha = 0.9;	// 半透明に

			// 描画
			for (let i = 0; i < step; i ++) {
				const w = rate * (rect.w / step) * 1;	// 横幅
				const x = i * rect.w / step - w / 2;	// X位置
				context.fillRect(x, 0, w, rect.h);		// 矩形描画
			}

		} else {
			// 火、氷、死（輪を描画）

			// 変数の初期化
			const step = 25;			// 分割数
			context.lineWidth = 4;		// 線幅

			// 描画
			for (let i = 0; i < step; i ++) {
				// アニメが進行すると、描画する半径の種類が増える
				if (i >= rate * step) { continue }	// 描画線のアニメ

				// 変数の初期化
				const radius = (centerX + centerY / 2) * i / step;	// 半径

				// 描画
				context.beginPath();	// パス開始
				context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
										// 円弧描画
				context.stroke();		// パス閉じる
			}
		}

		// 終了
		context.restore();		// 原点復帰
		const isEnd = timeDiff >= timeLen;	// 終了判定
		return isEnd;
	}
}
