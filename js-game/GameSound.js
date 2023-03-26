'use strict';

// 注意：一度画面をクリックしないとChromeでは音を再生できない。

class GameSound {
	// 変数の初期化
	static canUse = null;	// 音声使用可能
	static sounds = {};		// 読み込んだサウンド
	static bgmNow = null;	// 現在のBGM

	// 音声用オブジェクト
	static Sound = function(url) {
		this.audio = new Audio('');		// オーディオ
		this.audio.preload = 'auto';	// 自動プレロード
		this.audio.src = url;			// URLを指定して読み込み開始
	};

	//------------------------------------------------------------
	// 初期化
	static init(isPc) {
		if (! isPc) { this.canUse = false }	// PCでない（モバイル時）は利用不能
		if (this.canUse !== null) {return}	// 利用不可なので終了

		// Audioが有効か否か（mp3が読み込めるなら利用可能とする）
		this.canUse = false;	// 利用不可として、読み込みを開始
		try {
			const au = new Audio('');
			this.canUse = !! au.canPlayType('audio/mpeg').match(/maybe|probably/);
		} catch {}
	}

	//------------------------------------------------------------
	// 読み込み
	static load(id, url) {
		// 使用不能の場合 -> 読み込み終了
		if (this.canUse === false) {
			return Promise.resolve('cannot use sound : ' + id);
		}

		// サウンドの初期化
		this.sounds[id] = new this.Sound(url);
		const au = this.sounds[id].audio;

		// プロミスを戻す
		return new Promise((resolve, reject) => {
			// プレロード準備完了時の処理と読み込み
			au.addEventListener('canplaythrough', e => {
				// 準備完了時の処理
				if (e.currentTarget.dataset.triggered) { return }	// 二重実行なら終了
				e.currentTarget.dataset.triggered = true;			// 二重実行防止フラグ
				resolve('load sound : ' + id);
			});			// 準備完了時の処理
			au.load();	// 読み込み
		});
	};

	//------------------------------------------------------------
	// 無効確認
	static checkUnable(id) {
		return this.canUse === false || ! this.sounds[id];
	}

	// 再生位置を0に
	static resetCurrentTime(au, cmd) {
		if (cmd) { au[cmd]() }	// 命令実行
		au.currentTime = 0;		// 再生位置を0に
	};

	//------------------------------------------------------------
	// 再生
	static play(id) {
		if (this.checkUnable(id)) { return }	// 無効確認
		const au = this.sounds[id].audio;		// オーディオ取り出し
		this.resetCurrentTime(au, 'pause');		// 再生位置を0に

		// 再生
		au.removeEventListener('ended', au.func);	// 終了時の処理を削除
		au.play();	// 再生
	};

	// ループ再生
	static loop(id) {
		if (this.checkUnable(id)) { return }	// 無効確認
		const au = this.sounds[id].audio;		// オーディオ取り出し
		this.resetCurrentTime(au, 'pause');		// 再生位置を0に

		// ループ再生
		au.removeEventListener('ended', au.func);	// 終了時の処理を削除
		au.func = () => au.play();					// ループ用の再生
		au.addEventListener('ended', au.func);		// 終了時の処理を追加
		au.play();		// 再生
	};

	// 一時停止
	static pause(id) {
		if (this.checkUnable(id)) { return }	// 無効確認
		this.sounds[id].audio.pause();			// 一時停止
	};

	// 停止
	static stop = function(id) {
		if (this.checkUnable(id)) { return }		// 無効確認
		const au = this.sounds[id].audio;			// オーディオ取り出し
		au.removeEventListener('ended', au.func);	// 終了時の処理を削除
		this.resetCurrentTime(au, 'pause');			// 再生位置を0に
	};

	//------------------------------------------------------------
	// BGM再生
	static playBGM(id) {
		if (this.checkUnable(id)) { return }	// 無効確認
		const au = this.sounds[id].audio;		// オーディオ取り出し

		// 切り換え処理
		if (id != this.bgmNow) {
			this.stop(this.bgmNow);		// 名前が異なるなら停止
		} else
		if (! au.ended) {
			return;			// 名前が同じで再生中なら関数終了
		}

		// BGMの更新とループ再生
		this.bgmNow = id;	// BGMの名前を変更
		this.loop(id);		// 指定音楽のループ再生
	};

	// BGM停止
	static stopBGM() {
		this.stop(this.bgmNow);
	}
}
