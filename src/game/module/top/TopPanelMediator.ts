module shao.game {
    export class TopPanelMediator extends mvc.Mediator {
        constructor() {
            super(ModuleId.Top);
        }

        public $view: TopPanel;

        protected init() {
            this.view = new TopPanel;
            ResizeManager.getInstance().add(this.view, sui.LayoutType.TOP_CENTER);
            //这里加事件关注
        }

        private bg: sui.Image;

        protected afterAllReady() {
            let view = this.$view;
            let im = this.bg = new sui.Image;
            im.source = game.ResPrefix.PanelBg + $appendJPG("main_map_upperparts");
            view.addChildAt(im, 0);
        }

        private hideGroup() {
            let view = this.$view;
            view.group_hero.visible = false;
            view.group_rank.visible = false;
        }

        private onRankBtnTouch() {
            let view = this.$view;
            view.group_hero.visible = false;
            view.group_rank.visible = !view.group_rank.visible
        }

        private onHeroBtnTouch() {
            let view = this.$view;
            view.group_rank.visible = false;
            view.group_hero.visible = !view.group_hero.visible
        }

        private onMapBtnTouch() {
            let view = this.$view;
            this.hideGroup();
            $facade.toggle(ModuleId.Map);
        }

        public awake() {
            let view = this.$view;
            this.hideGroup();
            view.btn_rank.bindTouch(this.onRankBtnTouch, this);
            view.btn_hero.bindTouch(this.onHeroBtnTouch, this);
            view.btn_map.bindTouch(this.onMapBtnTouch, this);
        }

        public sleep() {
            let view = this.$view;
            view.btn_rank.looseTouch(this.onRankBtnTouch, this);
            view.btn_hero.looseTouch(this.onHeroBtnTouch, this);
            view.btn_map.looseTouch(this.onMapBtnTouch, this);
        }
    }
}