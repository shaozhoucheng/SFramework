module shao.game {
    export class FriendPanelMediator extends mvc.Mediator {
        constructor() {
            super(ModuleId.Friend);
        }

        public $view: FriendPanel;

        protected init() {
            this.view = new FriendPanel;
            ResizeManager.getInstance().add(this.view, sui.LayoutType.TOP_LEFT, 0, 155);
            //这里加事件关注
        }

        protected afterAllReady() {
            let view = this.$view;
            view.group_tween.mask = view.maskrect
        }

        private onFriendBtnTouch(e?: egret.TouchEvent) {
            let view = this.$view;
            Global.removeTween(view.maskrect)
            let tween = Global.getTween(view.maskrect)
            if (view.tg_friend.selected) {
                tween.to({ width: 178 }, 200).to({ height: 245 }, 200)
            }
            else {
                tween.to({ height: 3 }, 200).to({ width: 0 }, 200)
            }
        }


        public awake() {
            let view = this.$view;
            view.tg_friend.on(egret.TouchEvent.TOUCH_TAP, this.onFriendBtnTouch, this)
        }



        public sleep() {
            let view = this.$view;
            view.tg_friend.off(egret.TouchEvent.TOUCH_TAP, this.onFriendBtnTouch, this)

        }
    }
}