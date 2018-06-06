module shao.game {
    export class LoginPanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/login/login.exml";
            // this.skinName = "resource/ui/panel/login/login.exml";
            this._key = "login"
            // this._thmName = "login/login.thm.json"
        }

        public tab_regist: eui.ToggleButton;
        public tab_login: eui.ToggleButton;
        public loginview: eui.Group;
        public registview: eui.Group;
        public btn_login: sui.SButton;
    }
}