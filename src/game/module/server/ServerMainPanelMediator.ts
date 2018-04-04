module core.game {
	export class ServerMainPanelMediator extends mvc.Mediator {
        constructor() {
			super(ModuleId.Servers);
		}

        protected init() {
			this.view = new ServerMainPanel;
			ResizeManager.getInstance().add(this.view, sui.LayoutType.MIDDLE_CENTER);
			//这里加事件关注
		}

		public awake()
		{

		}


		public sleep()
		{

		}
    }
}