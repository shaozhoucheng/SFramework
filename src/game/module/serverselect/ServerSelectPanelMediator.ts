module core.game {
    export class ServerSelectPanelMediator extends mvc.Mediator {
        constructor() {
            super(ModuleId.ServerSelect);
        }

        public $view: ServerSelectPanel;

        protected init() {
            this.view = new ServerSelectPanel;
            ResizeManager.getInstance().add(this.view, sui.LayoutType.MIDDLE_CENTER);
            //这里加事件关注
        }

        protected afterAllReady() {
            let view = this.$view;
            let list = view.serverList
            list.itemRenderer = ServerItemRender;
            list.useVirtualLayout = true;
            /// 填充数据
            var dsListHeros: Array<Object> = [
                { status: 0, name: "伊文捷琳", ip: "127.0.0.1", port: 9090 },
                { status: 1, name: "亚特伍德", ip: "127.0.0.1", port: 9090 },
                { status: 2, name: "伊妮德2", ip: "127.0.0.1", port: 9090 },
                { status: 3, name: "伊妮德3", ip: "127.0.0.1", port: 9090 },
                { status: 3, name: "威弗列德", ip: "127.0.0.1", port: 9090 },
                { status: 2, name: "鲁宾", ip: "127.0.0.1", port: 9090 },
                { status: 1, name: "威弗列德2", ip: "127.0.0.1", port: 9090 },
                { status: 1, name: "史帝文", ip: "127.0.0.1", port: 9090 },
                { status: 0, name: "哈瑞斯", ip: "127.0.0.1", port: 9090 },
                { status: 3, name: "史帝文2", ip: "127.0.0.1", port: 9090 }
            ];
            list.dataProvider = new eui.ArrayCollection(dsListHeros);
        }

        public awake() {
            let view = this.$view;
        }


        public sleep() {

        }
    }
}