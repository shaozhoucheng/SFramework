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
            im.on(egret.TouchEvent.TOUCH_END, this.onEndTouch, this);
            // im.on(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onReleaseTouch, this);
        }

        private build: sui.Image

        // private onReleaseTouch() {
        //     console.log("release")
        //     this.scaleX = this.scaleY = 1
        // }

        // private onBeginTouch(evt: egret.TouchEvent) {
        //     console.log("begin" + evt.currentTarget.parent.index)
        //     this.scaleX = this.scaleY = 0.8
        // }

        private onEndTouch(evt: egret.TouchEvent) {
            console.log("end " + evt.currentTarget.parent.index)
            this.scaleX = this.scaleY = 1
        }

        private onSkinTouch() {
            // console.log("click")
            
        }

        public setData(value: BuildVO) {
            super.setData(value);
            // if (!value) return;
            this.build.source = game.ResPrefix.Building + $appendPNG("institution_000.png");
        }
    }
}