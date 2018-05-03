module core.game {
    export class ServerSelectPanelMediator extends mvc.Mediator {
        constructor() {
            super(ModuleId.ServerSelect);
        }

        public $view: ServerSelectPanel;

        private list: sui.PageList<ServerVO, ServerItemRender>;

        protected init() {
            this.view = new ServerSelectPanel;
            ResizeManager.getInstance().add(this.view, sui.LayoutType.MIDDLE_CENTER);
            //这里加事件关注
        }

        protected afterAllReady() {
            let view = this.$view;
            let itemList = this.list = new sui.PageList<ServerVO, ServerItemRender>(ServerItemRender, 445, 110);
            view.addChild(itemList);
            let scroller: sui.Scroller = new sui.Scroller();
            let rect = new egret.Rectangle(0, 0, 660, 780);
            scroller.bindObj(this.list, rect);
            // let list = view.serverList
            // list.itemRenderer = ServerItemRender;
            // list.useVirtualLayout = true;
            // /// 填充数据
            // var dsListHeros: Array<Object> = [
            //     { status: 0, name: "伊文捷琳", ip: "127.0.0.1", port: 9090 },
            //     { status: 1, name: "亚特伍德", ip: "127.0.0.1", port: 9090 },
            //     { status: 2, name: "伊妮德2", ip: "127.0.0.1", port: 9090 },
            //     { status: 3, name: "伊妮德3", ip: "127.0.0.1", port: 9090 },
            //     { status: 3, name: "威弗列德", ip: "127.0.0.1", port: 9090 },
            //     { status: 2, name: "鲁宾", ip: "127.0.0.1", port: 9090 },
            //     { status: 1, name: "威弗列德2", ip: "127.0.0.1", port: 9090 },
            //     { status: 1, name: "史帝文", ip: "127.0.0.1", port: 9090 },
            //     { status: 0, name: "哈瑞斯", ip: "127.0.0.1", port: 9090 },
            //     { status: 3, name: "史帝文2", ip: "127.0.0.1", port: 9090 }
            // ];
            // list.dataProvider = new eui.ArrayCollection(dsListHeros);
            let datas = this.testListData = [];

            for (let i = 0; i <= 10; i++) {
                let vo = new ServerVO;
                vo.status = i;
                vo.name = "史帝文" + i;
                vo.ip = "127.0.0.1"
                vo.port = 9090
                datas.push(vo)
            }
        }
        private testListData: ServerVO[];

        public awake() {
            let view = this.$view;
            this.list.displayList(this.testListData);
        }


        public sleep() {

        }
    }
}