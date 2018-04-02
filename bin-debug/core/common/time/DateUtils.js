var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * DateUtils
     */
    var DateUtils = (function () {
        function DateUtils() {
        }
        /**
         * 初始化没有服务器的情况，取本地时间和时区进行初始化
         *
         * @static
         */
        DateUtils.initNoServer = function () {
            var d = new Date();
            DateUtils.initServerTime(d.getTime(), d.getTimezoneOffset());
        };
        /**
         * 初始化服务器时间
         *
         * @static
         * @param {number} time 服务器时间戳
         * @param {number} timezoneOffset 服务器基于UTC的时区偏移
         */
        DateUtils.initServerTime = function (time, timezoneOffset) {
            DateUtils._utcOffset = timezoneOffset;
            this.setServerTime(time);
        };
        /**
         * 设置服务器时间
         * 用于同步服务器时间
         * @static
         * @param {number} time
         */
        DateUtils.setServerTime = function (time) {
            var delta = time - Date.now();
            DateUtils._deltaTime = delta;
            DateUtils._serverUTCTime = delta + DateUtils._utcOffset;
        };
        /**
         * 取得服务器与本地时间之间的偏移时间
         * qu同步服务器时间
         * @static
         * @param {number} time
         */
        DateUtils.getServerOfssetTime = function () {
            return DateUtils._deltaTime;
        };
        Object.defineProperty(DateUtils, "serverUTCTime", {
            /**
             * 通过UTC偏移过的当前时间戳 这是utc时间戳做显示
             *
             * @static
             */
            get: function () {
                return DateUtils._serverUTCTime + Date.now();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateUtils, "serverTime", {
            /**
             * 服务器时间
             * @readonly
             * @static
             *
             * @memberOf DateUtils
             */
            get: function () {
                return DateUtils._deltaTime + Date.now();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 项目中，所有时间都需要基于UTC偏移处理
         *
         * @static
         * @param {number} utcTime (description)
         * @param {string} format (description)
         * @returns (description)
         */
        DateUtils.getFormatTime = function (utcTime, format) {
            var d = DateUtils.sharedDate;
            d.setTime(utcTime);
            return d.format(format, true);
        };
        /**
         * 获取指定时间的当天结束(23:59:59'999)UTC强制偏移时间戳
         *
         * @static
         * @param {number} [utcTime] 指定的utc偏移后的时间，不设置时间，则取当前服务器时间
         * @returns {number} 指定时间的当天结束(23:59:59'999)UTC强制偏移时间戳
         */
        DateUtils.getDayEnd = function (utcTime) {
            if (utcTime === void 0)
                utcTime = DateUtils.serverTime;
            var d = DateUtils.sharedDate;
            d.setTime(utcTime);
            d.setUTCHours(23, 59, 59, 999);
            return d.getTime();
        };
        /**
         * 获取指定时间的当天开始的UTC(0:0:0'0)强制偏移时间戳
         *
         * @static
         * @param {number} [utcTime] 指定的utc偏移后的时间，不设置时间，则取当前服务器时间
         * @returns {Date} 指定时间的当天开始的UTC(0:0:0'0)强制偏移时间戳
         */
        DateUtils.getDayStart = function (utcTime) {
            if (utcTime === void 0)
                utcTime = DateUtils.serverTime;
            var d = DateUtils.sharedDate;
            d.setTime(utcTime);
            d.setUTCHours(0, 0, 0, 0);
            return d.getTime();
        };
        /**
         * 将服务器有偏移量的时间戳，转换成显示时间相同的UTC时间戳，用于做显示
         *
         * @static
         * @param {number} time 正常的时间戳
         * @returns {number} UTC偏移后的时间戳
         */
        DateUtils.getUTCTime = function (time) {
            return time + DateUtils._utcOffset;
        };
        /**
         * 显示倒计时
         *
         * @static
         * @param {number} leftTime 剩余时间
         * @param {{ d?: string, h?: string, m?: string, s?: string }} format 倒计时修饰符，
         * format 示例：{d:"{0}天",h:"{0}小时",m:"{0}分",s:"{0}秒"}
         */
        DateUtils.getCountdown = function (leftTime, format) {
            var out = "";
            var tmp = format.d;
            if (tmp) {
                var day = Math.floor(leftTime / 86400000); //DateUtils.ONE_DAY;
                leftTime = leftTime - day * 86400000;
                out += tmp.substitute(zeroize(day));
            }
            tmp = format.h;
            if (tmp) {
                var hour = Math.floor(leftTime / 3600000); //DateUtils.ONE_HOUR
                leftTime = leftTime - hour * 3600000;
                out += tmp.substitute(zeroize(hour));
            }
            tmp = format.m;
            if (tmp) {
                var minute = Math.floor(leftTime / 60000); //DateUtils.ONE_MINUTE
                leftTime = leftTime - minute * 60000;
                out += tmp.substitute(zeroize(minute));
            }
            tmp = format.s;
            if (tmp) {
                var second = Math.floor(leftTime / 1000);
                out += tmp.substitute(zeroize(second));
            }
            return out;
        };
        DateUtils.sharedDate = new Date();
        /**
         * 一分种 60000
         */
        DateUtils.ONE_MINUTE = 60000;
        /**
         * 半小时 1800000
         */
        DateUtils.HALF_HOUR = 1800000;
        /**
         * 一小时 3600000
         */
        DateUtils.ONE_HOUR = 3600000;
        /**
         * 一天 86400000
         */
        DateUtils.ONE_DAY = 86400000;
        return DateUtils;
    }());
    core.DateUtils = DateUtils;
    __reflect(DateUtils.prototype, "core.DateUtils");
})(core || (core = {}));
//# sourceMappingURL=DateUtils.js.map