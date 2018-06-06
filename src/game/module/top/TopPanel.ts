module shao.game {
    export class TopPanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/top/top.exml";
            this._key = "top"
            // this._thmName = "top/top_thm.json"
        }
        public btn_home: sui.SButton;
        public btn_map: sui.SButton;
        public btn_hero: sui.SButton;
        public btn_rank: sui.SButton;
        public btn_mail: sui.SButton;
        public txt_huo: eui.Label;
        public txt_di: eui.Label;
        public txt_feng: eui.Label;
        public txt_shui: eui.Label;
        public txt_kong: eui.Label;
        public txt_liang: eui.Label;
        public txt_add: eui.Label;
        public txt_money: eui.Label;
        public txt_message: eui.Label;
        public group_hero: eui.Group;
        public group_rank: eui.Group;
        public btn_wujiangku: sui.SButton;
        public btn_qianghua: sui.SButton;
        public btn_shop: sui.SButton;
        public btn_hezhan: sui.SButton;
        public btn_daochang: sui.SButton;
        public btn_gongcheng: sui.SButton;
        public btn_daming: sui.SButton;
    }
}