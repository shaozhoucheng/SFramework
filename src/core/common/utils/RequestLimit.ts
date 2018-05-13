module shao {
	/**
	 * 请求限制
	 * @author builder
	 *
	 */
    export class RequestLimit {

        // private static dic: { [index: string]: number } = {};

       private map: MapDict<any, number> = new MapDict<any, number>();

        public constructor() {
        }

		/**
		 * @param o 锁定的对像(可以是任何类型,它会被当做一个key)
		 * @param time 锁定对像 毫秒数
		 * @return 是否已解锁 true为没有被限制,false 被限制了
		 *
		 */
        public check(o: any, time: number = 100) {
            //szc 屏蔽
            // var map = this.map;
            // var t = map[o];
            // var now: number = Global.now;
            // if (!t) {
            //     map[o] = time + now;
            //     return true;
            // }

            // var i: number = t - now;
            // if (i > 0) {
            //     // if (o == 815) {
            //     //     console.log("check back!")
            //     // }
            //     return false;
            // }
            // map[o] = time + now;
            return true;
        }

        /**
         * 删除 
         * @param o
         *
         */
        public remove(o: any): void {
            delete this.map[o];
        }


        private static instance: RequestLimit = new RequestLimit();

        /**
		 * @param o 锁定的对像(可以是任何类型,它会被当做一个key)
		 * @param time 锁定对像 毫秒数
		 * @return 是否已解锁 true为没有被限制,false 被限制了
		 *
		 */
        public static check(o: any, time: number = 100) {
            return RequestLimit.instance.check(o, time);
        }

        /**
         * 删除 
         * @param o
         *
         */
        public static remove(o: any): void {
            return RequestLimit.instance.remove(o);
        }
    }
}
