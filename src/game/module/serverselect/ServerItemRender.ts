module core.game {
	export class ServerItemRender extends sui.ListItemRender<ServerVO>{

		public constructor() {
			super();
			this.skin = this.render = new CodeServerItemRender();
		}

		protected bindComponent() {
			super.bindComponent();
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