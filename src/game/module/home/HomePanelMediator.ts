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
            for (let i = 0; i <= 25; i++) {
                let rect = view["rect" + i];
                let buildrender = new BuildItemRender;
                buildrender.x = rect.x;
                buildrender.y = rect.y;
                view.addChild(buildrender);
                mlist.addItem(buildrender)
            }
            this.initVOs()
        }

        private initVOs() {
            this.testList = []
            for (let i = 0; i <= 25; i++) {
                let vo = new BuildVO;
                vo.slot = i;
                vo.status = 0;
                if (i == 0) {
                    vo.bid = 12
                }
                else if (i == 4 || i == 9 || i == 15 || i == 20) {
                    vo.bid = 15
                } else if (i == 24) {
                    vo.bid = 13
                } else if (i == 25) {
                    vo.bid = 14
                } else if (i == 1) {
                    vo.bid = 1
                    vo.level = 8;
                } else if (i == 2) {
                    vo.bid = 1
                    vo.level = 8;
                    vo.status = 1
                } else if (i == 3) {
                    vo.bid = 4
                    vo.level = 8;
                    vo.status = 0
                }
                else {
                    vo.bid = 11
                }
                this.testList.push(vo)
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