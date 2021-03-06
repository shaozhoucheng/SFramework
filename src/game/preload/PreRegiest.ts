module shao.game {
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
            facade.registerInlineMediator(StoryPanelMediator, ModuleId.Story)
            facade.registerInlineMediator(TopPanelMediator, ModuleId.Top)
            facade.registerInlineMediator(HomePanelMediator, ModuleId.Home)
            facade.registerInlineMediator(BuildPanelMediator, ModuleId.Build)
            facade.registerInlineMediator(BuildDetailPanelMediator, ModuleId.BuildDetail)
            facade.registerInlineMediator(FriendPanelMediator, ModuleId.Friend)
            facade.registerInlineMediator(HeroPanelMediator, ModuleId.Hero)
            facade.registerInlineMediator(MapPanelMediator, ModuleId.Map)

            //注册服务
            // facade.registerInlineProxy(LoginService,ServiceName.LoginService);
            // facade.registerInlineProxy(ItemsService,ServiceName.ItemsService);



            //绑定面板处理器和功能标识

            //以下是运营活动面板


        }
    }
}