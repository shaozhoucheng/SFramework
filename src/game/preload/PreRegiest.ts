module core.game {
    export class PreRegiest {
        public constructor() {
            this.initREG();
        }

        public initREG() {
            let facade = $facade;
            // //初始化模块处理
            facade.registerInlineMediator(ServerSelectPanelMediator, ModuleId.ServerSelect)
            facade.registerInlineMediator(NoticePanelMediator, ModuleId.Notice)
            facade.registerInlineMediator(ConfirmAgreePanelMediator, ModuleId.ConfirmAgree)
            facade.registerInlineMediator(CreateRolePanelMediator, ModuleId.CreateRole)
            facade.registerInlineMediator(SubtitlesPanelMediator, ModuleId.Subtitles)

            //注册服务
            // facade.registerInlineProxy(LoginService,ServiceName.LoginService);
            // facade.registerInlineProxy(ItemsService,ServiceName.ItemsService);


            
            //绑定面板处理器和功能标识
            
            //以下是运营活动面板


        }
    }
}