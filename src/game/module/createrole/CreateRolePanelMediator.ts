module shao.game {
	export class CreateRolePanelMediator extends mvc.Mediator {
		constructor() {
			super(ModuleId.CreateRole);
		}

		public $view: CreateRolePanel;

		private group: sui.TabGroup;
		protected init() {
			this.view = new CreateRolePanel;
			ResizeManager.getInstance().add(this.view, sui.LayoutType.MIDDLE_CENTER);
			//这里加事件关注
		}

		protected afterAllReady() {
			let view = this.$view;
			let group = this.group = new sui.TabGroup();
			for (let i = 1; i <= 16; i++) {
				let tab: eui.ToggleButton = view["tab_" + i];
				group.addItem(tab);
			}
			group.on(sui.SuiEvent.GROUP_CHANGE, this.onGroupChange, this);
		}

		private onGroupChange() {
		}

		private onLoginBtnTouch(e?: egret.TouchEvent) {
			$facade.toggle(ModuleId.ServerSelect);
			$facade.toggle(ModuleId.Login);
		}

		private onGotoBtnTouch() {
			$facade.toggle(ModuleId.Subtitles, 1)
			$facade.toggle(ModuleId.CreateRole, 0);
		}

		public awake() {
			let view = this.$view;
			this.group.selectedIndex = Math.floor(Math.random2(1, 16));
			view.btn_goto.bindTouch(this.onGotoBtnTouch, this);
		}

		public sleep() {
			let view = this.$view;
			view.btn_goto.looseTouch(this.onGotoBtnTouch, this);
		}
	}
}