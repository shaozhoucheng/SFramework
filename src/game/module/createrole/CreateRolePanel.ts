module core.game {
    export class CreateRolePanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/CreateRole/CreateRolePanel.exml";
            // this.skinName = "LoginPanel";
            this._key = "CreateRole"
            this._thmName = "resource/ui/skin/CreateRole/createrole_thm.json"
        }

        public tab_regist:eui.ToggleButton;
        public tab_login:eui.ToggleButton;
        public loginview:eui.Group;
        public registview:eui.Group;
        public btn_login:sui.SButton;
    }
}