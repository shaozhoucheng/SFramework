module core.game {
    export class PreRegiest {
        public constructor() {
            this.initREG();
        }

        public initREG() {

            let now = Date.now();

            // PBMessageUtils.structByName = <any>PBMsgDict;
            let facade = $facade;
            // //初始化模块处理
            // let mm = new mvc.ModuleManager();
            // facade.bindModuleManager(mm);
            // this.initMoudleChecker();
            // let cfgs = DataLocator.getData(game.ConfigKey.GongNeng);
            // mm.setCfgs(cfgs);

            // mm.registerHandler(0, new ModuleHandler0());

            //注册服务
            // facade.registerInlineProxy(LoginService,ServiceName.LoginService);
            // facade.registerInlineProxy(ItemsService,ServiceName.ItemsService);


            
            //绑定面板处理器和功能标识
            
            //以下是运营活动面板


        }
    }
}