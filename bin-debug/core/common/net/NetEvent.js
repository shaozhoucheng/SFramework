var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * 网络事件的常量集
     * @author
     *
     */
    var NetEvent = (function () {
        function NetEvent() {
        }
        /**
         * 登录成功
         */
        NetEvent.LOGIN_COMPLETE = "LOGIN_COMPLETE";
        /**
         * 登录失败
         */
        NetEvent.LOGIN_FAILED = "LOGIN_FAILED";
        /**
         * WS连接成功
         */
        NetEvent.WEB_COMPLETE = "WEB_COMPLETE";
        /**
         * WS连接失败
         */
        NetEvent.WEB_FAILED = "WEB_FAILED";
        return NetEvent;
    }());
    core.NetEvent = NetEvent;
    __reflect(NetEvent.prototype, "core.NetEvent");
})(core || (core = {}));
//# sourceMappingURL=NetEvent.js.map