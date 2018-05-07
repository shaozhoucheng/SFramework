module core.game {
    export class LoadingUI extends egret.Sprite {

        private _textField: egret.TextField;
        private _bg: egret.Bitmap;
        private _bgLoad: egret.ImageLoader;

        private _testurl: string = "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3588772980,2454248748&fm=27&gp=0.jpg";


		/**
		 * 异步的Helper 加载完界面在执行操作
		 */
        protected _asyncHelper: mvc.AsyncHelper;
        private _isReady: boolean = false;

        public constructor() {
            super();
            this.init();
        }

        private init() {
            this._textField = new egret.TextField();
            this.addChild(this._textField);
            this._textField.y = 300;
            this._textField.width = 480;
            this._textField.height = 100;
            this._textField.textAlign = "center";
            game.GameEngine.instance.getLayer(game.GameLayerID.Out).addChild(this);
            let loader = this._bgLoad = new egret.ImageLoader;
            loader.on(egret.Event.COMPLETE, this.onBgResLoadComplete, this);
            loader.load(this._testurl)
        }

        private onBgResLoadComplete(evt: egret.Event) {
            let texture = new egret.Texture();
            texture._setBitmapData(evt.currentTarget.data);
            let bg = this._bg = new egret.Bitmap(texture);
            this._bgLoad.off(egret.Event.COMPLETE, this.onBgResLoadComplete, this);
            this.addChildAt(bg, 0);
            this._isReady = true;
            if (this._asyncHelper) {
                this._asyncHelper.readyNow();
            }
        }

        public addReadyExecute(handle: Function, thisObj: any, ...args) {
            let _asyncHelper = this._asyncHelper;
            if (!_asyncHelper) {
                this._asyncHelper = _asyncHelper = new mvc.AsyncHelper();
                _asyncHelper._ready = this._isReady;
            }
            _asyncHelper.addReadyExecute(handle, thisObj, args);
        }


        /**
		 * 显示加载进度面板
		 * 
		 * @param {Function} callBack
		 * @param {*} thisObj
		 * @returns
		 * 
		 * @memberOf MainLoadUI
		 */
        public showLoadUI(callBack: Function, thisObj: any) {
            if (!this._isReady) {
                this.addReadyExecute(this.showLoadUI, this, callBack, thisObj);
                return;
            }

            if (callBack) {
                callBack.call(thisObj);
            }
        }

        /**
		 * 进度
		 * 
		 * @param {number} value
		 * @param {number} max
		 * 
		 * @memberOf MainLoadUI
		 */
        public showProgress(value: number, max: number) {
            this._textField.text = value + "/" + max;
        }
    }
}