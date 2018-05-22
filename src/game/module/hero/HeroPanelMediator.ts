module shao.game {
    export class HeroPanelMediator extends mvc.Mediator {
        constructor() {
            super(ModuleId.Hero);
        }

        public $view: HeroPanel;

        private group: sui.TabGroup;
        protected init() {
            this.view = new HeroPanel;
            ResizeManager.getInstance().add(this.view, sui.LayoutType.TOP_RIGHT, 0, 155);
            //这里加事件关注
        }

        private headlist: sui.PageList<HeroVO, HeroHeadRender>

        protected afterAllReady() {
            let view = this.$view;
            let group = this.group = new sui.TabGroup();
            group.addItem(view.tab_0)
            group.addItem(view.tab_1)
            group.addItem(view.tab_2)
            group.addItem(view.tab_3)
            group.on(sui.SuiEvent.GROUP_CHANGE, this.onGroupChange, this);

            let list = this.headlist = new sui.PageList<HeroVO, HeroHeadRender>(HeroHeadRender, 90, 90, false, 2)
            view.addChild(list);
            list.moveTo(28, 5)
            let scroller = new sui.Scroller;
            scroller.bindObj(list, new egret.Rectangle(0, 0, 180, 450))

            this.herodata = {};
            let data = this.herodata[1] = [];
            let vo = new HeroVO;
            vo.hid = 171
            data.push(vo)
            vo = new HeroVO;
            vo.hid = 61
            data.push(vo)
            vo = new HeroVO;
            vo.hid = 128
            data.push(vo)
            vo = new HeroVO;
            vo.hid = 155
            data.push(vo)
        }

        private herodata: { [index: number]: HeroVO[] };


        private onGroupChange() {
            let view = this.$view;
            let index = this.group.selectedIndex;
            if (index == 0) {
                this.headlist.displayList(this.herodata[1])
            } else {
                this.headlist.dispose();
            }
        }


        public awake() {
            let view = this.$view;
            this.group.selectedIndex = 0;
        }



        public sleep() {
            let view = this.$view;
        }
    }
}