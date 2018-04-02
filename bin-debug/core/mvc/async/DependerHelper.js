var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var mvc;
    (function (mvc) {
        /**
         * 依赖项的辅助类
         * @author builder
         *
         */
        var DependerHelper = (function () {
            /**
             *
             * @param host          调用项
             * @param callback      回调函数         回调函数的thisObj会使用host来处理
             * @param thisObj       回调函数的this
             * @param args
             */
            function DependerHelper(host, callback) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                this._host = host;
                this._callback = callback;
                this._args = args;
                this._unreadyDepender = [];
            }
            /**
             * 添加依赖
             * @param async
             */
            DependerHelper.prototype.addDepend = function (async) {
                if (async.isReady) {
                    this.readyHandler(async);
                }
                else {
                    this._unreadyDepender.push(async);
                    async.addReadyExecute(this.readyHandler, this, async);
                }
            };
            /**
             * 一个依赖项处理完成
             */
            DependerHelper.prototype.readyHandler = function (async) {
                this._unreadyDepender.remove(async);
                this.check();
            };
            /**
             * 检查依赖项是否已经完成，会在下一帧做检查
             */
            DependerHelper.prototype.check = function () {
                if (!this._uncheck) {
                    this._uncheck = true;
                    egret.callLater(this._check, this);
                }
            };
            /**
             * 检查依赖项是否已经完成
             */
            DependerHelper.prototype._check = function () {
                this._uncheck = false;
                var allReady = true;
                for (var _i = 0, _a = this._unreadyDepender; _i < _a.length; _i++) {
                    var async = _a[_i];
                    if (!async.isReady) {
                        async.startSync();
                        allReady = false;
                    }
                }
                if (allReady && this._callback) {
                    this._unreadyDepender.length = 0;
                    this._callback.apply(this._host, this._args);
                }
            };
            return DependerHelper;
        }());
        mvc.DependerHelper = DependerHelper;
        __reflect(DependerHelper.prototype, "core.mvc.DependerHelper");
    })(mvc = core.mvc || (core.mvc = {}));
})(core || (core = {}));
//# sourceMappingURL=DependerHelper.js.map