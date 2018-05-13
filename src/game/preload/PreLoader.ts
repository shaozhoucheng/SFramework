module shao.game {
    export class PreLoader {
        /**初始化加载
         * 1.加载des.res.json
         * 2.加载resource_ui.json(后面优化成部分ui走preload 进入游戏后再加载resouce_ui.json)
         * 3.加载des.thm.json
         */
        public constructor() {
            let loadUI = getInstance(LoadingUI);
            loadUI.showLoadUI(this.initRES, this);
            mvc.Facade.on(EventConst.DATA_LOCATOR, this.dataParsed, this);
            //szc 屏蔽
            // return;
            // let base = egret["baseParams"];
            // let newPlayer = base["newPlayer"];
            // if (newPlayer) {
            //     mvc.Facade.on(shao.EventConst.NEW_LOADER_START, this.newLoader, this);
            //     //szc 屏蔽
            //     // mvc.Facade.on(BaseService.BEFORE_ENTER_GAME, this.onReshowLoader, this);

            //     // if (DEBUG) {
            //     //     mvc.Facade.on(lingyu.EventConst.DATA_LOCATOR, this.dataParsed, this);
            //     // }
            // } else {
            //     mvc.Facade.on(EventConst.DATA_LOCATOR, this.dataParsed, this);
            // }
        }

        // private newLoader(evt: egret.Event) {
        //     // RES.loadConfig("resource/default.res.json" + "?v=" + Math.random(), "resource/", RES.ResourceItem.TYPE_JSON);
        //     let key = "preload3";
        //     RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete2, this);
        //     RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress2, this);
        //     // RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        //     // RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        //     RES.loadGroup(key);
        // }

        // private onReshowLoader(evt: egret.Event) {
        //     if (!this.reLoaded) {
        //         // this.loadUI.visible = true;
        //     }
        // }

        private _loadFlag: boolean = false;
        private startLoading(e?: egret.Event) {
            this._loadFlag = true;
            PBMessageUtils.structByName = <any>PBMsgDict;
            //初始化模块处理
            let mm = new mvc.ModuleManager();
            $facade.bindModuleManager(mm);
            this.initMoudleChecker();
            let cfgs = DataLocator.getData(game.ConfigKey.GongNeng);
            mm.setCfgs(cfgs);
            mm.registerHandler(0, new ModuleHandler0());
            // Core.stage.addChild(new ServerMainPanel());
            if (this._dataFlag && this._loadFlag) {
                // $facade.toggle(ModuleId.Login);//打开选服页面
                getInstance(SceneManager).runScene(SceneConst.Login)
            }
        }



        private initMoudleChecker() {
            let mm = $facade.moduleManager;
            let checks: { [index: number]: ModuleChecker };
            checks = {};
            checks[1] = new ModuleChecker();
            mm.checkers = checks;
        }

        // private loadUI: MainLoadUI;

        private defaultTime: number;

        public initRES() {
            // this.defaultTime = Date.now();
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            if (DEBUG) {
                RES.loadConfig("resource/default.res.json", "resource/");
            } else {
                // RES.loadConfig(Core.domain + "/resource/default.res.json" + "?v=" + Math.random(), Core.domain + "/resource/", RES.ResourceItem.TYPE_JSON);
            }
        }

        private onConfigComplete(event: RES.ResourceEvent): void {
            // let base = egret["baseParams"];
            // let newFlag = base["newPlayer"];
            // let key;
            // if (newFlag) {
            //     key = "preload2";
            // } else {
            //     key = "preload";
            // }
            // key = "preload";
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadGroupComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup("preload");
        }

        private onPreloadGroupComplete() {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadGroupComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onUIResComplete, this);
            RES.loadConfig("resource/resource_ui.json", "resource/");
        }

        private onUIResComplete() {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onUIResComplete, this);
            let theme = new eui.Theme("resource/default.thm.json", Core.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                this.onResourceLoadComplete();
            }, this);
        }


        private onResourceProgress(event: RES.ResourceEvent) {
            let item = event.resItem;
            // let desType = item.data.des;
            let progress = event.itemsLoaded / event.itemsTotal * 100;
            // let showString = `正在加载${[desType]}`
            // let totalString = `正在加载第${[event.itemsLoaded]}个，共${[event.itemsTotal]}个`;
            // this.loadUI.showDesc(totalString + showString);
            getInstance(LoadingUI).showProgress(event.itemsLoaded, event.itemsTotal);

            // ConfigUtils.setPreloadRes(item.url, item.name);
            // let pro = $Int((event.itemsLoaded/event.itemsTotal)*100);
            // if(RELEASE){
            //      reportProgress(pro);
            // }

        }

        // private onResourceProgress2(event: RES.ResourceEvent) {
        //     let item = event.resItem;
        //     // let desType = item.data.des;
        //     // let showString = `正在加载${[desType]}`
        //     // let totalString = `正在加载第${[event.itemsLoaded]}个，共${[event.itemsTotal]}个`;
        //     // this.loadUI.showDesc(totalString + showString);
        //     // this.loadUI.showProgress(event.itemsLoaded, event.itemsTotal);
        //     ConfigUtils.setPreloadRes(item.url, item.name);
        // }



		/**
	   * preload资源组加载完成
	   * Preload resource group is loaded
	   */
        private onResourceLoadComplete(event?: RES.ResourceEvent): void {

            // let base = egret["baseParams"];
            // let newPlayer = base["newPlayer"];
            // if (!newPlayer) {
            //     // removeDisplay(this.loadUI);
            // } else {
            //     // this.loadUI.visible = false;
            // }

            removeDisplay(getInstance(LoadingUI));
            let m = document.getElementById("Main");
            if (m) {
                m.style.backgroundImage = "";
            }

            //前期事件管理器（启动游戏后，不建议使用)
            // FacadeInterest.getInstance().start();
            //解析配置数据
            let gameRes = RES.getRes("game");
            game.initData();
            shao.ConfigUtils.setData(gameRes);
            var ConfigKey = game.ConfigKey;
            // NameUtils.loadNameLib(gameRes.params.nameLib);
            // WordFilter.loadDirtyWord(gameRes.params.dirty);
            // LangUtil.loadCode(gameRes.params.code);
            // DataLocator.regParser(ConfigKey.MAP, MapConfigParser);
            // DataLocator.regParser(ConfigKey.PST, PstConfigParser);
            // DataLocator.regParser(ConfigKey.ANI, AniConfigParser);
            // ResourceManager.init();

            // sui.SuiResManager.getInstance().setInlineData("lib", RES.getRes("s_libs"));
            // if (!newPlayer) {
            //配置cfgs
            DataLocator.parsePakedDatas();
            // } else {
            //     //配置数据特殊处理
            //     DataLocator.parseRegiest();
            //     this._dataFlag = true;
            //     this.startLoading();
            // }
        }

        // private reLoaded: boolean = false;
        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        // private onResourceLoadComplete2(event: RES.ResourceEvent): void {
        //     this.reLoaded = true;
        //     DataLocator.parsePakedDatas();
        //     // removeDisplay(this.loadUI);
        // }

        private _dataFlag: boolean = false;
        private dataParsed(e: egret.Event) {
            this._dataFlag = true;
            this.startLoading();
        }

        private onResourceLoadError(event: RES.ResourceEvent): void {
            ThrowError("Group:" + event.groupName + " has failed to load");
            this.onResourceLoadComplete(event);
        }

		/**
	   * 资源组加载出错
	   *  The resource group loading failed
	   */
        private onItemLoadError(event: RES.ResourceEvent): void {
            ThrowError("Url:" + event.resItem.url + " has failed to load");
        }
    }
}