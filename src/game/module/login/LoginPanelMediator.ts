module core.game {
	export class LoginPanelMediator extends mvc.Mediator {
		constructor() {
			super(ModuleId.Login);
		}

		public $view: LoginPanel;

		private group: sui.TabGroup;
		protected init() {
			this.view = new LoginPanel;
			ResizeManager.getInstance().add(this.view, sui.LayoutType.MIDDLE_CENTER);
			//这里加事件关注
		}

		protected afterAllReady() {
			let view = this.$view;
			let group = this.group = new sui.TabGroup();
			group.addItem(view.tab_login)
			group.addItem(view.tab_regist)
			group.on(sui.SuiEvent.GROUP_CHANGE, this.onGroupChange, this);
		}


		private onGroupChange() {
			let view = this.$view;
			let index = this.group.selectedIndex;
			view.loginview.visible = index == 0;
			view.registview.visible = index == 1;
		}

		private onLoginBtnTouch(e?:egret.TouchEvent)
		{
			$facade.toggle(ModuleId.ServerSelect);
		}


		public awake() {
			let view = this.$view;
			this.group.selectedIndex = 0;
			view.btn_login.bindTouch(this.onLoginBtnTouch,this);
		}


		public sleep() {
			let view = this.$view;
			view.btn_login.looseTouch(this.onLoginBtnTouch,this);

		}
	}
}