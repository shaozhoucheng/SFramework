var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * TimveVO
     */
    var TimeVO = (function () {
        function TimeVO(timeStr) {
            if (timeStr) {
                this.decode(timeStr);
            }
        }
        /**
         * 从配置中解析
         *
         * @param {number} strTime 通过解析器解析的数据
         */
        TimeVO.prototype.decode = function (strTime) {
            this.strTime = strTime;
            var timeArr = strTime.split(":");
            if (timeArr.length >= 2) {
                this.hour = +timeArr[0];
                this.minute = +timeArr[1];
                this.time = this.hour * core.DateUtils.ONE_HOUR + this.minute * core.DateUtils.ONE_MINUTE;
            }
            else {
                core.ThrowError("时间格式不正确，不为HH:mm格式，当前配置：" + strTime);
            }
        };
        return TimeVO;
    }());
    core.TimeVO = TimeVO;
    __reflect(TimeVO.prototype, "core.TimeVO");
})(core || (core = {}));
//# sourceMappingURL=TimeVO.js.map