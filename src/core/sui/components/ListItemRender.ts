module core.sui {

    export interface BaseListItemRender<T> extends egret.Sprite {

        handleView(): void;

        dispose(): void;

        renderView: egret.DisplayObject;

        setData(value: T): void;

        getData(): T;

        setChooseState(value: boolean);

        getChooseState(): boolean;

        refreshData(): void;

        params: any;

        /**是否是第一个 */
        isFirst: boolean;

        /**是否是最后一个 */
        isLast: boolean;
    }

    export class ListItemRender<T> extends egret.Sprite implements BaseListItemRender<T>{

        protected _data: T;

        public dataChange: boolean;

        public skinlib: string;

        public skinClass: string;

        protected _chooseState: boolean;

        protected _defaultWidth: number = 5;

        protected _defalutHeight: number = 5;

        protected _skin: egret.DisplayObject;

        protected _skinTemplete: egret.DisplayObject;

        private _viewChange: boolean = false;

        private _oldWidth: number = -1;

        private _oldHeight: number = -1;

        protected inited: boolean = false;

        /**是否是第一个 */
        public isFirst: boolean;

        /**是否是最后一个 */
        public isLast: boolean;

        public index: number = -1;

        /**
         * 额外参数
         * 
         * @type {*}
         * @memberOf ListItemRenderer
         */
        public params: any;

        public constructor() {
            super();
            this.touchEnabled = true;
            this.on(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.on(egret.Event.ADDED_TO_STAGE, this.checkawake, this);
            this.on(egret.Event.REMOVED_FROM_STAGE, this.checksleep, this);
        }

        /**
         * 子类重写
         * 初始化组件
         * 一定要super调一下
         */
        protected bindComponent() {
            this.inited = true;
            // if (!this._skin) {
            //     if (this.skinlib && this.skinClass) {
            //         this.skin = SuiResManager.getInstance().createDisplayObject(this.skinlib, this.skinClass);
            //     }
            // } else {
            //     if (!this.contains(this._skin)) {
            //         this.addChildAt(this._skin, 0);
            //     }
            // }
            if (!this.contains(this._skin)) {
                this.addChildAt(this._skin, 0);
            }
        }


        private checkawake(e: egret.Event) {
            this.awake();
        }

        /**
         * 子类重写
         * 皮肤添加到舞台时调用
         */
        protected awake() {

        }


        private checksleep(e: egret.Event) {
            this.sleep();
        }
        /**
         * 子类重写
         * 皮肤从舞台移除时调用
         */
        protected sleep() {

        }

        private onTouchTap(e: egret.TouchEvent) {
            this.dispatchEventWith(<any>SuiEvent.ITEM_TOUCH_TAP);
        }

        public setData(value: T) {
            this._data = value;
            if (!this.inited) {
                this.bindComponent();
                this.inited = true;
            }
        }

        public getData() {
            return this._data;
        }

        /**
         * 设置已定位好的皮肤
         * (description)
         */
        public set skinTemplete(value: egret.DisplayObject) {
            this._skinTemplete = value;
            let parent = value.parent;
            this.x = value.x;
            this.y = value.y;
            this.skin = value;
            this._skin.x = 0;
            this._skin.y = 0;
            parent.addChild(this);
        }

        public set skin(value: egret.DisplayObject) {
            this._skin = value;
        }

        public get skin() {
            return this._skin;
        }
        /**
         * 根据数据处理视图
         * 
         * 子类重写
         */
        public handleView() {
            if (this._viewChange == false) {
                this._viewChange = true;
                this.checkViewSize();
            }
        }

        /**
         * force为true时无条件派发一次事件，通知更新坐标
         * 
         * @protected
         * @ param {boolean} [force=false] (description)
         */
        protected checkViewSize(force: boolean = false) {
            this._viewChange = false;
            if (force) {
                this.dispatchEventWith(egret.Event.RESIZE);
            } else {
                if (this._oldHeight != this.height || this._oldWidth != this.width) {
                    this.dispatchEventWith(egret.Event.RESIZE);
                }
            }
            this._oldHeight = this.height;
            this._oldWidth = this.width;
        }

        /**\
         * 
         * 获取视图
         * @readonly
         */
        public get renderView() {
            return this;
        }


        public setChooseState(value: boolean) {
            if (this._chooseState != value) {
                this._chooseState = value;
            }
            this.dispatchEventWith(<any>SuiEvent.CHOOSE_STATE_CHANGE);
        }

        public getChooseState(): boolean {
            return this._chooseState;
        }

        /**
         * 子类重写
         * 销毁组件
         */
        public dispose() {
            this.off(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.off(egret.Event.ADDED_TO_STAGE, this.checkawake, this);
            this.off(egret.Event.REMOVED_FROM_STAGE, this.checksleep, this);
        }

        public refreshData() {
            this.setData(this._data);
        }

        public onRecycle() {
            this._data = undefined;
        }

    }

}