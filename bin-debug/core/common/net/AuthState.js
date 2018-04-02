var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * 用户认证
     * @author builder
     *
     */
    var AuthState = (function () {
        function AuthState() {
        }
        /**
         * 认证成功
         */
        AuthState.AUTH_SUCCESS = 0;
        /**
         * 票据验证失败，要求客户端重新登录
         */
        AuthState.AUTH_FAILED = 1;
        return AuthState;
    }());
    core.AuthState = AuthState;
    __reflect(AuthState.prototype, "core.AuthState");
})(core || (core = {}));
//# sourceMappingURL=AuthState.js.map