module shao.mvc {
	/**
	 * 代码构建类，用于注册代码
	 * @author builder
	 */
    export class Facade extends egret.EventDispatcher {

        /**
         * 模块脚本的加载路径
         */
        public static Script: string = "modules/{0}.js";

        protected static _instance: Facade;


        public static getInstance(): Facade {
            if (DEBUG) {
                if (!this._instance) {
                    ThrowError("Facade没有赋值，就调用了");
                }
            }
            return this._instance;
        }


		/**
		 * 全局抛事件
		 * @param type  事件类型
		 * @param data  数据
		 */
        public static simpleDispatch(type: any, data?: any) {
            Facade._instance.dispatchEventWith(type, false, data);
        }

        /**
         * 
         * 指定类型的事件是否被监听
         * @static
         * @param {string} type
         * @returns
         */
        public static hasEventListener(type: any) {
            return Facade._instance.hasEventListener(type);
        }

        /**
         * 
         * 添加事件监听
         * @static
         * @param {string} type
         * @param {Function} listener
         * @param {*} thisObject
         * @param {number} [priority]
         */
        public static on(type: any, listener: Function, thisObject: any, priority?: number) {
            Facade._instance.on(type, listener, thisObject, false, priority);
        }

        /**
         * 
         * 移除事件监听
         * @static
         * @param {string} type
         * @param {Function} listener
         * @param {*} thisObject
         */
        public static off(type: any, listener: Function, thisObject: any) {
            Facade._instance.off(type, listener, thisObject, false);
        }

        /**
         * 
         * 获取内部注册的Proxy或者Mediator用于全局注册的名字
         * @static
         * @param {{ new (): any }} inlineRef inlineRef 内部注册的Proxy或者Mediator
         * @param {string} [className]  类名
         * @returns string  内部注册的Proxy或者Mediator用于全局注册的名字
         * 
         * @memberOf Facade
         */
        public static getNameOfInline(inlineRef: { new (): any }, className?: string): string {
            className = className || egret.getQualifiedClassName(inlineRef);
            let name: string;
            if ("NAME" in inlineRef) {//如果有 public static NAME 取这个作为名字
                name = inlineRef["NAME"];
            } else {
                name = className.substr(className.lastIndexOf(".") + 1);
            }
            return name;
        }


    	/**
    	 * 存储的数据Proxy
    	 */
        protected _proxys: { [index: string]: ScriptHelper<Proxy> };

    	/**
    	 * 存储的Mediator
    	 */
        protected _mediators: { [index: string]: ScriptHelper<Mediator> };

    	/**
    	 * 模块
    	 */
        protected _scripts: { [index: string]: ModuleScript };

        /**
         * 模块管理器
         */
        protected _mm: ModuleManager;

        public constructor() {
            super();
            if (DEBUG) {
                if (Facade._instance) {
                    ThrowError("Facade重复赋值");
                }
            }
            Facade._instance = this;
            this._mediators = {};
            this._scripts = {};
            this._proxys = {};
            this._indecting = [];
        }

		/**
		 * 绑定模块管理器
		 */
        public bindModuleManager(mm: ModuleManager) {
            this._mm = mm;
            mm.init();
        }

        public get moduleManager() {
            return this._mm;
        }

        protected _removeHost(name: string, dict: { [index: string]: ScriptHelper<FHost> }) {
            let dele = dict[name];
            let host: FHost;
            if (dele) {
                delete dict[name];
                host = dele.host;
                if (host) {
                    host.onRemove();
                }
            }
            return host;
        }

        /**
         * 移除面板控制器
         */
        public removeMediator(mediatorName: string) {
            return this._removeHost(mediatorName, this._mediators);
        }


		/**
		 * 移除模块
		 */
        public removeProxy(proxyName: string) {
            return this._removeHost(proxyName, this._proxys);
        }

