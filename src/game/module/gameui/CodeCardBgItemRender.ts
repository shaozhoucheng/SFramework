module shao.game {
    export class CodeCardBgItemRender extends eui.Component {

        public txt_gong: eui.BitmapLabel;
        public txt_fang: eui.BitmapLabel;
        public txt_su: eui.BitmapLabel;
        public txt_de: eui.BitmapLabel;
        public txt_ce: eui.BitmapLabel;
        public hpProgress: eui.ProgressBar;

        constructor() {
            super();
            this.skinName = "resource/ui/panel/gameui/CardBackground.exml";
        }

        protected createChildren(): void {
            super.createChildren();
        }
    }
}