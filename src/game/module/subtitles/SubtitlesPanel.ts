module shao.game {
    export class SubtitlesPanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/subtitles/SubtitlesPanel.exml";
            // this.skinName = "LoginPanel";
            this._key = "Subtitles"
            this._thmName = "resource/ui/skin/subtitles/subtitles_thm.json"
        }

        public btn_start: sui.SButton;
        public maskRect: eui.Rect;
        public animImage: eui.Image;
    }
}