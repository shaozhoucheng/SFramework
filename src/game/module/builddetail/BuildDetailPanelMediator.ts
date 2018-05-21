module shao.game {
	export class BuildDetailPanelMediator extends mvc.Mediator {
		constructor() {
			super(ModuleId.BuildDetail);
		}

		public $view: BuildDetailPanel;

		private group: sui.TabGroup;
		protected init() {
			this.view = new BuildDetailPanel;
			this.$view.isModal = true;
			ResizeManager.getInstance().add(this.view, sui.LayoutType.MIDDLE_CENTER);
			//这里加事件关注
		}

		protected afterAllReady() {
			let view = this.$view;
			let im = this.icon = new sui.Image;
			view.addChild(im);
			im.x = 35; im.y = 48;
		}

		private icon: sui.Image;

		private onLoginBtnTouch(e?: egret.TouchEvent) {
			$facade.toggle(ModuleId.ServerSelect);
			$facade.toggle(ModuleId.Login);
		}

		public setData(value: BuildVO) {
			this.target = value;
			this.showBaseDes();
		}

		private showBaseDes() {
			let view = this.$view;
			let cfg = getInstance(JianZhuDB).getCfgById(this.target.bid)
			view.txt_title.text = cfg.name + "Lv." + this.target.level;
			view.txt_name.text = cfg.name;
			view.txt_des.text = cfg.des;
			this.icon.source = game.ResPrefix.Building + $appendPNG(cfg.icon);
			view.txt_time.text = DateUtils.getCountdown(cfg.timeArr[0] * 1000, { h: "{0}:", m: "{0}:", s: "{0}" })
			let effectarr = cfg.effectvalue1.split(";");
			if (this.target.level >= effectarr.length) {
				view.txt_detail.text = "max"
			} else {
				view.txt_detail.text = effectarr[this.target.level - 1] + " -> " + effectarr[this.target.level]
			}
		}

		private target: BuildVO;


		public awake() {
			let view = this.$view;
		}



		public sleep() {
			let view = this.$view;
		}
	}
}