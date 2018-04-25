module core.game {
	export class ServerMainPanelMediator extends mvc.Mediator {
        constructor() {
			super(ModuleId.Servers);
		}

		public $view: ServerMainPanel;
        protected init() {
			this.view = new ServerMainPanel;
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