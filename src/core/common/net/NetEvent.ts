module core {
	/**
	 * 网络事件的常量集
	 * @author 
	 *
	 */
	export class NetEvent{
    	
    	/**
    	 * 登录成功
    	 */ 
        public static LOGIN_COMPLETE ="LOGIN_COMPLETE";

        /**
         * 登录失败
         */ 
        public static LOGIN_FAILED = "LOGIN_FAILED";

		/**
    	 * WS连接成功
    	 */ 
        public static WEB_COMPLETE ="WEB_COMPLETE";

		/**
    	 * WS连接失败
    	 */ 
        public static WEB_FAILED ="WEB_FAILED";

	}
}
