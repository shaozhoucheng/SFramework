module shao.game {
	export class SubtitlesPanelMediator extends mvc.Mediator {
		constructor() {
			super(ModuleId.Subtitles);
		}

		public $view: SubtitlesPanel;

		protected init() {
			this.view = new SubtitlesPanel;
			ResizeManager.getInstance().add(this.view, sui.LayoutType.MIDDLE_CENTER);
			//这里加事件关注
		}

		protected afterAllReady() {
			let view = this.$view;
			view.btn_start.visible = false;

			let image = this.subtitle = new sui.Image;
			view.addChild(image)
			image.x = view.maskRect.x;
			image.y = view.maskRect.y + view.maskRect.height;
			image.mask = view.maskRect;
			image.on(EventConst.BMP_LOAD_COMPLETE, this.onBmpLoad, this);
		}

		private onBmpLoad() {
			let image = this.subtitle;
			image.off(EventConst.BMP_LOAD_COMPLETE, this.onBmpLoad, this);
			let tween = Global.getTween(image);
			tween.to({ y: -500 }, 6000).call(this.onTweenCallBack, this)
		}

		private onTweenCallBack() {
			Global.removeTween(this.subtitle)

			let view = this.$view;
			let tween = Global.getTween(view.animImage);
			tween.to({ x: 580 }, 500);

			view.btn_start.visible = true;
		}

		private subtitle: sui.Image

		private onStartBtnTouch() {
			$facade.toggle(ModuleId.Story, 1)
			$facade.toggle(ModuleId.Subtitles, 0)
		}

		public awake() {
			let view = this.$view;
			this.subtitle.source = "o/story/game_start_story.png"
			view.btn_start.bindTouch(this.onStartBtnTouch, this);
		}

		public sleep() {
			let view = this.$view;
			view.btn_start.looseTouch(this.onStartBtnTouch, this);
		}
	}
}