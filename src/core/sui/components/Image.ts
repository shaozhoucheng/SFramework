module core.sui {
	import Event = egret.Event;
	/**
	 * 图片
	 * 外部加载
	 * @pb 
	 *S
	 */
	export class Image extends egret.Bitmap {

		/**
         * 资源唯一标识
         */
		uri: string;
		/**
		* 是否已加载
		*/
		isLoaded: boolean;

		constructor() {
			super();
			this.isLoaded = false;
			this.on(Event.ADDED_TO_STAGE, this.addedToStage, this);
			this.on(Event.REMOVED_FROM_STAGE, this.removedFromStage, this);
			this.on(EventConst.BMP_LOAD_COMPLETE, this.onBmpComplete, this);
		}

		protected onBmpComplete() {
			this.off(<any>EventConst.BMP_LOAD_COMPLETE, this.onBmpComplete, this);
			this.isLoaded = true;
			if (this.texture) {
				if (!this.width)
					this.width = this.texture.$getTextureWidth();
				if (!this.height)
					this.height = this.texture.$getTextureHeight();
			}
		}

		addedToStage() {
			if (this.uri) {
				let res = ResourceManager.getTextureRes(this.uri);
				if (res) {
					res.bind(this);
					res.load();
				}
			}
		}

		removedFromStage() {
			if (this.uri) {
				let res = <TextureResource>ResourceManager.getResource(this.uri);
				if (res) {
					res.loose(this);
				}
			}
		}

		/**
		 * 设置资源标识
		 */
		public set source(value: string) {
			if (this.uri == value)
				return;
			if (this.uri) {//解除资源绑定
				this.removedFromStage();
			}
			this.uri = value;
			if (value) {
				if (this.stage) {
					this.addedToStage();
				}
			}
			else {
				this.texture = undefined;
			}
		}

		/**
		 * 销毁图片
		 */
		public dispose() {
			this.removedFromStage();
			this.off(Event.ADDED_TO_STAGE, this.addedToStage, this);
			this.off(Event.REMOVED_FROM_STAGE, this.removedFromStage, this);
			this.off(<any>EventConst.BMP_LOAD_COMPLETE, this.onBmpComplete, this);
			removeDisplay(this);
		}

		/**
		 * 设置size
		 * 
		 * @param {egret.Rectangle} r
		 * 
		 * @memberOf Image
		 */
		public setRect(r: egret.Rectangle) {
			this.x = r.x;
			this.y = r.y;
			this.width = r.width;
			this.height = r.height;
		}

	}
}