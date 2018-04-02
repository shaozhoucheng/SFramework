var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var MapDict = (function () {
        function MapDict() {
            this._keys = [];
            this._values = [];
            this._size = 0;
        }
        MapDict.prototype.set = function (key, value) {
            var keys = this._keys;
            var idx = keys.indexOf(key);
            if (~idx) {
                this._values[idx] = value;
            }
            else {
                var size = this._size;
                keys[size] = key;
                this._values[size] = value;
                this._size++;
            }
            return this;
        };
        MapDict.prototype.get = function (key) {
            var idx = this._keys.indexOf(key);
            if (~idx) {
                return this._values[idx];
            }
            return null;
        };
        MapDict.prototype.has = function (key) {
            return this.get(key) != undefined;
        };
        MapDict.prototype.delete = function (key) {
            var keys = this._keys;
            var idx = keys.indexOf(key);
            if (~idx) {
                keys.splice(idx, 1);
                this._values.splice(idx, 1);
                this._size--;
                return true;
            }
            return false;
        };
        MapDict.prototype.forEach = function (callbackfn, thisArg) {
            var keys = this._keys;
            var values = this._values;
            for (var i = 0, len = this._size; i < len; i++) {
                callbackfn(values[i], keys[i], thisArg);
            }
        };
        MapDict.prototype.clear = function () {
            this._keys.length = 0;
            this._values.length = 0;
            this._size = 0;
        };
        Object.defineProperty(MapDict.prototype, "size", {
            get: function () {
                return this._size;
            },
            enumerable: true,
            configurable: true
        });
        return MapDict;
    }());
    core.MapDict = MapDict;
    __reflect(MapDict.prototype, "core.MapDict", ["Map"]);
})(core || (core = {}));
//# sourceMappingURL=MapDict.js.map