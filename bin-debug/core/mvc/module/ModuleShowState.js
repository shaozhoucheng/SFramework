var core;
(function (core) {
    var mvc;
    (function (mvc) {
        /**
         * 模块面板的显示状态
         * @author
         *
         */
        var ModuleShowState;
        (function (ModuleShowState) {
            /**
             * 不在舞台上
             */
            ModuleShowState[ModuleShowState["HIDE"] = 0] = "HIDE";
            /**
             * 正在显示，做Tween中
             */
            ModuleShowState[ModuleShowState["SHOWING"] = 1] = "SHOWING";
            /**
             * 已经显示在舞台上
             */
            ModuleShowState[ModuleShowState["SHOW"] = 2] = "SHOW";
            /**
             * 正在隐藏
             */
            ModuleShowState[ModuleShowState["HIDING"] = 3] = "HIDING";
        })(ModuleShowState = mvc.ModuleShowState || (mvc.ModuleShowState = {}));
    })(mvc = core.mvc || (core.mvc = {}));
})(core || (core = {}));
//# sourceMappingURL=ModuleShowState.js.map