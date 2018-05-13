module shao {
	/**
     * DateUtils
     */
	export class DateUtils {
		public static sharedDate = new Date();
        /**
		 * 一分种 60000
		 */
		public static ONE_MINUTE = 60000;
		/**
		 * 半小时 1800000
		 */
		public static HALF_HOUR = 1800000;
		/**
		 * 一小时 3600000
		 */
		public static ONE_HOUR = 3600000;
		/**
		 * 一天 86400000
		 */
		public static ONE_DAY = 86400000;

		/**
		 * 基于UTC的时间偏移
		 * 
		 * @private
		 * @static
		 * @type {number}
		 */
		private static _utcOffset: number;

		/**
		 * 服务器时间与本地时间之间的utc时间偏移量
		 * 
		 * @private
		 * @static
		 * @type {number}
		 */
		private static _serverUTCTime: number;

		/**
		 * 服务器与本地时间之间的偏移时间
		 * @private
		 * @static
		 * @type {number}
		 * @memberOf DateUtils
		 */
		private static _deltaTime: number;


		/**
		 * 初始化没有服务器的情况，取本地时间和时区进行初始化
		 * 
		 * @static
		 */
		public static initNoServer() {
			let d = new Date();
			DateUtils.initServerTime(d.getTime(), d.getTimezoneOffset());
		}

		/**
		 * 初始化服务器时间
		 * 
		 * @static
		 * @param {number} time 服务器时间戳
		 * @param {number} timezoneOffset 服务器基于UTC的时区偏移
		 */
		public static initServerTime(time: number, timezoneOffset: number) {
			DateUtils._utcOffset = timezoneOffset;
			this.setServerTime(time);
		}

		/**
		 * 设置服务器时间
		 * 用于同步服务器时间
		 * @static
		 * @param {number} time
		 */
		public static setServerTime(time: number) {
			let delta = time - Date.now();
			DateUtils._deltaTime = delta;
			DateUtils._serverUTCTime = delta + DateUtils._utcOffset;
		}

        /**
		 * 取得服务器与本地时间之间的偏移时间
		 * qu同步服务器时间
		 * @static
		 * @param {number} time
		 */
		public static getServerOfssetTime() {
			return DateUtils._deltaTime;
		}

		/**
		 * 通过UTC偏移过的当前时间戳 这是utc时间戳做显示
		 * 
		 * @static
		 */
		public static get serverUTCTime() {
			return DateUtils._serverUTCTime + Date.now();
		}

		/**
		 * 服务器时间
		 * @readonly
		 * @static
		 * 
		 * @memberOf DateUtils
		 */
		public static get serverTime() {
			return DateUtils._deltaTime + Date.now();
		}

		/**
		 * 项目中，所有时间都需要基于UTC偏移处理
		 * 
		 * @static
		 * @param {number} utcTime (description)
		 * @param {string} format (description)
		 * @returns (description)
		 */
		public static getFormatTime(utcTime: number, format: string) {
			let d = DateUtils.sharedDate;
			d.setTime(utcTime);
			return d.format(format, true);
		}


		/**
		 * 获取指定时间的当天结束(23:59:59'999)UTC强制偏移时间戳
		 * 
		 * @static
		 * @param {number} [utcTime] 指定的utc偏移后的时间，不设置时间，则取当前服务器时间
		 * @returns {number} 指定时间的当天结束(23:59:59'999)UTC强制偏移时间戳
		 */
		public static getDayEnd(utcTime?: number) {
			if (utcTime === void 0) utcTime = DateUtils.serverTime;
			let d = DateUtils.sharedDate;
			d.setTime(utcTime);
			d.setUTCHours(23, 59, 59, 999);
			return d.getTime();
		}

		/**
		 * 获取指定时间的当天开始的UTC(0:0:0'0)强制偏移时间戳
		 * 
		 * @static
		 * @param {number} [utcTime] 指定的utc偏移后的时间，不设置时间，则取当前服务器时间
		 * @returns {Date} 指定时间的当天开始的UTC(0:0:0'0)强制偏移时间戳
		 */
		public static getDayStart(utcTime?: number) {
			if (utcTime === void 0) utcTime = DateUtils.serverTime;
			let d = DateUtils.sharedDate;
			d.setTime(utcTime);
			d.setUTCHours(0, 0, 0, 0);
			return d.getTime();
		}

		/**
		 * 将服务器有偏移量的时间戳，转换成显示时间相同的UTC时间戳，用于做显示
		 * 
		 * @static
		 * @param {number} time 正常的时间戳
		 * @returns {number} UTC偏移后的时间戳
		 */
		public static getUTCTime(time: number) {
			return time + DateUtils._utcOffset;
		}

		/**
		 * 显示倒计时
		 * 
		 * @static
		 * @param {number} leftTime 剩余时间
		 * @param {{ d?: string, h?: string, m?: string, s?: string }} format 倒计时修饰符，
		 * format 示例：{d:"{0}天",h:"{0}小时",m:"{0}分",s:"{0}秒"}
		 */
		public static getCountdown(leftTime: number, format: { d?: string, h?: string, m?: string, s?: string }) {
			let out = "";
			let tmp = format.d;
			if (tmp) {// 需要显示天
				let day = Math.floor(leftTime / 86400000);//DateUtils.ONE_DAY;
				leftTime = leftTime - day * 86400000;
				out += tmp.substitute(zeroize(day));
			}
			tmp = format.h;
			if (tmp) {// 需要显示小时
				let hour = Math.floor(leftTime / 3600000);//DateUtils.ONE_HOUR
				leftTime = leftTime - hour * 3600000;
				out += tmp.substitute(zeroize(hour));
			}
			tmp = format.m;
			if (tmp) {// 需要显示分钟
				let minute = Math.floor(leftTime / 60000);//DateUtils.ONE_MINUTE
				leftTime = leftTime - minute * 60000;
				out += tmp.substitute(zeroize(minute));
			}
			tmp = format.s;
			if (tmp) {
				let second = Math.floor(leftTime / 1000);
				out += tmp.substitute(zeroize(second));
			}
			return out;
		}
	}
}