        /**
         * 
         * 注册内部模块
         * @param {{ new (): Proxy }} ref Proxy创建器
         * @param {string} [proxyName] 模块名称
         * @param {boolean} [async=false] 是否异步初始化，默认直接初始化
         */
        public registerInlineProxy(ref: { new (): Proxy }, proxyName?: string | number, async?: boolean) {
            let className = egret.getQualifiedClassName(ref);
            if (!proxyName) {
                proxyName = Facade.getNameOfInline(ref, className);
            }
            this.registerProxyConfig(className, proxyName);
            if (!async) { //如果直接初始化
                let dele = this._proxys[proxyName];
                let host: Proxy = new ref();
                dele.host = host;
                Facade.getInstance().inject(host);
                host.onRegister();
            }
        }

        /**
         * 
         * 注册内部Mediator模块
         * @param {{ new (): Mediator }} ref Mediator创建器
         * @param {string} [mediatorName]   注册的模块名字
         */
        public registerInlineMediator(ref: { new (): Mediator }, mediatorName?: string | number) {
            let className = egret.getQualifiedClassName(ref);
            if (!mediatorName) {
                mediatorName = Facade.getNameOfInline(ref, className);
            }
            this.registerMediatorConfig(className, mediatorName);
        }


		/**
		 * 注册Proxy的配置
		 * @param className     类名字，完整名字
		 * @param name     模块名称
		 * @param scriptid      要加载的脚本ID，用于加载脚本代码，空的id表示是主脚本
		 */
        public registerProxyConfig(className: string, proxyName: string | number, scriptid?: string) {
            let dele: ScriptHelper<Proxy>;
            if (DEBUG) {
                dele = this._proxys[proxyName];
                if (dele) {
                    ThrowError("模块定义重复:" + name);
                }
            }
            dele = <ScriptHelper<Proxy>>{};
            dele.scriptid = scriptid;
            dele.className = className;
            dele.name = proxyName;
            this._proxys[proxyName] = dele;
        }


		/**
		 * 注册模块的配置 
		 * @param className
		 * @param name
		 * @param scriptid      要加载的脚本ID，用于加载脚本代码
		 */
        public registerMediatorConfig(className: string, moduleID: string | number, scriptid?: string) {
            let dele: ScriptHelper<Mediator>;
            if (DEBUG) {
                dele = this._mediators[moduleID];
                if (dele) {
                    ThrowError("模块定义重复:" + name);
                }
            }
            dele = <ScriptHelper<Mediator>>{};
            dele.scriptid = scriptid;
            dele.className = className;
            dele.name = moduleID;
            this._mediators[moduleID] = dele;
        }

        private getOrCreateScript(scriptid: string) {
            let script = this._scripts[scriptid];
            if (!script) {
                script = new ModuleScript;
                script.id = scriptid;
                this._scripts[scriptid] = script;
            }
            return script;
        }

        /**
         * 获取Proxy
         * 
         * @param {string} proxyName proxy的名字
         * @param {{ (proxy: Proxy, args?: any[]) }} callback 回调函数
         * @param {*} thisObj 回调函数的this对象
         * @param args 回调函数的参数列表
         */
        public getProxy(proxyName: string | number, callback: { (proxy: Proxy, args?: any[]) }, thisObj?: any, ...args) {
            let dele = this._proxys[proxyName];
            if (DEBUG) {
                if (!dele) {
                    ThrowError("没有注册proxy的关系");
                }
            }
            let bin = <ScriptSolveBin>{};
            bin.dele = dele;
            bin.callback = callback;
            bin.thisObj = thisObj;
            bin.args = args;
            this._solveScriptCallback(bin);
        }

        public getProxy2(proxyName: string | number) {
            let dele = this._proxys[proxyName];
            if (!dele) {
                ThrowError("没有注册proxy的关系");
            }
            if (!dele.host) {
                let bin = <ScriptSolveBin>{};
                bin.dele = dele;
                this._getHost(bin);
            }

            return dele.host;
        }

