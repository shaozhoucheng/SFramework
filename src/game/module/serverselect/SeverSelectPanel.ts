module shao.game {
    export class ServerSelectPanel extends sui.Panel {

        public serverList:eui.List;

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/serverselect/serverselect.exml";
            this._key = "serverselect"
            // this._thmName = "serverselect/serverselect_thm.json"
        }
    }
}