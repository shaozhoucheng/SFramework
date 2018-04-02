module core {
    export const enum ThrowErrorConst {
        /**
         * 存储在内存中的错误数据的最大条目
         */
        MAX_COUNT = 1000
    }
	/**
	 * 错误处理
	 * @author builder
	 *
	 */
    export class ThrowErrorHelper {

		/**
		 * 内存中存储的错误数据信息
		 * 
		 */
        private static errorMsg: string[] = [];

        /**
         * 获取错误信息的数组，以便玩家提交错误信息
         */
        public static getErrorMsg() {
            return this.errorMsg;
        }

        /**
         * 在内存中存储报错数据
         * @param msg
         * @param atWho 如果参数是数字 0 前端
         *                           1 后端
         *                           2 策划
         *              如果参数是字符串，则通过字符串当作账号，弹窗给这个人
         * @private
         */
        static getMsg(msg: string, atWho: (number)[]): string {
            var at = "";
            var atConfig = ["@前端", "@后端", "@策划"];
            for (let i of atWho) {
                if (DEBUG) {
                    if (typeof i === "string") {

                    }
                }

                if (i in atConfig) {
                    at += atConfig[i];
                }
            }
            return new Date().format("[yyyy-MM-dd HH:mm:ss]", true) + "[报错信息：]" + msg + at;
        }

        /**
         * 在内存中存储报错数据
         * @param msg
         * @param atWho
         *
         */
        public static pushMsg(msg: string, atWho: number[]): string {
            var errorMsg = this.errorMsg;
            if (errorMsg.length > ThrowErrorConst.MAX_COUNT) {
                errorMsg.shift();
            }
            var msg = this.getMsg(msg, atWho);
            errorMsg.push(msg);
            mvc.Facade.simpleDispatch(EventConst.MODULE_DEBUG,msg);
            return msg;
        }
    }
}
