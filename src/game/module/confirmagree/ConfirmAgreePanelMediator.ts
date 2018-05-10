module core.game {
	export class ConfirmAgreePanelMediator extends mvc.Mediator {
		constructor() {
			super(ModuleId.ConfirmAgree);
		}

		public $view: ConfirmAgreePanel;

		protected init() {
			this.view = new ConfirmAgreePanel;
			ResizeManager.getInstance().add(this.view, sui.LayoutType.MIDDLE_CENTER);
			//这里加事件关注
		}

		protected afterAllReady() {
			let view = this.$view;
			let scroller = new sui.Scroller;
			scroller.bindObj(view.txt_confirm,new egret.Rectangle(0,0,548,488))
		}

		private onAgreeBtnTouch(e?: egret.TouchEvent) {
			$facade.toggle(ModuleId.CreateRole);
			$facade.toggle(ModuleId.ConfirmAgree,0);
		}

		private showConfirm()
		{
			RES.getResByUrl("resource/remote/data/confirm.json",this.onConfirmComplete,this,RES.ResourceItem.TYPE_JSON);
		}

		private onConfirmComplete(data:any,key:string)
		{
			let view = this.$view;
			view.txt_confirm.text = data;
			view.txt_confirm.height = view.txt_confirm.textHeight;
		}

		public awake() {
			let view = this.$view;
			this.showConfirm();
			view.btn_agree.bindTouch(this.onAgreeBtnTouch, this);
		}

		public sleep() {
			let view = this.$view;
			view.btn_agree.looseTouch(this.onAgreeBtnTouch, this);
		}
	}
}