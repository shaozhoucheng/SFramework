module core.game {
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
            for(let i =1;i<=16;i++)
            {
				let tab:eui.ToggleButton= view["tab_"+i];
				// tab.test = true;
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


		public awake() {
			let view = this.$view;
			this.group.selectedIndex = Math.floor(Math.random2(1,17));
		}



		public sleep() {
			let view = this.$view;
		}
	}
}