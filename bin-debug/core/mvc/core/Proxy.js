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
         * 用于君游项目数据同步，后台运行<br/>
         * 只有注册和注销，没有awake和sleep
         * @author builder
         *
         */
        var Proxy = (function (_super) {
            __extends(Proxy, _super);
            function Proxy(name) {
                var _this = _super.call(this, name) || this;
                /**
                 * 默认当作同步数据，认为是已经处理好的
                 */
                _this._selfReady = true;
                /**
                 * 数据是否加载完毕
                 */
                _this._readyState = 0 /* UNREQUEST */;
                /**
                 * 派发全局事件
                 *
                 * @protected
                 */
                _this.simpleDispatch = mvc.Facade.simpleDispatch;
                return _this;
            }
            Object.defineProperty(Proxy.prototype, "isReady", {
                get: function () {
                    return this._readyState == 2 /* COMPLETE */ && this._selfReady;
                },
                enumerable: true,
                configurable: true
            });
            Proxy.prototype.startSync = function () {
                if (this._readyState == 2 /* COMPLETE */) {
                    this.selfReady();
                }
                else if (this._readyState == 0 /* UNREQUEST */) {
                    this._readyState = 1 /* REQUESTING */;
                    this._startSync();
                }
                return false;
            };
            /**
             * 用于重写，主要用于向服务端发送一些指令/或者是开始进行http请求进行拉配置
             *
             */
            Proxy.prototype._startSync = function () {
            };
            /**
             * 自己加载好<br/>
             * 不包括依赖项
             *
             */
            Proxy.prototype.selfReady = function () {
                this.parseSelfData();
                this._selfReady = true;
                if (this._dependerHelper) {
                    this._dependerHelper.check();
                }
                else {
                    this.allReadyHandler();
                }
            };
            /**
             * 用于子类重写<br/>
             * 处理自己的数据<br/>
             * 如果有依赖，请使用afterAllReady<br/>
             *
             */
            Proxy.prototype.parseSelfData = function () {
                // to be override
            };
            /**
             * 依赖项加载完毕
             *
             */
            Proxy.prototype.dependerReadyCheck = function () {
                if (this._selfReady) {
                    this.allReadyHandler();
                }
            };
            /**
             * 全部ok<br/>
             * 此函数不给子类继承
             */
            Proxy.prototype.allReadyHandler = function () {
                if (this._readyState != 2 /* COMPLETE */) {
                    this.afterAllReady();
                    this._readyState = 2 /* COMPLETE */;
                    if (this._asyncHelper) {
                        this._asyncHelper.readyNow();
                    }
                }
            };
            return Proxy;
        }(mvc.FHost));
        mvc.Proxy = Proxy;
        __reflect(Proxy.prototype, "core.mvc.Proxy");
    })(mvc = core.mvc || (core.mvc = {}));
})(core || (core = {}));
//# sourceMappingURL=Proxy.js.map