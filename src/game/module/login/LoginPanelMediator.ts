module core.game {
	export class LoginPanelMediator extends mvc.Mediator {
        constructor() {
			super(ModuleId.Login);
		}

		public $view: LoginPanel;
        protected init() {
			this.view = new LoginPanel;
			ResizeManager.getInstance().add(this.view, sui.LayoutType.MIDDLE_CENTER);
			//这里加事件关注
		}

		public awake()
		{
			let view = this.$view;
		}


		public sleep()
		{

		}
    }
}