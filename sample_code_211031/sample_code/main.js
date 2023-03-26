'use strict';

// 読み込み後開始
document.addEventListener('DOMContentLoaded', function() {
	// 変数
	const gameData  = new GameData();		// ゲーム データ
	const userData = new UserData();		// ユーザー データ
	userData.setStart(gameData);			// 開始時点データに

	//------------------------------------------------------------
	// 初期化
	const id = '#app';
	gameData.canvasArr = GameCanvas.initCanvasArr(id, gameData);	// canvasArrの初期化
	GameView.init(id, gameData);	// 表示の初期化

	//------------------------------------------------------------
	// リソース
	const promiseArr = [];

	// 画像の読み込み
	promiseArr.push(GameImage.load('land',      'image/land.png'));
	promiseArr.push(GameImage.load('chara',     'image/chara.png'));
	promiseArr.push(GameImage.load('fontBlack', 'image/fontBlack.png'));
	promiseArr.push(GameImage.load('fontWhite', 'image/fontWhite.png'));

	// サウンドの読み込み
	GameSound.init(GameUtil.ua.pc);
	const baseBgm = 'sound/bgm/bgm_maoudamashii_8bit';
	const baseSe  = 'sound/se/se_maoudamashii_retro';
	promiseArr.push(GameSound.load('bgmMap',        `${baseBgm}01.mp3`));
	promiseArr.push(GameSound.load('bgmBattle',     `${baseBgm}18.mp3`));
	promiseArr.push(GameSound.load('bgmBattleLast', `${baseBgm}25.mp3`));
	promiseArr.push(GameSound.load('bgmWin',        `${baseBgm}24.mp3`));
	promiseArr.push(GameSound.load('bgmLose',       `${baseBgm}20.mp3`));
	promiseArr.push(GameSound.load('bgmFin',        `${baseBgm}22.mp3`));
	promiseArr.push(GameSound.load('seAt',          `${baseSe}22.mp3`));
	promiseArr.push(GameSound.load('seHeal',        `${baseSe}08.mp3`));
	promiseArr.push(GameSound.load('seTown',        `${baseSe}03.mp3`));

	// リソース読み込み後開始
	Promise.all(promiseArr).then(arg => {
		// 文字描画の画像設定
		UiText.setImage('black', GameImage.images['fontBlack']);
		UiText.setImage('white', GameImage.images['fontWhite']);

		// ゲーム開始
		SceneTitle.start(gameData, userData);	// タイトル開始
		GameAnim.start();		// アニメーション開始
	});
});
