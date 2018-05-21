module shao.game {
    export class BuildDetailPanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/builddetail/BuildDetailPanel.exml";
            // this.skinName = "LoginPanel";
            this._key = "BuildDetail"
            this._thmName = "resource/ui/skin/builddetail/builddetail_thm.json"
        }

        public group_btns: eui.Group;
        public bg: eui.Image;
        public bgRect: eui.Rect;
        public txt_title: eui.Label;
        public txt_name: eui.Label;
        public txt_des: eui.Label;
        public txt_time: eui.Label;
        public txt_detail: eui.Label;
        public btn_enlarge: sui.SButton;
        public btn_remove: sui.SButton;
        public btn_close: sui.SButton;
    }
}