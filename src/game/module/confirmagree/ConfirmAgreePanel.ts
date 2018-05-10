module core.game {
    export class ConfirmAgreePanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/ConfirmAgree/ConfirmAgreePanel.exml";
            this._key = "ConfirmAgree"
            this._thmName = "resource/ui/skin/ConfirmAgree/confirmagree_thm.json"
        }

        public btn_agree: sui.SButton;
        public txt_confirm: eui.Label;
    }
}