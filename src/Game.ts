module core.game {
export class Game extends egret.DisplayObjectContainer {
        constructor() {
            super();
            egret.ImageLoader.crossOrigin = "anonymous";
            //szc 屏蔽
            // lingyu.Global.initTick();
            this.on(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            RES.setMaxLoadingThread (4);
        }

        private onAddToStage(event: egret.Event) {
            let stage = this.stage;
            // stage.dirtyRegionPolicy = "off";
            // ResizeManager.getInstance().init(stage);
            $facade = new mvc.Facade();
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

        private failHandler() {
            // $reportGameStep(gameReport.SOCKET_CONN_FAIL);
        }
    }
}