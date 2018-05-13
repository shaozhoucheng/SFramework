module shao.game {
	export interface IConfigKey {
		GongNeng: string
		Hero: string;
	}
	ConfigKey = {
		Hero: "Hero",
		GongNeng: "GongNeng",
	}
	function rP(key: string, CfgCreator: { new (): ICfg }, idkey: string = "id") {
		DataLocator.regCommonParser(key, CfgCreator, idkey);
	}
	function rE(key: string) {
		DataLocator.regExtra(key);
	}
	export function initData() {
		var C = ConfigKey;
		var P = shao.game;
		rP(C.Hero, HeroCfg);
		rP(C.GongNeng, P.GongNengCfg);

	}
}