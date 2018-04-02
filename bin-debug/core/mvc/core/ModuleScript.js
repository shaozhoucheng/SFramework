var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var mvc;
    (function (mvc) {
        /**
         * 模块脚本，后续开发模块，分成多个模块文件
         * @author builder
         *
         */
        var ModuleScript = (function () {
            function ModuleScript() {
                /**
                 * 加载状态
                 */
                this.state = 0 /* UNREQUEST */;
                /**
                 * 回调列表
                 */
                this.callbacks = [];
            }
            /**
             * 已异步方式加载
             */
            ModuleScript.prototype.load = function () {
                if (this.state == 0 /* UNREQUEST */) {
                    var uri = mvc.Facade.Script.substitute(this.id);
                    core.loadScript(uri, this.onScriptLoaded, this);
                    this.state = 1 /* REQUESTING */;
                }
            };
            /**
             * 配置加载完成之后
             */
            ModuleScript.prototype.onScriptLoaded = function () {
                this.state = 2 /* COMPLETE */;
                var facade = mvc.Facade.getInstance();
                var callbacks = this.callbacks.concat();
                this.callbacks.length = 0;
                for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
                    var callback = callbacks_1[_i];
                    callback.execute();
                }
            };
            return ModuleScript;
        }());
        mvc.ModuleScript = ModuleScript;
        __reflect(ModuleScript.prototype, "core.mvc.ModuleScript");
    })(mvc = core.mvc || (core.mvc = {}));
})(core || (core = {}));
//# sourceMappingURL=ModuleScript.js.map