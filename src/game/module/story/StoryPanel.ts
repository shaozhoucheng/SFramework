module shao.game {
    export class StoryPanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/story/story.exml";
            // this._key = "Login"
            // this._thmName = "story/story_thm.json"
        }

        public txt_talk:eui.Label;
        public btn_next:sui.SButton;
        public btn_next2:sui.SButton;
    }
}