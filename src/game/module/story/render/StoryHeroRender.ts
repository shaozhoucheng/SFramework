module shao.game {
    export class StoryHeroRender extends sui.ListItemRender<number>{
        public constructor() {
            super();
            this.skin = this.render = new sui.Image();
        }

        protected bindComponent() {
            super.bindComponent();
        }

        public awake() {
            let render = this.render;
            render.on(egret.TouchEvent.TOUCH_TAP, this.onSkinTouch, this)
        }

        public sleep() {
            let render = this.render;
            render.off(egret.TouchEvent.TOUCH_TAP, this.onSkinTouch, this)
        }

        private onSkinTouch() {

        }

        private render: sui.Image;

        public setData(value: number) {
            super.setData(value);
            if (!value) return;
            let render = this.render;
            let cfg = getInstance(HeroDB).getCfgById(value);
            render.source = game.ResPrefix.Card + CPath.head + $appendPNG((cfg.id + "").zeroize(5));
        }
    }
}