        /**
         * 获取Mediator
         * 
         * @param {string} moduleID 模块ID
         * @param {{ (proxy: Proxy, args?: any[]) }} callback 回调函数
         * @param {*} thisObj 回调函数的this对象
         * @param args 回调函数的参数列表
         */
        public getMediator(moduleID: string | number, callback: { (mediator: Mediator, args?: any[]) }, thisObj: any, ...args) {
            let dele = this._mediators[moduleID];
            if (DEBUG) {
                if (!dele) {
                    ThrowError("没有注册Mediator的关系");
                }
            }
            let bin = <ScriptSolveBin>{};
            // if(!bin.dele) return;
            bin.dele = dele;
            bin.callback = callback;
            bin.thisObj = thisObj;
            bin.args = args;
            this._solveScriptCallback(bin);
        }

        public getMediator2(moduleID: string | number) {
            let dele = this._mediators[moduleID];
            if (!dele) {
                ThrowError("没有注册Mediator的关系");
            }
            if (!dele.host) {
                let bin = <ScriptSolveBin>{};
                bin.dele = dele;
                this._getHost(bin);
            }

            return dele.host;
        }

        private _solveScriptCallback(bin: ScriptSolveBin) {
            if (bin.dele.scriptid) {
                let script = this.getOrCreateScript(bin.dele.scriptid);
                if (script.state == RequestState.COMPLETE) {
                    //直接回调
                    this._getHost(bin);
                } else {
                    script.callbacks.push(CallbackInfo.getInstance(this._getHost, this, [bin]));
                    script.load();
                }
            } else {//主脚本中的模块
                //直接回调
                this._getHost(bin);
            }
        }

        private _getHost(bin: ScriptSolveBin) {
            let dele = bin.dele;
            let host = dele.host;
            if (!host) {
                let ref = egret.getDefinitionByName(dele.className);
                dele.host = host = new ref();
                Facade.getInstance().inject(host);
                host.onRegister();
            }
            if (host.isReady) {
                if (bin.callback) {
                    bin.callback.call(bin.thisObj, host, bin.args);
                }
            } else {
                if (bin.callback) {
                    host.addReadyExecute(bin.callback, bin.thisObj, host, bin.args);
                }
                host.startSync();
            }
        }


        /**
         * 打开/关闭指定模块
         * @param name  模块ID
         * @param show      1 打开模块<br/> 0 关闭模块<br/> -1 自动切换(默认)
         */
        public toggle(moduleID: string | number, show = -1, showTip = true, preModuleID?: string) {
            if (this._mm) {
                this._mm.toggle(moduleID, show, showTip, preModuleID);
            }
        }



        /**
         * 
         * 执行某个模块的方法
         * @param {string} moduleID     模块id
         * @param {boolean} showTip     是否显示Tip，如果无法执行，是否弹出提示
         * @param {string} handlerName  执行的函数名
         * @param {boolean} [show]      执行时，是否将模块显示到舞台
         * @param {any[]} args            函数的参数列表
         * @returns
         */
        public executeMediator(moduleID: string | number, showTip: boolean, handlerName: string, show?: boolean, preModuleID?: string, ...args) {
            if (DEBUG) {
                if (egret.is(this.$executeMediator.caller, egret.getQualifiedClassName(ModuleHandler))) {
                    ThrowError("ModuleHandler请调用$executeMediator");
                    return;
                }
            }
            if (this._mm && this._mm.isModuleOpened(moduleID, showTip)) {
                if (show) {
                    this.getMediator(moduleID, this._executeAndShowMediator, this, handlerName, preModuleID, args);
                } else {
                    this.getMediator(moduleID, this._executeMediator, this, handlerName, preModuleID, args);
                }
            }
        }

