module core.mvc {
	/**
	 * 模块面板
	 * @author 
	 *
	 */
	export interface IModulePanel extends eui.Component {
    	
    	 /**
    	  * 关联的模块ID
    	  */
    	 moduleID:string;

		 doScale(scale:number);

		 /**
		  * 排版方式
		  */
		 layoutType:number;

		 stageResize();
    	 
	}
}