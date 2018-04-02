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
    var mvc;
    (function (mvc) {
        /**
         * 用于和服务端通信的数据
         * @author builder
         */
        var Service = (function (_super) {
            __extends(Service, _super);
            function Service(name) {
                return _super.call(this, name) || this;
            }
            Service.prototype.onRegister = function () {
                this._ns = core.NetService.getInstance();
            };
            Service.prototype._startSync = function () {
                // Service默认为同步，如果需要收到服务端数据的，重写此方法
                this.selfReady();
            };
            /**
             * 注册消息引用
             *
             * @protected
             * @param {string | number} ref 消息实例的引用
             * @param cmds 注册的指令
             */
            Service.prototype.regMsg = function (ref) {
                var cmds = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    cmds[_i - 1] = arguments[_i];
                }
                var ns = this._ns;
                for (var _a = 0, cmds_1 = cmds; _a < cmds_1.length; _a++) {
                    var cmd = cmds_1[_a];
                    ns.regRecieveMSGRef(cmd, ref);
                }
            };
            /**
             * 注册消息处理函数
             *
             * @protected
             * @param {{ (data: NetData): void }} handler   消息处理函数
             * @param {number[]} cmds 注册的指令
             */
            Service.prototype.regHandler = function (handler) {
                var cmds = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    cmds[_i - 1] = arguments[_i];
                }
                var ns = this._ns;
                for (var _a = 0, cmds_2 = cmds; _a < cmds_2.length; _a++) {
                    var cmd = cmds_2[_a];
                    ns.register(cmd, handler);
                }
            };
            Service.prototype.removeHandler = function (cmd, handler) {
                this._ns.remove(cmd, handler);
            };
            /**
             * 发送消息
             *
             * @protected
             * @param {number} cmd 指令
             * @param {any} [data] 数据，简单数据(number,boolean,string)复合数据
             * @param {string} [msgType] 如果是复合数据，必须有此值
             * @param {number} [limit=200] 最短发送时间
             */
            Service.prototype.send = function (cmd, data, msgType, limit) {
                if (limit === void 0) { limit = 100; }
                this._ns.send(cmd, data, msgType, limit);
            };
            Service.prototype.firstRequest = function () {
            };
            return Service;
        }(mvc.Proxy));
        mvc.Service = Service;
        __reflect(Service.prototype, "core.mvc.Service");
    })(mvc = core.mvc || (core.mvc = {}));
})(core || (core = {}));
//# sourceMappingURL=Service.js.map