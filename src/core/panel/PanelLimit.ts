module core {
	export class PanelLimit {
		public constructor() {
		}

		private static _showList: string[] = [];

		public static add(moduleid: string) {
			// let f = $facade;
			// let dic = DataLocator.getData(game.ConfigKey.JieMianHuChi);
			// let cfg: chuanqi.JieMianHuChiCfg = dic[moduleid] as chuanqi.JieMianHuChiCfg;
			// if (cfg) {
			// 	let len = this._showList.length;
			// 	for (let i: number = len - 1; i >= 0; i--) {
			// 		let id = this._showList[i];
			// 		if (cfg.isExclusion(id)) {
			// 			f.toggle(id, 0);
			// 			this.remove(id);
			// 		}
			// 	}
			// }

			// this._showList.push(moduleid);
		}

		public static remove(moduleid: string) {
			this._showList.remove(moduleid);
		}

		/**
		 * 关闭所有打开的面板
		 * 
		 * @static
		 * 
		 * @memberOf PanelLimit
		 */
		public static closeAll() {
			let len = this._showList.length;
			let facade = $facade;
			for (let i: number = len - 1; i >= 0; i--) {
				let id = this._showList[i];
				let cfg = facade.moduleManager.getCfg(id);
				if (cfg.containerID == 8700) {
					facade.toggle(id, 0);
					this.remove(id);
				}
			}
		}

	}
}