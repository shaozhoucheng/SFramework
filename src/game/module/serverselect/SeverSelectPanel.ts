module core.game {
    export class ServerSelectPanel extends sui.Panel {

        public serverList:eui.List;

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/ServerSelect/ServerSelectPanel.exml";
            this._key = "ServerSelect"
            this._thmName = "resource/ui/skin/ServerSelect/serverselect_thm.json"
        }
    }
}