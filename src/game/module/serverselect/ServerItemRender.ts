module core.game {
	export class ServerItemRender extends sui.ListItemRender<ServerVO>{

		public constructor() {
			super();
			this.skin = this.render = new CodeServerItemRender();
		}

		protected bindComponent() {
			super.bindComponent();
		}

		public awake()
		{
			let render = this.render;
			render.on(egret.TouchEvent.TOUCH_TAP,this.onSkinTouch,this)
		}

		public sleep()
		{
			let render = this.render;
			render.off(egret.TouchEvent.TOUCH_TAP,this.onSkinTouch,this)
		}

		private onSkinTouch()
		{
			$facade.toggle(ModuleId.ServerSelect);
			$facade.toggle(ModuleId.Notice)
		}

		private render: CodeServerItemRender;

		public setData(value: ServerVO) {
			super.setData(value);
			if (!value) return;
			let render = this.render;
			render.label_serverName.text = value.name;
			render.label_serverStatus.text = value.status + "";
		}
	}
}