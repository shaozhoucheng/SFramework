var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * 客户端检测
     * @author builder
     *
     */
    var ClientCheck = (function () {
        function ClientCheck() {
        }
        /**
         * 是否做客户端检查
         */
        ClientCheck.isClientCheck = true;
        return ClientCheck;
    }());
    core.ClientCheck = ClientCheck;
    __reflect(ClientCheck.prototype, "core.ClientCheck");
})(core || (core = {}));
//# sourceMappingURL=ClientCheck.js.map