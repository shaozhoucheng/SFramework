var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var mvc;
    (function (mvc) {
        /**
         * Mediator和Proxy的基类
         * @author builder
         *
         */
        var FHost = (function () {
            function FHost(name) {
                this._name = name;
                this._facade = mvc.Facade.getInstance();
                this.checkInject();
            }
            Object.defineProperty(FHost.prototype, "name", {
                /**
                 * 唯一标识
                 */
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 检查依赖注入的数据
             *
             * @protected
             *
             * @memberOf FHost
             */
            FHost.prototype.checkInject = function () {
                //此注入是对原型进行的注入，无法直接删除，也不要直接做清理
                var idp = this._injectProxys;
                if (idp) {
                    var facade = this._facade;
                    var proxyName = void 0;
                    //检查Proxy
                    for (var key in idp) {
                        var ref = idp[key];
                        if (typeof ref === "object") {
                            proxyName = mvc.Facade.getNameOfInline(ref);
                        }
                        else {
                            proxyName = ref;
                        }
                        facade.getProxy(proxyName, this.getProxyCallback, this, key);
                    }
                }
            };
            FHost.prototype.addReadyExecute = function (handle, thisObj) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                var _asyncHelper = this._asyncHelper;
                if (!_asyncHelper) {
                    this._asyncHelper = _asyncHelper = new mvc.AsyncHelper();
                    _asyncHelper._ready = this.isReady;
                }
                _asyncHelper.addReadyExecute(handle, thisObj, args);
            };
            Object.defineProperty(FHost.prototype, "isReady", {
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            FHost.prototype.startSync = function () {
            };
            /**
             * 添加依赖项
             */
            FHost.prototype.addDepend = function (async) {
                if (!this._dependerHelper) {
                    this._dependerHelper = new mvc.DependerHelper(this, this.dependerReadyCheck);
                }
                this._dependerHelper.addDepend(async);
            };
            // 改为注入 @d_dependProxy 弃用此方法
            // /**
            //  * 
            // * 添加proxy
            // * @protected
            // * @param {string} proxyName    proxy的名字
            // * @param {string} property     在Mediator中，如果设置
            // * <code> 
            // * public modelA:XXProxy;
            // * </code>
            // * XXProxy的名字为"XXProxy"
            // * 则在 init方法中
            // * <code>
            // * addProxy("XXProxy","modelA")
            // * </code>
            // * property设置为"modelA"，即在Mediator中Proxy对应的变量名
            // */
            // protected addProxy(proxyName: string, property: string): void {
            //     this._facade.getProxy(proxyName, this.getProxyCallback, this, property);
            // }
            /**
             *
             * 获取模块回调
             * @protected
             * @param {Proxy} proxy 数据模块
             * @param {any[]} args  回调参数
             */
            FHost.prototype.getProxyCallback = function (proxy, args) {
                var property = args[0];
                this[property] = proxy;
                this.addDepend(proxy);
            };
            /**
             * 依赖项，加载完成后的检查
             */
            FHost.prototype.dependerReadyCheck = function () {
            };
            /**
             * 模块在Facade注册时执行
             */
            FHost.prototype.onRegister = function () {
            };
            /**
             * 模块从Facade注销时
             */
            FHost.prototype.onRemove = function () {
            };
            /**
             * 全部加载好以后要处理的事情<br/>
             * 包括依赖项加载完毕
             */
            FHost.prototype.afterAllReady = function () {
                // to be override
            };
            return FHost;
        }());
        mvc.FHost = FHost;
        __reflect(FHost.prototype, "core.mvc.FHost", ["core.mvc.IDepender", "core.mvc.IAsync"]);
        /**
         *
         * 附加依赖的Proxy
         * @export
         * @param {({ new (): IAsync } | string)} ref 如果注册的是Class，必须是Inline方式注册的Proxy
         * @returns
         */
        function __dependProxy(ref) {
            return function (target, key) {
                var _injectProxys = target._injectProxys;
                if (!_injectProxys) {
                    target._injectProxys = _injectProxys = {};
                }
                _injectProxys[key] = ref;
            };
        }
        mvc.__dependProxy = __dependProxy;
    })(mvc = core.mvc || (core.mvc = {}));
})(core || (core = {}));
(function (core) {
    /**
     *
     * 附加依赖的Proxy
     * @export
     * @param {({ new (): IAsync } | string)} ref
     * @returns
     */
    core.d_dependProxy = core.mvc.__dependProxy;
})(core || (core = {}));
//# sourceMappingURL=FHost.js.map