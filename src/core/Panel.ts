module lingyu.sui {
	/**
	 * 模块面板
	 * @author builder
	 *
	 */
    export abstract class Panel extends TStatePanel implements ISuiDataCallback, mvc.IAsyncPanel {

        public layoutType: number;
        /**
         * 面板宽度
         * 
         * @static
         * @type {number}
         */
        public static WIDTH: number = 720;
        /**
         * 面板高度
         * 
         * @static
         * @type {number}
         */
        public static HEIGHT: number = 1280;
        /**
         * 模态颜色
         * 
         * @static
         * @type {number}
         */
        public static MODAL_COLOR: number = 0x000000;
        /**
         * 模态透明度
         * 
         * @static
         * @type {number}
         */
        public static MODAL_ALPHA: number = 0.2;

        /**
        * 异步的Helper
        */
        protected _asyncHelper: mvc.AsyncHelper;
        /**
         * 模块ID
         */
        public moduleID: string;

        /**
         * 打开该模块的模块ID
         * 
         * @type {string}
         * @memberOf Panel
         */
        public preModuleID: string;
        /**
         * 面板在fla中的原始坐标
         * 
         * @protected
         * @type {egret.Rectangle}
         */
        protected _baseRect: egret.Rectangle;
        /**
         * 
         * 面板在fla中的原始坐标
         * @readonly
         * 
         * @memberOf Panel
         */
        public get baseRect() {
            return this._baseRect;
        }

        /**修改界面大小 */
        public resizeBaseRect(w: number, h: number) {
            this._baseRect.width = w;
            this._baseRect.height = h;
        }
        /**
         * 自己的key(fla的文件名)
         */
        protected _key: string;
        /**
         * 依赖的除lib,自己以外的其他fla
         */
        protected _otherDepends: string[];
        protected _className: string;
        /**
         * 所有依赖的fla资源
         * 
         * @protected
         * @type {string[]}
         */
        protected _depends: string[];

        protected _ready: boolean;
        /**
         * 模态
         * 
         * @protected
         * @type {egret.Sprite}
         */
        protected modal: egret.Shape;
        /**
         * 是否模态
         * 
         * @type {number}
         */
        private _isModal: boolean;
        /**
         * 是否可关闭
         * 
         * @private
         * @type {boolean}
         * @memberOf Panel
         */
        private _closable: boolean;
        /**
         * 是否可显示帮助
         * 
         * @private
         * @type {boolean}
         * @memberOf Panel
         */
        private _helpable: boolean;

        public constructor() {
            super();
            this.init();
            this.touchEnabled = true;
            this.on(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
        }

        public get isReady() {
            return this._ready;
        }

        public addReadyExecute(handle: Function, thisObj: any, ...args) {
            let _asyncHelper = this._asyncHelper;
            if (!_asyncHelper) {
                this._asyncHelper = _asyncHelper = new mvc.AsyncHelper();
                _asyncHelper._ready = this.isReady;
            }
            _asyncHelper.addReadyExecute(handle, thisObj, args);
        }

        protected init() {
            //this._key=xxxx
            //this._className=xxxx
            //this._otherDepends=[other...];
        }

        public startSync() {
            if (this._otherDepends) {
                this._depends = this._otherDepends.concat();
            } else {
                this._depends = [];
            }
            this._depends.push(this._key);
            this.loadNext();
        }

        doScale(scale: number) {

            if (!this._scaled) {
                this.scaleX = this.scaleY = scale;
                this._scaled = true;
            }
            let offSet = 1 - scale
            let offH = Math.round(offSet * this.width);
            let offV = Math.round(offSet * this.height);
            return { offH, offV };
        }

        protected loadNext() {
            if (this._depends.length) {
                var key = this._depends.pop();
                var suiManager = SuiResManager.getInstance();
                suiManager.loadData(key, this);
            }
            else {
                this.skinDataComplete();
            }
        }

        public suiDataComplete(suiData: SuiData): void {
            this.loadNext();
        }

        public suiDataFailed(suiData: SuiData): void {
            //暂时用alert
            alert(this._className + "加载失败");
        }

		/**
		 * 绑定皮肤
		 */
        protected abstract bindComponents();

		/**
		 * 皮肤数据加载完成
		 */
        protected skinDataComplete() {
            this.bindComponents();
            if (this["bg"]) {
                this["bg"].touchEnabled = true;
            }
            if (this["closeBtn"]) {
                this.closable = true;
            }
            if (this["helpBtn"]) {
                this.helpable = true;
            }
            if (this["returnBtn"]) {
                this.returnable = true;
            }
            this._ready = true;
            if (this._asyncHelper) {
                this._asyncHelper.readyNow();
            }


        }

        public get helpable(): boolean {
            return this._helpable;
        }

        public set helpable(value: boolean) {
            this._helpable = value;
            if (value && this["helpBtn"]) {
                this["helpBtn"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.showHelp, this);
            }
            else if (this["helpBtn"]) {
                this["helpBtn"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showHelp, this);
            }

        }

        public get returnable(): boolean {
            return this._helpable;
        }

        public set returnable(value: boolean) {
            this._helpable = value;
            if (value && this["returnBtn"]) {
                this["returnBtn"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.return, this);
            }
            else if (this["returnBtn"]) {
                this["returnBtn"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.return, this);
            }

        }

        public get closable(): boolean {
            return this._closable;
        }

        public set closable(value: boolean) {
            this._closable = value;
            if (value && this["closeBtn"]) {
                this["closeBtn"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            }
            else if (this["closeBtn"]) {
                this["closeBtn"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            }
        }

        public get isModal(): boolean {
            return this._isModal;
        }

        public set isModal(value: boolean) {
            this._isModal = value;
        }

        public get width(): number {
            // if(this.modal){
            //     return Panel.WIDTH;
            // }
            return this._baseRect.width;
        }

        public get height(): number {
            // if(this.modal){
            //     return Panel.HEIGHT;
            // }
            return this._baseRect.height;
        }

        /**
         * 加模态
         * 
         * @protected
         */
        protected addModal(flag: boolean = true,active: boolean = true) {
            if (!this.modal) {
                this.modal = new egret.Shape();
            }
            let m = this.modal;
            m.touchEnabled = true;
            let stage = egret.sys.$TempStage;
            let g = m.graphics;
            g.clear();
            g.beginFill(Panel.MODAL_COLOR, Panel.MODAL_ALPHA);
            g.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
            g.endFill();
            if (active) {
                this.modal.on(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            }
            let index = this.parent.getChildIndex(this);
            this.parent.addChildAt(this.modal, index);
        }

        /**
         * 移除模态
         * 
         * @protected
         */
        protected removeModal() {
            if (this.modal) {
                this.modal.off(egret.TouchEvent.TOUCH_TAP, this.hide, this);
                removeDisplay(this.modal);
            }
        }

        protected showHelp(event?: egret.Event) {
            let f = $facade;
            let mm = f.moduleManager;
            let cfg = mm.getCfg(this.moduleID);
            if (cfg.help) {
                $facade.executeMediator("Help", false, "setData", true, undefined, cfg.help);
            }
        }

        public return(e?: egret.TouchEvent) {

            if (this.preModuleID) {
                $facade.toggle(this.preModuleID, 1);
            }
            if (event) {
                event.stopPropagation();
            }

            $facade.toggle(this.moduleID, 0);
        }

        private _scaled: boolean = false;
        private _showing: boolean = false;
        public show(container?: egret.DisplayObjectContainer) {

            let f = $facade;
            let mm = f.moduleManager;
            let cfg = mm.getCfg(this.moduleID);

            if (!cfg.help && this["helpBtn"]) {
                this["helpBtn"].visible = false;
            }
            cfg.showState = mvc.ModuleShowState.SHOW;
            if (!container) {
                container = game.GameEngine.instance.getLayer(cfg.containerID);
            }
            this.includeState.awaken();
            if (!this.includeState.checkCanShow(container, true)) return;
            container.addChild(this);
            if (cfg.scale) {
                let off = this.doScale(cfg.scale);
                if (!this._showing) {
                    this.doOffSet(off);
                }
            }
            PanelLimit.add(this.moduleID);
            mvc.Facade.simpleDispatch(EventConst.SIDE_MODULE_SHOW, cfg);
            this._showing = true;
        }

        stageResize() {
            let f = $facade;
            let mm = f.moduleManager;
            let cfg = mm.getCfg(this.moduleID);
            this._scaled = false;
            if (cfg.scale) {
                let off = this.doScale(cfg.scale);
                this.doOffSet(off);
            }

        }

        private doOffSet(off: { offH: number, offV: number }) {
            let layout = this.layoutType;
            //垂直方向
            let vertical = layout & LayoutType.VERTICAL_MASK;
            //水平方向
            let horizon = layout & LayoutType.HORIZON_MASK;
            //先处理y方向
            switch (vertical) {
                case LayoutType.TOP:
                    break;
                case LayoutType.MIDDLE:
                    this.y += off.offV / 2;
                    break;
                case LayoutType.BOTTOM:
                    this.y += off.offV;
                    break;
            }
            //再处理x方向
            switch (horizon) {
                case LayoutType.LEFT:
                    break;
                case LayoutType.CENTER: // 不支持非innerH
                    this.x += off.offH / 2;
                    break;
                case LayoutType.RIGHT:
                    this.x += off.offH;
                    break;
            }
        }

        /**
          * 关闭
          * 
          * @protected
          */
        public hide(event?: egret.Event) {
            // super.hide();
            let f = $facade;
            let mm = f.moduleManager;
            let cfg = mm.getCfg(this.moduleID);
            cfg.showState = mvc.ModuleShowState.HIDE;
            this.includeState.sleep();
            removeDisplay(this);
            PanelLimit.remove(this.moduleID);
            mvc.Facade.simpleDispatch(EventConst.SIDE_MODULE_HIDE, cfg);
            this._showing = false;
        }

        public changeShow(flag: boolean) {
            if (!flag) {
                this._showing = false;
            } else {
                this.show();
            }
        }


        protected addedToStage(e: egret.Event) {
            if (this._isModal) {
                this.addModal(true);
            }
            this.off(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
            this.on(egret.Event.REMOVED_FROM_STAGE, this.removedToStage, this);
        }

        protected removedToStage(e: egret.Event) {
            this.removeModal();
            this.on(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
            this.off(egret.Event.REMOVED_FROM_STAGE, this.removedToStage, this);
            if (this._isModal) {
                this.modal.off(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            }
            this._showing = false;
        }
    }
}
