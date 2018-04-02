module core.mvc {
	/**
	 * 模块处理器的基类 
	 * 类型0的模块处理器
	 * @author 
	 *
	 */
	export class ModuleHandler {

		/**
		 * 打开某个模块
		 * @param cfg
		 */
		public open(cfg: IModuleCfg, ...args): void {
		}


        /**
         * 关闭某个模块
         * @param cfg
         *
         */
		public close(cfg: IModuleCfg, ...args): void {

		}
	}
}
