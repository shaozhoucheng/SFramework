module core.game {
export class Game extends egret.DisplayObjectContainer {
        constructor() {
            super();
            egret.ImageLoader.crossOrigin = "anonymous";
            core.Global.initTick();
            this.on(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            RES.setMaxLoadingThread (4);
        }

        private onAddToStage(event: egret.Event) {
            egret.lifecycle.addLifecycleListener((context) => {
                // custom lifecycle plugin
            })

            egret.lifecycle.onPause = () => {
                egret.ticker.pause();
            }

            egret.lifecycle.onResume = () => {
                egret.ticker.resume();
            }

            //inject the custom material parser
            //注入自定义的素材解析器
            let assetAdapter = new AssetAdapter();
            egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


            this.runGame().catch(e => {
                console.log(e);
            })
        }

        private async runGame() {
            await this.loadResource()
            this.createGameScene();
            // const result = await RES.getResAsync("description_json",null,this)
            // await platform.login();
            // const userInfo = await platform.getUserInfo();
            // console.log(userInfo);

        }

        private createGameScene()
        {
            
            let stage = this.stage;
            // stage.dirtyRegionPolicy = "off";
            ResizeManager.getInstance().init(stage);
            $facade = new mvc.Facade();
            // $facade.registerInlineMediator(ServerMainPanelMediator, ModuleId.Servers);
            $facade.registerInlineMediator(LoginPanelMediator, ModuleId.Login);
            Core.stage = stage;
            // sui.Panel.WIDTH = stage.stageWidth;
            // sui.Panel.HEIGHT = stage.stageHeight;

            game.GameEngine.init(stage);
            // let engine = game.GameEngine.instance;
            // let camera = new game.Camera();
            // engine.camera = camera;
            // stage.on(egret.Event.RESIZE, () => {
            //     camera.setSize(stage.stageWidth, stage.stageHeight);
            //     sui.Panel.WIDTH = stage.stageWidth;
            //     sui.Panel.HEIGHT = stage.stageHeight;
            // }, this)
            // let scale = devicePixelRatio;
            // console.log(scale);
           
            // Core.domain = param.domain;
            // Core.loader = param.loader;
            // mvc.Facade.on(core.NetEvent.WEB_COMPLETE, this.connectHandler, this);
            // mvc.Facade.on(core.NetEvent.WEB_FAILED, this.failHandler, this);
            new PreLoader();
        }

        private async loadResource() {
            try {
                // const loadingView = new LoadingUI();
                // this.stage.addChild(loadingView);
                await RES.loadConfig("resource/default.res.json", "resource/");
                await RES.loadConfig("resource/resource_ui.json", "resource/");
                await this.loadTheme();
                await RES.loadGroup("preload");
                // this.stage.removeChild(loadingView);
            }
            catch (e) {
                console.error(e);
            }
        }

        private loadTheme() {
            return new Promise((resolve, reject) => {
                // load skin theme configuration file, you can manually modify the file. And replace the default skin.
                //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
                let theme = new eui.Theme("resource/default.thm.json", this.stage);
                theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                    resolve();
                }, this);
            })
        }

        private failHandler() {
            // $reportGameStep(gameReport.SOCKET_CONN_FAIL);
        }
    }
}