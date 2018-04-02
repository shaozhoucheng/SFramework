var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * 请求限制
     * @author builder
     *
     */
    var RequestLimit = (function () {
        function RequestLimit() {
            // private static dic: { [index: string]: number } = {};
            this.map = new core.MapDict();
        }
        /**
         * @param o 锁定的对像(可以是任何类型,它会被当做一个key)
         * @param time 锁定对像 毫秒数
         * @return 是否已解锁 true为没有被限制,false 被限制了
         *
         */
        RequestLimit.prototype.check = function (o, time) {
            //szc 屏蔽
            // var map = this.map;
            // var t = map[o];
            // var now: number = Global.now;
            // if (!t) {
            //     map[o] = time + now;
            //     return true;
            // }
            if (time === void 0) { time = 100; }
            // var i: number = t - now;
            // if (i > 0) {
            //     // if (o == 815) {
            //     //     console.log("check back!")
            //     // }
            //     return false;
            // }
            // map[o] = time + now;
            return true;
        };
        /**
         * 删除
         * @param o
         *
         */
        RequestLimit.prototype.remove = function (o) {
            delete this.map[o];
        };
        /**
         * @param o 锁定的对像(可以是任何类型,它会被当做一个key)
         * @param time 锁定对像 毫秒数
         * @return 是否已解锁 true为没有被限制,false 被限制了
         *
         */
        RequestLimit.check = function (o, time) {
            if (time === void 0) { time = 100; }
            return RequestLimit.instance.check(o, time);
        };
        /**
         * 删除
         * @param o
         *
         */
        RequestLimit.remove = function (o) {
            return RequestLimit.instance.remove(o);
        };
        RequestLimit.instance = new RequestLimit();
        return RequestLimit;
    }());
    core.RequestLimit = RequestLimit;
    __reflect(RequestLimit.prototype, "core.RequestLimit");
})(core || (core = {}));
//# sourceMappingURL=RequestLimit.js.map