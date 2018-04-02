var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var mvc;
    (function (mvc) {
        /**
         * 功能配置的基类
         * @author builder
         */
        var BaseMCfg = (function () {
            function BaseMCfg() {
                /**
                 * 当前显示状态
                 */
                this.showState = mvc.ModuleShowState.HIDE;
                /**
                 * 服务器认为此功能开放
                 */
                this.serverOpen = true;
            }
            BaseMCfg.prototype.init = function (from) {
                from = from || this;
                //解析显示限制
                // DataParseUtil.parseDatas(this, from, 0, 3, "showlimit", "showtype", "showlimits");
                //解析功能使用限制
                // DataParseUtil.parseDatas(this, from, 0, 3, "limit", "limittype", "limits");
            };
            return BaseMCfg;
        }());
        mvc.BaseMCfg = BaseMCfg;
        __reflect(BaseMCfg.prototype, "core.mvc.BaseMCfg");
    })(mvc = core.mvc || (core.mvc = {}));
})(core || (core = {}));
//# sourceMappingURL=BaseMCfg.js.map