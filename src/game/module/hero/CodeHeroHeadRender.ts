module shao.game {
    export class CodeHeroHeadRender extends eui.Component {

        public hpBar:eui.ProgressBar

        constructor() {
            super();
            this.skinName = "resource/ui/panel/hero/HeroHeadRender.exml";
        }

        protected createChildren(): void {
            super.createChildren();
        }
    }
}