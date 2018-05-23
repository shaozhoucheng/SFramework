module shao.game {
    export class HeroHeadRender extends sui.ListItemRender<HeroVO>{

        public constructor() {
            super();
            this.skin = this.render = new CodeHeroHeadRender();
        }

        private headImg: sui.Image;
        private armyImg: sui.Image;
        private eleImg: sui.Image;
        private minImg: sui.Image;

        protected bindComponent() {
            super.bindComponent();
            let im = this.headImg = new sui.Image;
            // im.touchEnabled = true;
            this.addChild(im);
            im.x = 13;
            im = this.armyImg = new sui.Image;
            this.addChild(im);
            im.y = 50; im.x = 10;
            im = this.eleImg = new sui.Image;
            this.addChild(im);
            im.y = 48; im.x = 60;
            im = this.minImg = new sui.Image;
            im.scaleX = im.scaleY = 0.8
        }

        public awake() {
            let render = this.render;
            let im = this.headImg;
            this.touchEnabled = true;
            // im.on(egret.TouchEvent.TOUCH_TAP, this.onHeadTouch, this)
            this.on(egret.TouchEvent.TOUCH_BEGIN, this.onHeadTouchBegin, this)
            // this.on(egret.TouchEvent.TOUCH_END, this.onHeadTouchEnd, this)
            // this.on(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onHeadTouchRelease, this)
            // this.on(egret.TouchEvent.TOUCH_MOVE, this.onHeadTouchMove, this)
        }

        private onHeadTouch(evt: egret.TouchEvent) {

        }

        // private onHeadTouchRelease(evt?: egret.TouchEvent) {
        //     removeDisplay(this.minImg)
        // }

        private onHeadTouchBegin(evt: egret.TouchEvent) {
            let data = this._data;
            this.minImg.source = game.ResPrefix.Card + CPath.head + $appendPNG((data.hid + "").zeroize(5));
            this.stage.addChild(this.minImg)
            console.log(data.hid + " begin");
            this.stage.on(egret.TouchEvent.TOUCH_MOVE, this.onHeadTouchMove, this);
            this.stage.on(egret.TouchEvent.TOUCH_END, this.onHeadTouchEnd, this)
            this.stage.on(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onHeadTouchEnd, this)
        }

        private onHeadTouchEnd(evt: egret.TouchEvent) {
            // this.onHeadTouchRelease();
            removeDisplay(this.minImg)
            this.stage.off(egret.TouchEvent.TOUCH_MOVE, this.onHeadTouchMove, this);
            this.stage.off(egret.TouchEvent.TOUCH_END, this.onHeadTouchEnd, this)
            this.stage.off(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onHeadTouchEnd, this)
            let target: egret.IEventDispatcher = evt.target as egret.IEventDispatcher;
            if (target instanceof HeroHeadRender) {
                return;
            }

            let tparent = evt.target.parent;
            if (tparent instanceof BuildItemRender) {
                let data = tparent.getData();
                if (data.status != 0) return;
                // let cfg = getInstance(JianZhuDB).getCfgById(data.bid);
                if (data.bid >= 4 && data.bid <= 8) {//模拟下升级建筑
                    data.status = 2
                    tparent.setData(data);
                }
            }
        }

        private onHeadTouchMove(evt: egret.TouchEvent) {
            this.minImg.x = evt.stageX
            this.minImg.y = evt.stageY
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