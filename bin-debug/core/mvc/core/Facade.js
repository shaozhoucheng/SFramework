var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var core;
(function (core) {
    var mvc;
    (function (mvc) {
        /**
         * 代码构建类，用于注册代码
         * @author builder
         */
        var Facade = (function (_super) {
            __extends(Facade, _super);
            function Facade() {
                var _this = _super.call(this) || this;
                if (true) {
                    if (Facade._instance) {
                        core.ThrowError("Facade重复赋值");
                    }
                }
                Facade._instance = _this;
                _this._mediators = {};
                _this._scripts = {};
                _this._proxys = {};
                _this._indecting = [];
                return _this;
            }
            Facade.getInstance = function () {
                if (true) {
                    if (!this._instance) {
                        core.ThrowError("Facade没有赋值，就调用了");
                    }
                }
                return this._instance;
            };
            /**
             * 全局抛事件
             * @param type  事件类型
             * @param data  数据
             */
            Facade.simpleDispatch = function (type, data) {
                Facade._instance.dispatchEventWith(type, false, data);
            };
            /**
             *
             * 指定类型的事件是否被监听
             * @static
             * @param {string} type
             * @returns
             */
            Facade.hasEventListener = function (type) {
                return Facade._instance.hasEventListener(type);
            };
            /**
             *
             * 添加事件监听
             * @static
             * @param {string} type
             * @param {Function} listener
             * @param {*} thisObject
             * @param {number} [priority]
             */
            Facade.on = function (type, listener, thisObject, priority) {
                Facade._instance.on(type, listener, thisObject, false, priority);
            };
            /**
             *
             * 移除事件监听
             * @static
             * @param {string} type
             * @param {Function} listener
             * @param {*} thisObject
             */
            Facade.off = function (type, listener, thisObject) {
                Facade._instance.off(type, listener, thisObject, false);
            };
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
            Facade.getNameOfInline = function (inlineRef, className) {
                className = className || egret.getQualifiedClassName(inlineRef);
                var name;
                if ("NAME" in inlineRef) {
                    name = inlineRef["NAME"];
                }
                else {
                    name = className.substr(className.lastIndexOf(".") + 1);
                }
                return name;
            };
            /**
             * 绑定模块管理器
             */
            Facade.prototype.bindModuleManager = function (mm) {
                this._mm = mm;
                mm.init();
            };
            Object.defineProperty(Facade.prototype, "moduleManager", {
                get: function () {
                    return this._mm;
                },
                enumerable: true,
                configurable: true
            });
            Facade.prototype._removeHost = function (name, dict) {
                var dele = dict[name];
                var host;
                if (dele) {
                    delete dict[name];
                    host = dele.host;
                    if (host) {
                        host.onRemove();
                    }
                }
                return host;
            };
            /**
             * 移除面板控制器
             */
            Facade.prototype.removeMediator = function (mediatorName) {
                return this._removeHost(mediatorName, this._mediators);
            };
            /**
             * 移除模块
             */
            Facade.prototype.removeProxy = function (proxyName) {
                return this._removeHost(proxyName, this._proxys);
            };
            /**
             *
             * 注册内部模块
             * @param {{ new (): Proxy }} ref Proxy创建器
             * @param {string} [proxyName] 模块名称
             * @param {boolean} [async=false] 是否异步初始化，默认直接初始化
             */
            Facade.prototype.registerInlineProxy = function (ref, proxyName, async) {
                var className = egret.getQualifiedClassName(ref);
                if (!proxyName) {
                    proxyName = Facade.getNameOfInline(ref, className);
                }
                this.registerProxyConfig(className, proxyName);
                if (!async) {
                    var dele = this._proxys[proxyName];
                    var host = new ref();
                    dele.host = host;
                    Facade.getInstance().inject(host);
                    host.onRegister();
                }
            };
            /**
             *
             * 注册内部Mediator模块
             * @param {{ new (): Mediator }} ref Mediator创建器
             * @param {string} [mediatorName]   注册的模块名字
             */
            Facade.prototype.registerInlineMediator = function (ref, mediatorName) {
                var className = egret.getQualifiedClassName(ref);
                if (!mediatorName) {
                    mediatorName = Facade.getNameOfInline(ref, className);
                }
                this.registerMediatorConfig(className, mediatorName);
            };
            /**
             * 注册Proxy的配置
             * @param className     类名字，完整名字
             * @param name     模块名称
             * @param scriptid      要加载的脚本ID，用于加载脚本代码，空的id表示是主脚本
             */
            Facade.prototype.registerProxyConfig = function (className, proxyName, scriptid) {
                var dele;
                if (true) {
                    dele = this._proxys[proxyName];
                    if (dele) {
                        core.ThrowError("模块定义重复:" + name);
                    }
                }
                dele = {};
                dele.scriptid = scriptid;
                dele.className = className;
                dele.name = proxyName;
                this._proxys[proxyName] = dele;
            };
            /**
             * 注册模块的配置
             * @param className
             * @param name
             * @param scriptid      要加载的脚本ID，用于加载脚本代码
             */
            Facade.prototype.registerMediatorConfig = function (className, moduleID, scriptid) {
                var dele;
                if (true) {
                    dele = this._mediators[moduleID];
                    if (dele) {
                        core.ThrowError("模块定义重复:" + name);
                    }
                }
                dele = {};
                dele.scriptid = scriptid;
                dele.className = className;
                dele.name = moduleID;
                this._mediators[moduleID] = dele;
            };
            Facade.prototype.getOrCreateScript = function (scriptid) {
                var script = this._scripts[scriptid];
                if (!script) {
                    script = new mvc.ModuleScript;
                    script.id = scriptid;
                    this._scripts[scriptid] = script;
                }
                return script;
            };
            /**
             * 获取Proxy
             *
             * @param {string} proxyName proxy的名字
             * @param {{ (proxy: Proxy, args?: any[]) }} callback 回调函数
             * @param {*} thisObj 回调函数的this对象
             * @param args 回调函数的参数列表
             */
            Facade.prototype.getProxy = function (proxyName, callback, thisObj) {
                var args = [];
                for (var _i = 3; _i < arguments.length; _i++) {
                    args[_i - 3] = arguments[_i];
                }
                var dele = this._proxys[proxyName];
                if (true) {
                    if (!dele) {
                        core.ThrowError("没有注册proxy的关系");
                    }
                }
                var bin = {};
                bin.dele = dele;
                bin.callback = callback;
                bin.thisObj = thisObj;
                bin.args = args;
                this._solveScriptCallback(bin);
            };
            Facade.prototype.getProxy2 = function (proxyName) {
                var dele = this._proxys[proxyName];
                if (!dele) {
                    core.ThrowError("没有注册proxy的关系");
                }
                if (!dele.host) {
                    var bin = {};
                    bin.dele = dele;
                    this._getHost(bin);
                }
                return dele.host;
            };
            /**
             * 获取Mediator
             *
             * @param {string} moduleID 模块ID
             * @param {{ (proxy: Proxy, args?: any[]) }} callback 回调函数
             * @param {*} thisObj 回调函数的this对象
             * @param args 回调函数的参数列表
             */
            Facade.prototype.getMediator = function (moduleID, callback, thisObj) {
                var args = [];
                for (var _i = 3; _i < arguments.length; _i++) {
                    args[_i - 3] = arguments[_i];
                }
                var dele = this._mediators[moduleID];
                if (true) {
                    if (!dele) {
                        core.ThrowError("没有注册Mediator的关系");
                    }
                }
                var bin = {};
                // if(!bin.dele) return;
                bin.dele = dele;
                bin.callback = callback;
                bin.thisObj = thisObj;
                bin.args = args;
                this._solveScriptCallback(bin);
            };
            Facade.prototype.getMediator2 = function (moduleID) {
                var dele = this._mediators[moduleID];
                if (!dele) {
                    core.ThrowError("没有注册Mediator的关系");
                }
                if (!dele.host) {
                    var bin = {};
                    bin.dele = dele;
                    this._getHost(bin);
                }
                return dele.host;
            };
            Facade.prototype._solveScriptCallback = function (bin) {
                if (bin.dele.scriptid) {
                    var script = this.getOrCreateScript(bin.dele.scriptid);
                    if (script.state == 2 /* COMPLETE */) {
                        //直接回调
                        this._getHost(bin);
                    }
                    else {
                        script.callbacks.push(core.CallbackInfo.getInstance(this._getHost, this, [bin]));
                        script.load();
                    }
                }
                else {
                    //直接回调
                    this._getHost(bin);
                }
            };
            Facade.prototype._getHost = function (bin) {
                var dele = bin.dele;
                var host = dele.host;
                if (!host) {
                    var ref = egret.getDefinitionByName(dele.className);
                    dele.host = host = new ref();
                    Facade.getInstance().inject(host);
                    host.onRegister();
                }
                if (host.isReady) {
                    if (bin.callback) {
                        bin.callback.call(bin.thisObj, host, bin.args);
                    }
                }
                else {
                    if (bin.callback) {
                        host.addReadyExecute(bin.callback, bin.thisObj, host, bin.args);
                    }
                    host.startSync();
                }
            };
            /**
             * 打开/关闭指定模块
             * @param name  模块ID
             * @param show      1 打开模块<br/> 0 关闭模块<br/> -1 自动切换(默认)
             */
            Facade.prototype.toggle = function (moduleID, show, showTip, preModuleID) {
                if (show === void 0) { show = -1; }
                if (showTip === void 0) { showTip = true; }
                if (this._mm) {
                    this._mm.toggle(moduleID, show, showTip, preModuleID);
                }
            };
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
            Facade.prototype.executeMediator = function (moduleID, showTip, handlerName, show, preModuleID) {
                var args = [];
                for (var _i = 5; _i < arguments.length; _i++) {
                    args[_i - 5] = arguments[_i];
                }
                if (true) {
                    if (egret.is(this.$executeMediator.caller, egret.getQualifiedClassName(mvc.ModuleHandler))) {
                        core.ThrowError("ModuleHandler请调用$executeMediator");
                        return;
                    }
                }
                if (this._mm && this._mm.isModuleOpened(moduleID, showTip)) {
                    if (show) {
                        this.getMediator(moduleID, this._executeAndShowMediator, this, handlerName, preModuleID, args);
                    }
                    else {
                        this.getMediator(moduleID, this._executeMediator, this, handlerName, preModuleID, args);
                    }
                }
            };
            /**
             * 执行mediator的方法
             * 此方法只给ModuleHandler使用
             * @private
             * @param name      模块id
             * @param showTip       如果无法执行，是否弹出提示
             * @param handlerName   执行的函数名
             * @param args
             */
            Facade.prototype.$executeMediator = function (moduleID, handlerName, preModuleID) {
                var args = [];
                for (var _i = 3; _i < arguments.length; _i++) {
                    args[_i - 3] = arguments[_i];
                }
                if (true) {
                    if (!egret.is(this.$executeMediator.caller, egret.getQualifiedClassName(mvc.ModuleHandler))) {
                        core.ThrowError("此方法只允许ModuleManager调用");
                        return;
                    }
                }
                this.getMediator(moduleID, this._executeMediator, this, handlerName, preModuleID, args);
            };
            Facade.prototype._executeMediator = function (mediator, args) {
                var handlerName = args[0];
                var preModuleID = args[1];
                if (typeof mediator[handlerName] === "function") {
                    args = args[2];
                    mediator[handlerName].apply(mediator, args);
                }
                else if (true) {
                    core.ThrowError("无法在Mediator：" + mediator.name + "中找到方法[" + handlerName + "]");
                }
            };
            Facade.prototype._executeAndShowMediator = function (mediator, args) {
                var handlerName = args[0];
                var preModuleID = args[1];
                this.toggle(mediator.name, 1, false, preModuleID); //showTip为 false是不用再次提示，executeMediator已经执行过模块是否开启的检查
                if (typeof mediator[handlerName] === "function") {
                    args = args[2];
                    mediator[handlerName].apply(mediator, args);
                }
                else if (true) {
                    core.ThrowError("无法在Mediator：" + mediator.name + "中找到方法[" + handlerName + "]");
                }
            };
            /**
             * 执行Proxy的方法
             * @param name     proxy名字
             * @param handlerName   函数名字
             * @param args          参数列表
             */
            Facade.prototype.executeProxy = function (proxyName, handlerName) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                this.getProxy(proxyName, this._executeProxy, this, handlerName, args);
            };
            Facade.prototype._executeProxy = function (proxy, args) {
                var handlerName = args[0];
                if (typeof proxy[handlerName] === "function") {
                    args = args[1];
                    proxy[handlerName].apply(proxy, args);
                }
                else if (true) {
                    core.ThrowError("无法在Proxy：" + proxy.name + "中找到方法[" + handlerName + "]");
                }
            };
            /**
             * 注入数据
             */
            Facade.prototype.inject = function (obj) {
                //锁定对象，防止循环注入
                var _indecting = this._indecting;
                if (!~_indecting.indexOf(obj)) {
                    _indecting.push(obj);
                    this.doInject(obj);
                    var idx = _indecting.indexOf(obj);
                    _indecting.splice(idx, 1);
                }
            };
            /**
             * 实际注入的代码，子类扩展
             * @param obj
             */
            Facade.prototype.doInject = function (obj) {
                //to be override
            };
            /**
             * 模块脚本的加载路径
             */
            Facade.Script = "modules/{0}.js";
            return Facade;
        }(egret.EventDispatcher));
        mvc.Facade = Facade;
        __reflect(Facade.prototype, "core.mvc.Facade");
    })(mvc = core.mvc || (core.mvc = {}));
})(core || (core = {}));
(function (core) {
})(core || (core = {}));
//# sourceMappingURL=Facade.js.map