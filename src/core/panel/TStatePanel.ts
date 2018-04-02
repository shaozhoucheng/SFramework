module core {
	export class TStatePanel extends eui.Component {
		public constructor() {
			super();
		}

		public static includehelp: egret.EventDispatcher = new egret.EventDispatcher()

		/**
		 * 修改state 
		 * @param state
		 * 
		 */
		public static changeState(state: number): void {
			PanelStateOperate.ins.changeState(state, PanelStateDefine.TYPE_MAP);
		}

		private _includeState: PanelState;

		public get includeState(): PanelState {
			if (!this._includeState) {
				this._includeState = new PanelState(this);
			}
			return this._includeState;
		}

		/**
		 * 除了那些都显示 
		 */
		public includeOut(...arg): void {
			this.includeState.includeOut(arg);
		}

		/**
		 * 只显示在固定的地方
		 */
		public includeIn(...arg): void {
			this.includeState.includeIn(arg);
		}

		public toggleState(toShow: boolean): void {
			if (toShow) {
				if (this.includeState.includeParent) {
					this.includeState.includeParent.addChildAt(this, 0);
					this.changeShow(true);
				}
			}
			else {
				if (this.parent) {
					this.parent.removeChild(this);
					this.changeShow(false);
				}
			}
		}

		public changeShow(flag:boolean){

		}
	}
}