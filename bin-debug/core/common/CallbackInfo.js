var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * 回调信息，用于存储回调数据
     * @author builder
     *
     */
    var CallbackInfo = (function () {
        function CallbackInfo() {
        }
        CallbackInfo.prototype.init = function (callback, thisObj, args) {
            this.callback = callback;
            this.args = args;
            this.thisObj = thisObj;
        };
        /**
         * 检查回调是否一致，只检查参数和this对象,不检查参数
         */
        CallbackInfo.prototype.checkHandle = function (callback, thisObj) {
            return this.callback === callback && this.thisObj === thisObj;
        };
        /**
         * 执行回调
         * 回调函数，将以args作为参数，callback作为函数执行
         * @param {boolean} [doRecycle=true] 是否回收CallbackInfo
         */
        CallbackInfo.prototype.execute = function (doRecycle) {
            if (doRecycle === void 0) { doRecycle = true; }
            this.callback.apply(this.thisObj, this.args);
            if (doRecycle) {
                this.recycle();
            }
        };
        /**
         * 用于执行其他参数
         * 初始的参数会按顺序放在末位
         * @param args (description)
         */
        CallbackInfo.prototype.call = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.args) {
                args = args.concat(this.args);
            }
            this.callback.apply(this.thisObj, args);
        };
        CallbackInfo.prototype.onRecycle = function () {
            this.callback = undefined;
            this.args = undefined;
            this.thisObj = undefined;
        };
        /**
         * 回收
         */
        CallbackInfo.prototype.recycle = function () {
            CallbackInfo._pool.recycle(this);
        };
        /**
         * 获取CallbackInfo的实例
         */
        CallbackInfo.getInstance = function (callback, thisObj, args) {
            var info = this._pool.getInstance();
            info.init(callback, thisObj, args);
            return info;
        };
        /**
         * 加入到数组
         * 检查是否有this和handle相同的callback，如果有，就用新的参数替换旧参数
         * @param list
         * @param handle
         * @param args
         * @param thisObj
         */
        CallbackInfo.addToList = function (list, handle, thisObj, args) {
            //检查是否有this和handle相同的callback
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var callback = list_1[_i];
                if (callback.checkHandle(handle, thisObj)) {
                    callback.args = args;
                    return callback;
                }
            }
            callback = this.getInstance(handle, thisObj, args);
            list.push(callback);
            return callback;
        };
        CallbackInfo._pool = new core.RecyclablePool(CallbackInfo);
        return CallbackInfo;
    }());
    core.CallbackInfo = CallbackInfo;
    __reflect(CallbackInfo.prototype, "core.CallbackInfo", ["core.IRecyclable"]);
})(core || (core = {}));
//# sourceMappingURL=CallbackInfo.js.map