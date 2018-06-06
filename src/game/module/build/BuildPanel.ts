module shao.game{
    export class BuildPanel extends sui.Panel
    {
        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/build/build.exml";
            this._key = "build"
            // this._thmName = "build/build_thm.json"
        }

        public buildname:eui.Label;
        public buildtime:eui.Label;
        public builddes:eui.Label;
        public btn_build:sui.SButton;
        public btn_quit:sui.SButton;
    }
}