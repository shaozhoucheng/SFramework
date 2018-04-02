var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var mvc;
    (function (mvc) {
        /**
         * 模块处理器的基类
         * 类型0的模块处理器
         * @author
         *
         */
        var ModuleHandler = (function () {
            function ModuleHandler() {
            }
            /**
             * 打开某个模块
             * @param cfg
             */
            ModuleHandler.prototype.open = function (cfg) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
            };
            /**
             * 关闭某个模块
             * @param cfg
             *
             */
            ModuleHandler.prototype.close = function (cfg) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
            };
            return ModuleHandler;
        }());
        mvc.ModuleHandler = ModuleHandler;
        __reflect(ModuleHandler.prototype, "core.mvc.ModuleHandler");
    })(mvc = core.mvc || (core.mvc = {}));
})(core || (core = {}));
//# sourceMappingURL=ModuleHandler.js.map