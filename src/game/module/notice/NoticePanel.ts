module core.game {
    export class NoticePanel extends sui.Panel {

        public bg:eui.Image;

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/Notice/NoticePanel.exml";
            this._key = "ServerSelect"
            this._thmName = "resource/ui/skin/Notice/notice_thm.json"
        }
    }
}