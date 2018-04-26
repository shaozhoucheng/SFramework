module core.game {
    export class LoginPanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/LoginPanel.exml";
            this._key = "Login"
        }

        public tab_regist:eui.ToggleButton;
        public tab_login:eui.ToggleButton;
    }
}