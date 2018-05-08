module core.game {
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

        protected afterAllReady() {
            let view = this.$view;
            view.bg.source = "http://bbs.egret-labs.org/static/image/common/logo_sc_s.png"
        }

        public awake() {

        }


        public sleep() {

        }
    }
}