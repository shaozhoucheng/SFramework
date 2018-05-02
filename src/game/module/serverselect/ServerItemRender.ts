module core.game {
    export class ServerItemRender extends eui.ItemRenderer {

        public label_serverStatus: eui.Label;

        public label_serverName: eui.Label;

        constructor() {
            super();
            // this.skinName = "ServerItemRender";
            this.skinName = "resource/ui/panel/ServerSelect/ServerItemRender.exml";
        }

        protected createChildren(): void {
            super.createChildren();
        }

        protected dataChanged(): void {
            console.log("\tCheckbox:", this.data);
            let render = this;
            let data = this.data;
            render.label_serverStatus.text = data.status;
            render.label_serverName.text = data.name;
        }
    }
}