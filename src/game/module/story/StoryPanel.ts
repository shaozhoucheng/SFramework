module shao.game {
    export class StoryPanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/story/StoryPanel.exml";
            // this._key = "Login"
            this._thmName = "resource/ui/skin/story/story_thm.json"
        }

        public txt_talk:eui.Label;
        public btn_next:sui.SButton;
    }
}