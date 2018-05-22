module shao.game {
    export class HeroPanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/hero/HeroPanel.exml";
            // this.skinName = "LoginPanel";
            this._key = "Hero"
            this._thmName = "resource/ui/skin/hero/hero_thm.json"
        }

        public tab_0: eui.ToggleButton;
        public tab_1: eui.ToggleButton;
        public tab_2: eui.ToggleButton;
        public tab_3: eui.ToggleButton;
    }
}