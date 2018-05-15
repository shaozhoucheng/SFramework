module shao.game {
    export class CodeCardReverseItemRender extends eui.Component {

        public txt_gong: eui.Label;
        public txt_fang: eui.Label;
        public txt_su: eui.Label;
        public txt_de: eui.Label;
        public txt_ce: eui.Label;
        public txt_totalLevel: eui.Label;
        public txt_meritvalue: eui.Label;
        public txt_name: eui.Label;
        public txt_dialogue: eui.Label;
        public txt_job: eui.Label;
        public txt_realname: eui.Label;
        public txt_introduce: eui.Label;
        public txt_nickname: eui.Label;
        public txt_skillname0: eui.Label;
        public txt_skillname1: eui.Label;
        public txt_skillname2: eui.Label;

        constructor() {
            super();
            this.skinName = "resource/ui/panel/gameui/CardReverse.exml";
        }

        protected createChildren(): void {
            super.createChildren();
        }
    }
}