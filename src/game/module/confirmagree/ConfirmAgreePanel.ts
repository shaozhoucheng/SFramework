module shao.game {
    export class ConfirmAgreePanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/confirmagree/confirmagree.exml";
            this._key = "confirmagree"
            // this._thmName = "confirmagree/confirmagree_thm.json"
        }

        public btn_agree: sui.SButton;
        public txt_confirm: eui.Label;
    }
}