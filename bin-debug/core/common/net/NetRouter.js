var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     *
     * @author builder
     *
     */
    var NetRouter = (function () {
        function NetRouter() {
            this.dispatchList = [];
            this._listenerMaps = {};
        }
        /**
         * 注册一cmd侦听;
         * @param cmd      协议号
         * @param handler   处理器
         * @param priority  越大越优先
         * @param once      是否只执行一次
         * @return boolean true 做为新的兼听添加进去，false 原来就有处理器
         *
         */
        NetRouter.prototype.register = function (cmd, handler, priority, once) {
            if (priority === void 0) { priority = 0; }
            if (once === void 0) { once = false; }
            var listenerMaps = this._listenerMaps;
            var netBin = { handler: handler, priority: priority, once: once };
            var list = listenerMaps[cmd];
            if (!list) {
                list = [];
                listenerMaps[cmd] = list;
                list.push(netBin);
            }
            else {
                var i;
                var len = list.length;
                //=====同样的CODE 同样的Function 不会被注册多次=====
                for (i = 0; i < len; i++) {
                    var temp = list[i];
                    if (temp.handler == handler) {
                        if (temp.priority == priority) {
                            return false;
                        }
                        //新的同指令，同处理器的函数会被新的once,priority属性覆盖
                        list.splice(i, 1);
                        len--;
                        break;
                    }
                }
                for (i = 0; i < len; i++) {
                    if (priority > list[i].priority) {
                        list.splice(i, 0, netBin);
                        return true;
                    }
                }
                list[len] = netBin;
            }
            return true;
        };
        /**
         * 删除兼听处理器
         * @param cmd      协议号
         * @param handler   处理器
         * @return boolean true 删除成功  <br/>
         *                 false 没有这个兼听
         */
        NetRouter.prototype.remove = function (cmd, handler) {
            var listenerMaps = this._listenerMaps;
            var list = listenerMaps[cmd];
            if (!list) {
                return false;
            }
            var len = list.length;
            for (var i = 0; i < len; i++) {
                if (list[i].handler == handler) {
                    list.splice(i, 1);
                    //如果没有项了就清理;
                    if (len == 1) {
                        delete listenerMaps[cmd];
                    }
                    return true;
                }
            }
            return false;
        };
        /**
        * 调用列表
        */
        NetRouter.prototype.dispatch = function (data) {
            var cmd = data.cmd;
            var list = this._listenerMaps[cmd];
            if (!list) {
                return;
            }
            var idx = 0;
            var dispatchList = this.dispatchList;
            var bin;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                bin = list_1[_i];
                dispatchList[idx++] = bin;
            }
            for (var i = 0; i < idx; i++) {
                bin = dispatchList[i];
                bin.handler(data);
                if (bin.once) {
                    this.remove(cmd, bin.handler);
                }
                if (data.stopPropagation) {
                    break;
                }
            }
        };
        return NetRouter;
    }());
    core.NetRouter = NetRouter;
    __reflect(NetRouter.prototype, "core.NetRouter");
    ;
})(core || (core = {}));
//# sourceMappingURL=NetRouter.js.map