var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var mvc;
    (function (mvc) {
        /**
         * 异步工具类，用于加方法兼听
         * @author builder
         *
         */
        var AsyncHelper = (function () {
            function AsyncHelper() {
                this._ready = false;
            }
            Object.defineProperty(AsyncHelper.prototype, "isReady", {
                /**
                 * 是否已经处理完成
                 */
                get: function () {
                    return this._ready;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 异步数据已经加载完毕
             */
            AsyncHelper.prototype.readyNow = function () {
                if (!this._ready) {
                    this._ready = true;
                    var _readyExecutes = this._readyExecutes;
                    if (_readyExecutes) {
                        var temp = core.Temp.SharedArray1;
                        for (var i = 0, len = _readyExecutes.length; i < len; i++) {
                            temp[i] = _readyExecutes[i];
                        }
                        _readyExecutes = undefined;
                        for (i = 0; i < len; i++) {
                            var callback = temp[i];
                            callback.execute();
                        }
                        temp.length = 0;
                    }
                }
            };
            /**
             * 检查是否完成,并让它回调方法
             *
             * @param {Function} handle 处理函数
             * @param {*} thisObj this对象
             * @param {any[]} args 函数的参数
             */
            AsyncHelper.prototype.addReadyExecute = function (handle, thisObj, args) {
                if (!handle)
                    return;
                if (this._ready) {
                    handle.apply(thisObj, args);
                    return;
                }
                var _readyExecutes = this._readyExecutes;
                if (!_readyExecutes) {
                    _readyExecutes = [];
                    this._readyExecutes = _readyExecutes;
                }
                core.CallbackInfo.addToList(_readyExecutes, handle, thisObj, args);
            };
            return AsyncHelper;
        }());
        mvc.AsyncHelper = AsyncHelper;
        __reflect(AsyncHelper.prototype, "core.mvc.AsyncHelper");
    })(mvc = core.mvc || (core.mvc = {}));
})(core || (core = {}));
//# sourceMappingURL=AsyncHelper.js.map