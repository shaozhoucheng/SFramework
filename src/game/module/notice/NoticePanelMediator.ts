module shao.game {
    export class NoticePanelMediator extends mvc.Mediator {
        constructor() {
            super(ModuleId.Notice);
        }

        public $view: NoticePanel;

        protected init() {
            this.view = new NoticePanel;
            ResizeManager.getInstance().add(this.view, sui.LayoutType.MIDDLE_CENTER);
            //这里加事件关注
        }

        private noticeBg:sui.Image;

        protected afterAllReady() {
            let view = this.$view;
            let bg = this.noticeBg = new sui.Image;
            view.addChildAt(bg,0);
            bg.source = game.ResPrefix.I+"start.jpg";
        }

        private ani: AniRender

        private showAniBtn() {
            let view = this.$view;
            let ani = this.ani;
            if (ani) {
                ani.onRecycle();
                ani = undefined;
            }
            ani = this.ani = game.AniRender.getAni("NoticeStartBtn");
            ani.frameRate = 12;
            ani.play();
            let display = ani.displaymc;
            display.x = 235;
            display.y = 350;
            view.addChild(display);
            display.touchEnabled = true;
            display.on(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this)
        }

        private onStartBtnTouch(evt: egret.TouchEvent) {
            let newPlayer = false;
            if (newPlayer) {
                getInstance(SceneManager).runScene(SceneConst.Story)
            } else {
                getInstance(SceneManager).runScene(SceneConst.Home)
            }
        }

        public awake() {
            this.showAniBtn();
        }

        public sleep() {
            let ani = this.ani;
            if (ani) {
                ani.displaymc.off(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this)
                ani.onRecycle();
                ani = undefined;
            }
        }
    }
}