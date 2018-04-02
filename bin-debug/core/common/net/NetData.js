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
    /**
     * 用于发送的网络数据<br/>
     * @author builder
     */
    var NetSendData = (function () {
        function NetSendData() {
        }
        NetSendData.prototype.onRecycle = function () {
            this.content = undefined;
            this.cmd = undefined;
        };
        return NetSendData;
    }());
    core.NetSendData = NetSendData;
    __reflect(NetSendData.prototype, "core.NetSendData", ["core.IRecyclable"]);
    /**
     * 网络数据，类似AS3项目中Stream<br/>
     * @author builder
     *
     */
    var NetData = (function (_super) {
        __extends(NetData, _super);
        function NetData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return NetData;
    }(NetSendData));
    core.NetData = NetData;
    __reflect(NetData.prototype, "core.NetData");
})(core || (core = {}));
//# sourceMappingURL=NetData.js.map