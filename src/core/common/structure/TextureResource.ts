module shao {

    import Bitmap = egret.Bitmap;
    /**
     * 
     * 纹理资源
     * @export
     * @class TextureResource
     * @implements {IResource}
     */
    export class TextureResource implements IResource {
        /**
         * 最后使用的时间戳
         */
        lastUseTime: number;
        /**
         * 资源id
         */
        resID: string;

        /**
         * 资源最终路径
         */
        url: string;

        /**
         * 
         * 是否为静态不销毁的资源
         * @type {boolean}
         */
        public get isStatic(): boolean {
            return this._list.length > 0;
        }

        private _tex: egret.Texture;

        /**
         * 
         * 绑定的对象列表
         * @private
         * @type {Bitmap[]}
         */
        private _list: Bitmap[] = [];

        /**
         * 
         * 绑定一个目标
         * @param {Bitmap} target
         */
        public bind(bmp: Bitmap) {
            if (this._tex) {
                bmp.texture = this._tex;
            }
            this._list.pushOnce(bmp);
            this.lastUseTime = Global.now;
        }

        /**
         * 
         * 解除目标的绑定
         * @param {Bitmap} target
         */
        public loose(bmp: Bitmap) {
            this._list.remove(bmp);
            this.lastUseTime = Global.now;
        }

        load() {
            RES.getResByUrl(this.url, this.loadComplete, this, RES.ResourceItem.TYPE_IMAGE);
        }

        /**
         * 资源加载完成
         */
        loadComplete(res: egret.Texture, key: string) {
            if (key == this.url) {
                this._tex = res;
                if (this._list && this._list.length) {
                    for (let bmp of this._list) {
                        if (!bmp) continue;
                        bmp.texture = res;
                        bmp.dispatchEventWith(EventConst.BMP_LOAD_COMPLETE);
                    }
                }
            }
        }

        /**
         * 销毁资源
         */
        dispose() {
            if (this._tex) {
                this._tex.dispose();
                this._tex = undefined;
            }
            this._list.forEach(bmp => {
                if (bmp instanceof sui.Image) {
                    (bmp as sui.Image).dispose();
                }
            });
            this._list.length = 0;
        }
    }
}