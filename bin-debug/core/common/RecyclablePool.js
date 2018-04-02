var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * 回收池
     * @author builder
     *
     */
    var RecyclablePool = (function () {
        function RecyclablePool(TCreator, max) {
            if (max === void 0) { max = 100; }
            this._pool = [];
            this._max = max;
            this._TCreator = TCreator;
        }
        RecyclablePool.prototype.getInstance = function () {
            var ins;
            var pool = this._pool;
            if (pool.length) {
                ins = pool.pop();
            }
            else {
                ins = new this._TCreator();
            }
            if (typeof ins["onSpawn"] === "function") {
                ins.onSpawn();
            }
            return ins;
        };
        /**
         * 回收
         */
        RecyclablePool.prototype.recycle = function (t) {
            if (typeof t["onRecycle"] === "function") {
                t.onRecycle();
            }
            var pool = this._pool;
            if (pool.length < this._max) {
                pool.pushOnce(t);
            }
        };
        return RecyclablePool;
    }());
    core.RecyclablePool = RecyclablePool;
    __reflect(RecyclablePool.prototype, "core.RecyclablePool");
})(core || (core = {}));
//# sourceMappingURL=RecyclablePool.js.map