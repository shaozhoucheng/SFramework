module shao.game {
    export class NoticePanel extends sui.Panel {

        public bg: eui.Image;

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/notice/NoticePanel.exml";
            // this._key = "Notice"
            this._thmName = "resource/ui/skin/notice/notice_thm.json"
        }
    }
}