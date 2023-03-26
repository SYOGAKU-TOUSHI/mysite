'use strict';

class GameData {
	// コンストラクター
	constructor() {
		// 描画用設定
		this.w = 320;		// 描画領域 横幅
		this.h = 240;		// 描画領域 高さ
		this.bg = '#000';	// 背景色

		this.layerMax = 3;	// レイヤー最大数
		this.layerIds = {	// レイヤーID
			bg:     0,		// レイヤー番号 0 背景
			middle: 1,		// レイヤー番号 1 中
			front:  2		// レイヤー番号 2 前
		};

		// マップ用設定
		this.mapW = 64;			// マップ横
		this.mapH = 48;			// マップ縦
		this.chipSize = 16;		// チップ サイズ

		// 土地番号
		this.landIds = {
			plain:    0,	// 平地
			forest:   1,	// 森
			mountain: 2,	// 山
			water:    3,	// 水
			town:     4,	// 街
			castle:   5		// 城
		};

		// 乱数用関数
		this.xors = new GameUtil.Xors();	// 乱数初期化（戦闘などで使用）

		//------------------------------------------------------------
		// 宝物配列
		this.treasureArr = [
			// 呪文
			'Spell:Heal', 'Spell:Heal', 'Spell:Heal',	// 回復、回復、回復
			'Spell:Fire', 'Spell:Fire', 'Spell:Fire',	// 火炎、火炎、火炎
			'Spell:Ice',  'Spell:Ice',  'Spell:Ice',	// 氷結、氷結、氷結
			// 鉄鎧
			'IronBody', 'IronArm', 'IronLeg', 'IronHead',	// 体、腕、脚、頭
			// 強い装備
			'HeroSword', 'WisdomRing', 'FairyShield'	// 英雄剣、知恵指輪、妖精盾
		];

		//------------------------------------------------------------
		// 敵データ
		this.enemyData = {};

		this.enemyData[this.landIds.plain] = {
			name:  'Goblin',	// 名前
			rate:  20,			// 戦闘発生確率
			image: 0,			// 画像
			hp:    50,			// HP
			at:    10,			// 攻撃力
			df:    5,			// 防御力
			skill: 'Sword'		// 技
		};
		this.enemyData[this.landIds.forest] = {
			name:  'Elf',		// 名前
			rate:  10,			// 戦闘発生確率
			image: 1,			// 画像
			hp:    100,			// HP
			at:    20,			// 攻撃力
			df:    10,			// 防御力
			skill: 'Arrow'		// 技
		};
		this.enemyData[this.landIds.mountain] = {
			name:  'Roc',		// 名前
			rate:  5,			// 戦闘発生確率
			image: 2,			// 画像
			hp:    200,			// HP
			at:    40,			// 攻撃力
			df:    30,			// 防御力
			skill: 'Wind'		// 技
		};
		this.enemyData['last'] = {
			name:  'Dark King',	// 名前
			image: 3,			// 画像
			hp:    999,			// HP
			at:    499,			// 攻撃力
			df:    99,			// 防御力
			skill: 'Death'		// 技
		};
	}
}
