module shao.game {
    export class CodeServerItemRender extends eui.Component {

        public label_serverStatus: eui.Label;

        public label_serverName: eui.Label;

        constructor() {
            super();
            this.skinName = "resource/ui/panel/serverselect/serveritemrender.exml";
        }

        protected createChildren(): void {
            super.createChildren();
        }
    }
}