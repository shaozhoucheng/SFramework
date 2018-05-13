module shao.mvc {
    /**
     * 功能配置的基类
     * @author builder
     */
    export class BaseMCfg {

        /**
         * 模块对应面板，放置的容器标识
         */
        public containerID: number;

        /**
         * 当前显示状态
         */
        public showState: ModuleShowState = ModuleShowState.HIDE;

		/**
		 * 服务器认为此功能开放
		 */
        public serverOpen: boolean = true;

		/**
		 * 显示限制数据
		 */
        public showlimits: any[];

		/**
		 * 使用限制数据
		 */
        public limits: any[];

        /**
         * 
         * 子模块的id列表
         * @type {string[]}
         */
        public children: string[];

        constructor() {
        }

        protected init(from?: any) {
            from = from || this;
            //解析显示限制
            // DataParseUtil.parseDatas(this, from, 0, 3, "showlimit", "showtype", "showlimits");
            //解析功能使用限制
            // DataParseUtil.parseDatas(this, from, 0, 3, "limit", "limittype", "limits");
        }
    }
}