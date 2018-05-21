module shao.game {
	export class BuildPanelMediator extends mvc.Mediator {
		constructor() {
			super(ModuleId.Build);
		}

		public $view: BuildPanel;

		protected init() {
			this.view = new BuildPanel;
			this.$view.isModal = true
			ResizeManager.getInstance().add(this.view, sui.LayoutType.MIDDLE_CENTER);
			//这里加事件关注
		}

		private blist: sui.PageList<JianZhuCfg, TFItemRender>;

		private icon: sui.Image;

		protected afterAllReady() {
			let view = this.$view;
			let blist = this.blist = new sui.PageList<JianZhuCfg, TFItemRender>(TFItemRender, 120, 22);
			view.addChild(blist);
			blist.on(sui.PageList.ITEM_SELECTED, this.onListItemSelect, this);
			blist.moveTo(28, 73)
			let scroller = new sui.Scroller;
			scroller.bindObj(blist, new egret.Rectangle(0, 0, 120, 200))
			let icon = this.icon = new sui.Image;
			icon.x = 161; icon.y = 68;
			view.addChild(icon)
		}

		private onListItemSelect() {
			let cfg = this.blist.selectData;
			this.icon.source = game.ResPrefix.Building + $appendPNG(cfg.icon)
			let view = this.$view;
			view.buildname.text = cfg.name;
			view.builddes.text = cfg.des;
			view.buildtime.text = DateUtils.getCountdown(cfg.timeArr[0] * 1000, { h: "{0}:", m: "{0}:", s: "{0}" })
		}

		private showBuildList() {
			this.blist.displayList(getInstance(JianZhuDB).getCanBuildCfgs());
		}

		private onQuitBtnTouch() {
			this.$view.hide();
		}

		public awake() {
			let view = this.$view;
			this.showBuildList();
			view.btn_quit.bindTouch(this.onQuitBtnTouch, this);
		}



		public sleep() {
			let view = this.$view;
			view.btn_quit.looseTouch(this.onQuitBtnTouch, this);
		}
	}
}