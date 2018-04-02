var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * 错误处理
     * @author builder
     *
     */
    var ThrowErrorHelper = (function () {
        function ThrowErrorHelper() {
        }
        /**
         * 获取错误信息的数组，以便玩家提交错误信息
         */
        ThrowErrorHelper.getErrorMsg = function () {
            return this.errorMsg;
        };
        /**
         * 在内存中存储报错数据
         * @param msg
         * @param atWho 如果参数是数字 0 前端
         *                           1 后端
         *                           2 策划
         *              如果参数是字符串，则通过字符串当作账号，弹窗给这个人
         * @private
         */
        ThrowErrorHelper.getMsg = function (msg, atWho) {
            var at = "";
            var atConfig = ["@前端", "@后端", "@策划"];
            for (var _i = 0, atWho_1 = atWho; _i < atWho_1.length; _i++) {
                var i = atWho_1[_i];
                if (true) {
                    if (typeof i === "string") {
                    }
                }
                if (i in atConfig) {
                    at += atConfig[i];
                }
            }
            return new Date().format("[yyyy-MM-dd HH:mm:ss]", true) + "[报错信息：]" + msg + at;
        };
        /**
         * 在内存中存储报错数据
         * @param msg
         * @param atWho
         *
         */
        ThrowErrorHelper.pushMsg = function (msg, atWho) {
            var errorMsg = this.errorMsg;
            if (errorMsg.length > 1000 /* MAX_COUNT */) {
                errorMsg.shift();
            }
            var msg = this.getMsg(msg, atWho);
            errorMsg.push(msg);
            core.mvc.Facade.simpleDispatch(-158 /* MODULE_DEBUG */, msg);
            return msg;
        };
        /**
         * 内存中存储的错误数据信息
         *
         */
        ThrowErrorHelper.errorMsg = [];
        return ThrowErrorHelper;
    }());
    core.ThrowErrorHelper = ThrowErrorHelper;
    __reflect(ThrowErrorHelper.prototype, "core.ThrowErrorHelper");
})(core || (core = {}));
//# sourceMappingURL=ThrowErrorHelper.js.map