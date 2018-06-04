module shao.game {
	export class MapPanelMediator extends mvc.Mediator {
		constructor() {
			super(ModuleId.Map);
		}

		protected _background: MainMapView;


		public $view: MapPanel;

		protected init() {
			this.view = new MapPanel;
			ResizeManager.getInstance().add(this.view, sui.LayoutType.TOP_CENTER, 0, 147);
			//这里加事件关注
		}



		protected afterAllReady() {
			let view = this.$view;
			let map = this._background = new MainMapView;
			view.addChild(map);

		}

		public awake() {
			let view = this.$view;
		}



		public sleep() {
			let view = this.$view;
		}
	}
}