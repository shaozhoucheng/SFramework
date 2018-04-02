module core {
    /**
     * 
     * 
     * @export
     * @enum {number}
     */
    export const enum EventConst {
        /**
         * 通知角标变更
         */
        Notification = -100,
        /****** 模块区段区段 -150 ~ -169 ***********************/
        /**
         * 模块检查器初始化完毕
         */
        MODULE_CHECKER_INITED = -150,
    	/**
		 * 尝试调用某个功能<br/>
		 * data 为功能ID
		 */
        MODULE_TRY_TOGGLE = -151,

        /**
        * 有功能，服务端要求临时关闭<br/>
        * data 为功能ID
        */
        MODULE_SERVER_CLOSE = -152,

        /**
        * 有临时关闭的功能，服务端要求再打开<br/>
        * data 为功能ID
        */
        MODULE_SERVER_OPEN = -153,

        /**
         * 模块显示状态发生改变发生改变<br/>
         * data 为剩余未显示的按钮数量
         */
        MODULE_SHOW_CHANGED = -154,

		/**
		 * 有模块需要检查是否会造成显示变化
		 */
        MODULE_NEED_CHECK_SHOW = -155,

		/**
		 * 有模块不符合显示的条件
		 * data 为功能ID
		 */
        MODULE_NOT_SHOW = -156,

		/**
		 * 有模块显示了
		 */
        MODULE_SHOW = -157,


        MODULE_DEBUG = -158,

        DATA_LOCATOR = -159
    }
}