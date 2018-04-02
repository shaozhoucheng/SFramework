module core.mvc {
	/**
	 * 模块脚本，后续开发模块，分成多个模块文件
	 * @author builder
	 *
	 */
	export class ModuleScript {

        public constructor() {
        }
		
        /**
        * 脚本id
       */ 
        public id: string;
        /**
         * 加载状态
         */
        public state: RequestState = RequestState.UNREQUEST;
        
        
        /**
         * 回调列表
         */ 
        public callbacks: CallbackInfo[] = [];        

        /**
         * 已异步方式加载
         */
        public load() {
            if(this.state == RequestState.UNREQUEST) {
                let uri = Facade.Script.substitute(this.id);
                loadScript(uri,this.onScriptLoaded,this);
                this.state = RequestState.REQUESTING;
            }
        }
        
        /**
         * 配置加载完成之后
         */
        protected onScriptLoaded() {
            this.state = RequestState.COMPLETE;
            let facade = Facade.getInstance();
            let callbacks = this.callbacks.concat();
            this.callbacks.length = 0;
            for(let callback of callbacks){
                callback.execute();
            }
        }
	}
}
