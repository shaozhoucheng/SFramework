var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * 平台数据
     * @author builder
     *
     */
    var AuthData = (function () {
        function AuthData() {
        }
        AuthData.prototype.toURLString = function () {
            return "pid=" + encodeURIComponent(this.pid) + "&puid=" + encodeURIComponent(this.puid) +
                "&sid=" + this.sid + "&sign=" + encodeURIComponent(this.sign);
        };
        return AuthData;
    }());
    core.AuthData = AuthData;
    __reflect(AuthData.prototype, "core.AuthData");
})(core || (core = {}));
//# sourceMappingURL=AuthData.js.map