module core.mvc {
	/**
	 * 依赖其他数据的<br/>
	 * 依赖其他数据的东西，自身一定是异步的
	 * @author builder
	 *
	 */
	export interface IDepender extends IAsync {
    	
    	
    	  /**
    	   * 方便检查是否实现了IDepender
    	   */
        addDepend(async: IAsync);

	}
}
