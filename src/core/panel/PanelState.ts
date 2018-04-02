module core {
	export class PanelState {

		public includes: Number[];
		private includeFlag: boolean;
		private _includeParent: egret.DisplayObjectContainer;
		private _panel: TStatePanel;

		public constructor(panel: TStatePanel) {
			this._panel = panel;
		}

		public includeIn(states:Number[]): void {
			this.includeFlag = true;
			this.includes = states;
		}

		public includeOut(states:Number[]): void {
			this.includeFlag = false;
			this.includes = states;
		}

		private refresh(e: Event): void {
			if (!this.includes) return;
			let _panel = this._panel;
			let curP: egret.DisplayObjectContainer = _panel ? _panel.parent : null;
			_panel.toggleState(this.checkCanShow(curP, this.includeFlag));
		}

		public checkCanShow(parent: egret.DisplayObjectContainer, flag: boolean = false): boolean {
			if (!this.includes) {
				return true;
			}
			if (parent && (!this._includeParent || flag)) {
				this._includeParent = parent;
			}

			let stateDic = PanelStateOperate.ins.stateDic;
			for (let i in stateDic) {
				let itemState = stateDic[i];
				if (this.includeFlag && this.includes.indexOf(itemState) == -1) {
					return false;
				}
				if (!this.includeFlag && this.includes.indexOf(itemState) != -1) {
					return false;
				}
			}
			return true;
		}

		public get includeParent(): egret.DisplayObjectContainer {
			return this._includeParent;
		}

		public awaken(): void {
			if (!this.includes) return;
			TStatePanel.includehelp.on(egret.Event.CHANGE, this.refresh, this);
		}

		public sleep(): void {
			if (!this.includes) return;
			this._includeParent = null;
			TStatePanel.includehelp.off(egret.Event.CHANGE, this.refresh, this);
		}

	}
}