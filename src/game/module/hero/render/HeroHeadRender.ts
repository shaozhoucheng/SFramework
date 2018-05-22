module shao.game {
    export class HeroHeadRender extends sui.ListItemRender<HeroVO>{

        public constructor() {
            super();
            this.skin = this.render = new CodeHeroHeadRender();
        }

        private headImg: sui.Image;
        private armyImg: sui.Image;
        private eleImg: sui.Image;

        protected bindComponent() {
            super.bindComponent();
            let im = this.headImg = new sui.Image;
            this.addChild(im);
            im.x = 13;
            im = this.armyImg = new sui.Image;
            this.addChild(im);
            im.y = 50; im.x = 10;
            im = this.eleImg = new sui.Image;
            this.addChild(im);
            im.y = 48; im.x = 60;
        }

        public awake() {
            let render = this.render;
        }

        public sleep() {
            let render = this.render;
        }

        private render: CodeHeroHeadRender;

        public setData(value: HeroVO) {
            super.setData(value);
            if (!value) return;
            let render = this.render;
            let cfg = getInstance(HeroDB).getCfgById(value.hid);
            this.headImg.source = game.ResPrefix.Card + CPath.head + $appendPNG((value.hid + "").zeroize(5));
            this.armyImg.source = game.ResPrefix.Card + CPath.army + $appendPNG(cfg.army + "_s");
            this.eleImg.source = game.ResPrefix.Card + CPath.element + $appendPNG((cfg.primeattribute + "").zeroize(2) + "_s");
            render.hpBar.value = 100;
        }
    }
}