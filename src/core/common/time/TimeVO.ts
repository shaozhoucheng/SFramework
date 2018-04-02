module core {
    /**
     * TimveVO
     */
    export class TimeVO {
        /**
         * 配置的小时
         * 
         * @type {number}
         */
        public hour: number;
        /**
         * 配置的分钟
         * 
         * @type {number}
         */
        public minute: number;

        /**
         * 小时和分钟的时间偏移
         * 
         * @type {number}
         */
        public time: number;
        /**
         * 日期原始字符串
         */
        public strTime: string;

        constructor(timeStr?: string) {
            if (timeStr) {
                this.decode(timeStr);
            }
        }

        /**
         * 从配置中解析
         * 
         * @param {number} strTime 通过解析器解析的数据
         */
        public decode(strTime: string) {
            this.strTime = strTime;
            var timeArr: string[] = strTime.split(":");
            if (timeArr.length >= 2) {
                this.hour = +timeArr[0];
                this.minute = +timeArr[1];
                this.time = this.hour * DateUtils.ONE_HOUR + this.minute * DateUtils.ONE_MINUTE;
            }
            else {
                ThrowError("时间格式不正确，不为HH:mm格式，当前配置：" + strTime);
            }
        }

    }
}