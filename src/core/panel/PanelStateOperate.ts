module core {

	export class PanelStateOperate {
		public static ins: PanelStateOperate = new PanelStateOperate();

		private _stateDic: Object = {};

		public constructor() {

		}
		/**
		 * 更改状态
		 * @param state
		 * @param type 0:地图类型, 1:系统类型 (pk模式, 上帝模式, 引导模式)
		 */
		public changeState(state: number, type: number = 0): void {
			if (Number(this._stateDic[type]) == state) return;
			this._stateDic[type] = state;
			TStatePanel.includehelp.dispatchEvent(new egret.Event(egret.Event.CHANGE));
		}

		public getState(type: number): number {
			return this._stateDic[type];
		}

		public clearState(type: number): void {
			if (this._stateDic[type] != null) {
				delete this._stateDic[type];
				TStatePanel.includehelp.dispatchEvent(new egret.Event(egret.Event.CHANGE));
			}
		}

		public get stateDic(): Object {
			return this._stateDic;
		}
	}
}