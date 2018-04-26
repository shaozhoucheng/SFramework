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
			group.on(sui.SuiEvent.GROUP_CHANGE,this.onGroupChange,this);
		}


		private onGroupChange()
		{
			
		}


		public awake() {
			let view = this.$view;
		}


		public sleep() {

		}
	}
}