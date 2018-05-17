module shao.game {
    export class HomePanelMediator extends mvc.Mediator {
        constructor() {
            super(ModuleId.Home);
        }

        public $view: HomePanel;

        protected init() {
            this.view = new HomePanel;
            ResizeManager.getInstance().add(this.view, sui.LayoutType.TOP_CENTER, 0, 147);
            //这里加事件关注
        }
        private mlist: sui.MPageList<BuildVO, BuildItemRender>;
        private bg: sui.Image;

        protected afterAllReady() {
            let view = this.$view;
            let bg = this.bg = new sui.Image;
            view.addChildAt(bg, 0)
            bg.source = game.ResPrefix.PanelBg + $appendPNG("main_map_lowerparts")

            let mlist = this.mlist = new sui.MPageList<BuildVO, BuildItemRender>();
            this.testList = []
            for (let i = 0; i <= 26; i++) {
                let rect = view["rect" + i];
                let buildrender = new BuildItemRender;
                buildrender.x = rect.x;
                buildrender.y = rect.y;
                view.addChild(buildrender);
                mlist.addItem(buildrender)
                this.testList.push(null);
            }
        }

        private testList: BuildVO[];

        public awake() {
            let view = this.$view;
            this.mlist.displayList(this.testList);
        }



        public sleep() {
            let view = this.$view;

        }
    }
}