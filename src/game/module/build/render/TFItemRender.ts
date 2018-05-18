module shao.game {
    export class TFItemRender extends sui.ListItemRender<JianZhuCfg>
    {
        public constructor() {
            super();
            this.skin = this.render = new egret.TextField();
        }

        protected bindComponent() {
            super.bindComponent();
            let render = this.render;
            render.textColor = 0x000000;
            render.$setHeight(22);
            render.verticalAlign = egret.VerticalAlign.MIDDLE
            render.size = 16;
        }

        private render: egret.TextField;

        public setData(value: JianZhuCfg) {
            super.setData(value);
            if (!value) return;
            let render = this.render;
            render.text = value.name
        }

        public setChooseState(value: boolean) {
            let g = this.graphics;
            g.clear();
            if (value) {
                g.beginFill(0x000000, 0.5);
                g.drawRect(0, 0, this.width, this.height);
                g.endFill();
            }

        }

        public get height() {
            return 22;
        }

        public get width() {
            return 120;
        }

    }
}