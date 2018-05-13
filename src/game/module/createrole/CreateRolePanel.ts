module shao.game {
    export class CreateRolePanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/createrole/CreateRolePanel.exml";
            // this.skinName = "LoginPanel";
            this._key = "CreateRole"
            this._thmName = "resource/ui/skin/createrole/createrole_thm.json"
        }
        public btn_goto:sui.SButton;
    }
}