        /**
         * 执行mediator的方法
         * 此方法只给ModuleHandler使用
         * @private
         * @param name      模块id
         * @param showTip       如果无法执行，是否弹出提示
         * @param handlerName   执行的函数名
         * @param args
         */
        public $executeMediator(moduleID: string | number, handlerName: string, preModuleID?: string, ...args) {
            if (DEBUG) {
                if (!egret.is(this.$executeMediator.caller, egret.getQualifiedClassName(ModuleHandler))) {
                    ThrowError("此方法只允许ModuleManager调用");
                    return;
                }
            }
            this.getMediator(moduleID, this._executeMediator, this, handlerName, preModuleID, args);
        }

        protected _executeMediator(mediator: Mediator, args: any[]) {
            let handlerName = args[0];
            let preModuleID = args[1];
            if (typeof mediator[handlerName] === "function") {
                args = args[2];
                (<Function>mediator[handlerName]).apply(mediator, args);
            } else if (DEBUG) {
                ThrowError("无法在Mediator：" + mediator.name + "中找到方法[" + handlerName + "]");
            }
        }

        protected _executeAndShowMediator(mediator: Mediator, args: any[]) {
            let handlerName = args[0];
            let preModuleID = args[1];
            this.toggle(mediator.name, 1, false, preModuleID);//showTip为 false是不用再次提示，executeMediator已经执行过模块是否开启的检查
            if (typeof mediator[handlerName] === "function") {
                args = args[2];
                (<Function>mediator[handlerName]).apply(mediator, args);
            } else if (DEBUG) {
                ThrowError("无法在Mediator：" + mediator.name + "中找到方法[" + handlerName + "]");
            }
        }


        /**
         * 执行Proxy的方法
         * @param name     proxy名字
         * @param handlerName   函数名字
         * @param args          参数列表
         */
        public executeProxy(proxyName: string | number, handlerName: string, ...args) {
            this.getProxy(proxyName, this._executeProxy, this, handlerName, args);
        }

        protected _executeProxy(proxy: Proxy, args: any[]) {
            let handlerName = args[0];
            if (typeof proxy[handlerName] === "function") {
                args = args[1];
                (<Function>proxy[handlerName]).apply(proxy, args);
            } else if (DEBUG) {
                ThrowError("无法在Proxy：" + proxy.name + "中找到方法[" + handlerName + "]");
            }
        }

        /**
         * 正在注入的对象
         */
        protected _indecting: any[];

        /**
         * 注入数据
         */
        public inject(obj: any) {
            //锁定对象，防止循环注入
            let _indecting = this._indecting;
            if (!~_indecting.indexOf(obj)) {
                _indecting.push(obj);
                this.doInject(obj);
                let idx = _indecting.indexOf(obj);
                _indecting.splice(idx, 1);
            }
        }


        /**
         * 实际注入的代码，子类扩展
         * @param obj
         */
        protected doInject(obj: any) {
            //to be override
        }
    }

    interface ScriptHelper<T> {

        /**
         * 脚本id，空的id表示是主脚本
         */
        scriptid: string;

        /**
         * 主体的类名字
         */
        className: string;

        /**
         * 名字
         */
        name: string | number;

        /**
         * 数据主体
         */
        host: T;
    }

    interface ScriptSolveBin {
        /**
         * 
         * 脚本代理
         * @type {ScriptHelper<FHost>}
         */
        dele: ScriptHelper<FHost>;
        /**
         * 
         * 回调函数
         * @type {{ (m: FHost, args?: any[]) }}
         */
        callback: { (m: FHost, args?: any[]) };
        /**
         * 
         * 函数的this指针
         * @type {*}
         */
        thisObj: any;

        /**
         * 
         * 参数列表
         * @type {any[]}
         */
        args: any[];
        /**
         * 
         * Mediator专用参数，回调后是否将Mediator对应视图显示在舞台
         * @type {boolean}
         */
        show?: boolean;
    }
}

module shao {
    export var $facade: mvc.Facade;
}
