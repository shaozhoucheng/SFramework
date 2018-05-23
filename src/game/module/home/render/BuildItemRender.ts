module shao.game {
    export class BuildItemRender extends sui.ListItemRender<BuildVO>{
        public constructor() {
            super();
        }

        protected bindComponent() {
            super.bindComponent();
            let im = this.build = new sui.Image;
            im.touchEnabled = true;
            im.pixelHitTest = true
            this.addChild(im)
            im.on(egret.TouchEvent.TOUCH_TAP, this.onSkinTouch, this);
            // im.on(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouch, this);
            // im.on(egret.TouchEvent.TOUCH_END, this.onEndTouch, this);
            // im.on(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onReleaseTouch, this);
        }

        private build: sui.Image

        private ani: game.AniRender;

        // private onReleaseTouch() {
        //     console.log("release")
        //     this.scaleX = this.scaleY = 1
        // }

        // private onBeginTouch(evt: egret.TouchEvent) {
        //     console.log("begin" + evt.currentTarget.parent.index)
        //     this.scaleX = this.scaleY = 0.8
        // }

        private onEndTouch(evt: egret.TouchEvent) {
            let target: egret.IEventDispatcher = evt.target as egret.IEventDispatcher;
            if (target == this.build) return;
            console.log("end " + evt.currentTarget.parent.index)
            this.scaleX = this.scaleY = 1
        }

        private onSkinTouch() {
            // console.log("click")
            let data = this._data;
            let cfg = getInstance(JianZhuDB).getCfgById(data.bid)
            if (cfg.type == 11) {//build
                $facade.toggle(ModuleId.Build, 1);
            } else if (cfg.type == 13) {

            } else if (cfg.type == 14) {

            } else if (cfg.type == 13) {

            } else {
                // $facade.toggle(ModuleId.BuildDetail, 1);
                $facade.executeMediator(ModuleId.BuildDetail, false, "setData", true, null, data)
            }

        }

        public setData(value: BuildVO) {
            super.setData(value);
            if (!value) return;
            let cfg = getInstance(JianZhuDB).getCfgById(value.bid);
            this.build.source = game.ResPrefix.Building + $appendPNG(cfg.icon);
            let ani = this.ani;
            this.build.visible = true;
            if (ani) {
                ani.displaymc.off(egret.TouchEvent.TOUCH_TAP, this.onSkinTouch, this);
                ani.onRecycle()
                ani = undefined;
            }
            if (value.status == 1) {
                ani = this.ani = AniRender.getAni("Building");
                ani.frameRate = 12;
                ani.play();
                let display = ani.displaymc;
                display.touchEnabled = true;
                this.addChild(display);
                ani.displaymc.on(egret.TouchEvent.TOUCH_TAP, this.onSkinTouch, this); 
                this.build.visible = false;
            }
            if (value.status == 2) {
                if (value.bid >= 4 && value.bid <= 8) {
                    ani = this.ani = AniRender.getAni("institution_running");
                    ani.frameRate = 6;
                    ani.play();
                    let display = ani.displaymc;
                    display.touchEnabled = true;
                    this.addChildAt(display, 0);
                    ani.displaymc.on(egret.TouchEvent.TOUCH_TAP, this.onSkinTouch, this);
                }
            }
        }
    }
}