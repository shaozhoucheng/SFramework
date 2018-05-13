module shao.game {
    import IModuleCfg = mvc.IModuleCfg;
	/**
	 *
	 * @author builder
	 *
	 */
    export class ModuleHandler0 extends mvc.ModuleHandler {
        public constructor() {
            super();
        }

		/**
		 * 打开某个模块
		 * @param cfg
		 */
        public open(cfg: IModuleCfg, ...args): void {
            //找到指定模块，并打开面板
            $facade.getMediator(cfg.id, this._showMediator, this, cfg, args);
        }

        private _showMediator(mediator: mvc.Mediator, args: any[]) {
            let cfg: IModuleCfg = args[0];
            let params = args[1];
            let preModuleID = params[0];
            let view: sui.Panel = mediator.view as sui.Panel;
            if (preModuleID) {
                view.preModuleID = preModuleID;
            }
            let layer = game.GameEngine.instance.getLayer(cfg.containerID);
            if (layer) {
                view.show(layer);
            } else {
                console.log("mediator " + mediator.name + "without the layer");
            }
        }

        public close(cfg: IModuleCfg): void {
            //找到指定模块，并打开面板
            $facade.getMediator(cfg.id, this._hideMediator, this, cfg);
        }

        private _hideMediator(mediator: mvc.Mediator, args: any[]) {
            let view: sui.Panel = mediator.view as sui.Panel;
            view.hide();
        }
    }
}
