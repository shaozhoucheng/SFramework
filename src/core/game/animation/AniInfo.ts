module shao.game {
	/**
	 * 用于处理无方向的动画信息
	 * @author builder
	 *
	 */
    export class AniInfo {
    	/**
    	 * 加载状态
    	 */
        public state: RequestState = RequestState.UNREQUEST;

        protected _refList: AniRender[];

        public pngurl: string;
        protected jsonurl: string;


        /**
         * mc的唯一标识
         */
        public key: string;


        public constructor() {

        }


		/**
		 * 绑定渲染器
		 * @param render
		 */
        public bind(render: AniRender) {
            let state = this.state;
            if (state != RequestState.COMPLETE) {
                if (!this._refList) {
                    this._refList = [];
                }
                this._refList.push(render);
                if (state == RequestState.UNREQUEST) {
                    this.loadData();
                }
            }
        }

        /**加载数据 */
        protected loadData() {
            // if (this.key == AniDefine.BUTTON_EFFECT_LONG) {
            //     console.log(`加载：${this.key}`);
            // }
            let uri = ResPrefix.ANI + this.key + "/" + "d.json"//+ UnitResource.DATA_JSON;
            this.jsonurl = ConfigUtils.getResUrl(uri);
            uri = ResPrefix.ANI + this.key + "/" + "d.png"
            this.pngurl = ConfigUtils.getResUrl(uri);
            RES.getResByUrl(this.jsonurl, this.dataLoadComplete, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl(this.pngurl, this.dataLoadComplete, this, RES.ResourceItem.TYPE_IMAGE);
            this.state = RequestState.REQUESTING;
        }

        public loadJson: any;
        public loadPng: any;

		/**
         * 资源加载完成
         */
        dataLoadComplete(data: any[], key: string) {
            if (key == this.jsonurl) this.loadJson = data;
            if (key == this.pngurl) this.loadPng = data;
            if (!this.loadJson || !this.loadPng) return;
            // if (key == this.url) {
            //     if (data) {
            //         this.init(this.key, data);
            if (this._refList) {
                for (let render of this._refList) {
                    render.callback();
                }
            }
            // } else {// 不做加载失败的处理
            //     this.state = RequestState.COMPLETE;
            // }
            this._refList = undefined;
            // }
            this.state = RequestState.COMPLETE;
        }

		/**
		 * 和渲染器解除绑定
		 * @param render
		 */
        public loose(render: AniRender) {
            let _refList = this._refList;
            if (_refList) {
                _refList.remove(render);
            }
        }


        private _rawData: any;

        public init(key: string, data: any[]) {
            // super.init(key, data[0]);

            // let resID = ResPrefix.ANI + key;
            // var res: UnitResource = <UnitResource>ResourceManager.getResource(resID);
            // if (!res) {
            //     res = new UnitResource(resID, this.splitInfo);
            //     ResourceManager.regResource(resID, res);
            // }
            // res.decodeData(data[1]);

            // this._resources = res;

            // this.state = RequestState.COMPLETE;

            // this._rawData = data[1];
        }

        // getResource(uri?: string): UnitResource {
        //     // return <UnitResource>this._resources;
        //     if (!uri) {
        //         uri = ResPrefix.ANI + this.key;
        //     }
        //     var res: UnitResource = <UnitResource>ResourceManager.getResource(uri);
        //     if (!res) {
        //         res = new UnitResource(uri, this.splitInfo);
        //         res.decodeData(this._rawData);
        //         ResourceManager.regResource(uri, res);
        //     }
        //     return res;
        // }

        // public get actionInfo(): ActionInfo {
        //     if (!this.frames) {
        //         ThrowError(`${this.key}ANIframes为空`);
        //         return undefined;
        //     }
        //     return this.frames[0];
        // }
    }
}
