module core.game {
    export interface IConfigKey {     
    	GongNeng:string
	}
	ConfigKey = {
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
    	var P = core.game;
    	rP(C.GongNeng, P.GongNengCfg);

	}
}