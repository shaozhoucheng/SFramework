module core.game {
    export class LoginPanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/Login/LoginPanel.exml";
            // this.skinName = "LoginPanel";
            this._key = "Login"
            this._thmName = "resource/ui/skin/Login/login_thm.json"
        }

        public tab_regist:eui.ToggleButton;
        public tab_login:eui.ToggleButton;
        public loginview:eui.Group;
        public registview:eui.Group;
        public btn_login:sui.SButton;
    }
}