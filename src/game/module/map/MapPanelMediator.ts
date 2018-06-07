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
			map.MoveTo(0, 0);
			map.mask = view.rect_mask;
			map.touchEnabled = true;

		}

		private bx: number;
		private by: number;

		private onMapBegin(e: egret.TouchEvent) {
			this.bx = e.localX;
			this.by = e.localY;
			console.log(e);
		}


		private onMapMove(e: egret.TouchEvent) {
			let offsetx = e.localX - this.bx;
			let offsety = e.localY - this.by;
			this._background.setRect(offsetx,offsety);
			// this._background.MoveTo(this._background.x)
			console.log(e);
		}

		public awake() {
			console.log("open map")
			let view = this.$view;
			this._background.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMapBegin, this);
			this._background.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMapMove, this);
		}



		public sleep() {
			let view = this.$view;
			this._background.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMapBegin, this);
			this._background.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMapMove, this);
		}
	}
}