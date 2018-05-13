module shao.game {
    export class ServerSelectPanel extends sui.Panel {

        public serverList:eui.List;

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/serverselect/ServerSelectPanel.exml";
            this._key = "ServerSelect"
            this._thmName = "resource/ui/skin/serverselect/serverselect_thm.json"
        }
    }
}