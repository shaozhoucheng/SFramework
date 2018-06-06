module shao.game {
    export class CreateRolePanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/createrole/createrole.exml";
            // this.skinName = "LoginPanel";
            this._key = "createrole"
            // this._thmName = "createrole/createrole_thm.json"
        }
        public btn_goto:sui.SButton;
    }
}