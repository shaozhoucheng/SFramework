module shao.mvc {

    import Event = egret.Event;
	/**
	 * 视图控制器，持有视图<br/>
	 * 持有Proxy，主要监听视图和Proxy的事件，变更面板状态<br/>
	 * @author builder
	 *
	 */
    export abstract class Mediator extends FHost {


         /**
		 * 加载状态
		 */
        protected _ready: boolean;

		/**
		 */
        protected _preViewReady: boolean;

        /**
         * 视图
         */
        protected _view: IModulePanel;


        /**
         * 关注列表
         */
        protected _interests: { [index: string]: Interest };

        public get isReady() {
            return this._ready;
        }




        /**
         *  获取视图
         */
        public get view(): IModulePanel {
            return this._view;
        }

        public set view(value: IModulePanel) {
            if (this._view != value) {
                this["$view"] = value;
                var old = this._view;
                if (old) {
                    old.off(Event.REMOVED_FROM_STAGE, this.stageHandler, this);
                    old.off(Event.ADDED_TO_STAGE, this.stageHandler, this);
                }
                this._view = value;
                value.moduleID = <string>this._name;
                value.on(Event.REMOVED_FROM_STAGE, this.stageHandler, this);
                value.on(Event.ADDED_TO_STAGE, this.stageHandler, this);
                if (isIAsync(value)) {
                    var async: IAsyncPanel = <IAsyncPanel>value;
                    async.addReadyExecute(this.preViewCompleteHandler, this);
                }
            }
        }

        // /**
        //  * 
        //  * 添加proxy
        //  * @protected
        //  * @param {string} proxyName    proxy的名字
        //  * @param {string} property     在Mediator中，如果设置
        //  * <code> 
        //  * public modelA:XXProxy;
        //  * </code>
        //  * XXProxy的名字为"XXProxy"
        //  * 则在 init方法中
        //  * <code>
        //  * addProxy("XXProxy","modelA")
        //  * </code>
        //  * property设置为"modelA"，即在Mediator中Proxy对应的变量名
        //  */
        // protected addProxy(proxyName: string, property: string): void {
        //     Facade.getInstance().getProxy(proxyName, this.getProxyCallback, this, property);
        // }

        // /**
        //  * 
        //  * 获取模块回调
        //  * @private
        //  * @param {Proxy} proxy 数据模块
        //  * @param {any[]} args  回调参数
        //  */
        // private getProxyCallback(proxy: Proxy, args: any[]) {
        //     let property: string = args[0];
        //     this.addDepend(proxy);
        //     this[property] = proxy;
        // }

        protected stageHandler(e: Event) {
            var facade = Facade.getInstance();
            var type: string, ins: Interest;
            var _interests = this._interests;
            if (e.type == Event.ADDED_TO_STAGE) {
                //加入关注的事件
                for (type in _interests) {
                    ins = _interests[type];
                    facade.on(type, ins.handler, this, false, ins.priority);
                    if (ins.trigger) {
                        ins.handler.call(this);
                    }
                }
                this.awake();
            } else {
                for (type in _interests) {
                    ins = _interests[type];
                    facade.off(type, ins.handler, this);
                }
                this.sleep();
            }
        }

        /**
         * 开始尝试同步
         */
        public startSync() {
            if (isIAsync(this._view)) {
                var async: IAsyncPanel = <IAsyncPanel>this._view;
                if (async.isReady) {
                    this.preViewCompleteHandler();
                } else {
                    async.addReadyExecute(this.preViewCompleteHandler, this);
                    async.startSync();
                }
            }
        }

        /**
         * 
         * 视图加载完毕
         * @protected
         */
        protected preViewCompleteHandler() {
            this._preViewReady = true;
            if (this._dependerHelper) {//不创建
                this._dependerHelper.check();
            } else {
                this.dependerReadyCheck();
            }
        }

        /**
         * Creates an instance of Mediator.
         * 
         * @param {string} moduleID 模块ID
         */
        public constructor(moduleID: string) {
            super(moduleID);
            this.init();
        }

        /**
         * 用于写加载数据和加载创建视图的代码
         * 
         * @protected
         * @abstract
         */
        protected abstract init();

        // 改为注入@d_interest，弃用此方法
        // /**
        //  * 
        //  * 添加关注
        //  * 关注为事件处理回调，只会在awake时，添加到事件监听列表
        //  * 在sleep时，从事件监听列表中移除
        //  * @param {string} type                         关注的事件
        //  * @param {(e?: Event) => void} handler          回调函数
        //  * @param {boolean} [triggerOnStage=false]      添加到舞台的时候，会立即执行一次，<font color="#f00">注意，处理回调必须能支持不传event的情况</font>
        //  * @param {number} [priority=0]                 优先级，默认为0
        //  */
        // public addInterest(type: string, handler: (e?: Event) => void, triggerOnStage?: boolean, priority?: number) {
        //     var _interests = this._interests;
        //     if (!_interests) {
        //         this._interests = _interests = {};
        //     }
        //     var ins = <Interest>{};
        //     ins.handler = handler;
        //     ins.priority = priority || 0;
        //     ins.trigger = triggerOnStage;
        //     _interests[type] = ins;
        // }

        /**
         * 
         * 依赖项完毕后检查
         * @protected
         * @returns
         */
        protected dependerReadyCheck() {
            if (!this._preViewReady) {
                return;
            }
            if (!this._ready) {
                this._ready = true;
                this.afterAllReady();
                if (this._asyncHelper) {
                    this._asyncHelper.readyNow();
                }
            }
        }

        /**检测功能是否开启 */
        public checkModuleOpen(): boolean {
            //szc 屏蔽
            return true;
            // return getSinglon(chuanqi.ModuleControler).checkOpen(this._name);
        }

        /**
         * 面板加入到舞台时执行
         */
        public awake() {

        }

        /**
         * 面板从舞台移除时执行
         */
        public sleep() {

        }

    }

    export interface Interest {
        /**
         * 回调函数
         */
        handler: (e?: Event) => void;
        /**
         * 
         * 优先级
         * @type {number}
         */
        priority: number;

        /**
         * 
         * 添加到舞台的时候，立即执行一次回调函数
         * @type {boolean}
         */
        trigger: boolean;
    }
    /**
     * 使用注入的方法
     * 添加关注
     * 关注为事件处理回调，只会在awake时，添加到事件监听列表
     * 在sleep时，从事件监听列表中移除
     * @param {string} type                         关注的事件
     * @param {(e?: Event) => void} handler          回调函数
     * @param {boolean} [triggerOnStage=false]      添加到舞台的时候，会立即执行一次，<font color="#f00">注意，处理回调必须能支持不传event的情况</font>
     * @param {number} [priority=0]                 优先级，默认为0
     */
    export function interest(eventType: string | number, triggerOnStage?: boolean, priority?: number) {
        return function (target: any, key: string, value: any) {
            let _interests = target._interests;
            if (!_interests) {
                target._interests = _interests = {};
            }
            let ins = <Interest>{};
            ins.handler = value.value;
            ins.priority = priority || 0;
            ins.trigger = triggerOnStage;
            _interests[eventType] = ins;
        }
    }
}
module shao {
    /**
    * 使用@d_interest 注入 添加关注
    * 关注为事件处理回调，只会在awake时，添加到事件监听列表
    * 在sleep时，从事件监听列表中移除
    * @param {string} type                         关注的事件
    * @param {(e?: Event) => void} handler          回调函数
    * @param {boolean} [triggerOnStage=false]      添加到舞台的时候，会立即执行一次，<font color="#f00">注意，处理回调必须能支持不传event的情况</font>
    * @param {number} [priority=0]                 优先级，默认为0
    */
    export var d_interest = mvc.interest;
}

