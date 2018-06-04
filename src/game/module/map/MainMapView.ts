module shao.game {
    export class MainMapView extends egret.Sprite {
        private blockwidth: number = 236;
        private blockheight: number = 217;
        private mapwidth: number = 2832;
        private mapheight: number = 1302;
        private camerawidth: number = 738;
        private cameraheight: number = 454;
        public constructor() {
            super();
        }

        public get height()
        {
            return this.mapheight;
        }

        public get width()
        {
            return this.mapwidth;
        }

        /**
         * 
         * 显示中的地图
         * @private
         * @type {TileMap[]}
         */
        private _showing: TileMap[] = [];

        public setRect(movex:number,movey:number) {
            
        }

        public MoveTo(x:number,y:number)
        {
            x = x<this.camerawidth/2?0:x;
            // x= x>
        }

        public addTm(x: number, y: number, i: number, showing: TileMap[], pW: number, pH: number, container: egret.DisplayObjectContainer, flag: boolean = false) {
            // if (x > ec || x < sc) {
            //     // console.log(`${x} is out the size === ${args}`);
            //     return;
            // }
            // if (y > er || y < sr) {
            //     // console.log(`${y} is out the size === ${args}`);
            //     return;
            // }

            if (flag) {
                // mvc.Facade.simpleDispatch(EventConst.MAP_COUNT_START,tileCount);
            }
            let uri = this.getMapUri(x, y);
            let rm = ResourceManager;
            let tm = <TileMap>rm.getResource(uri);
            var txt = new egret.TextField();
            if (!tm) {
                tm = TileMap.getInstance();
                tm.reset(x, y, uri);
                tm.x = x * pW;
                tm.y = y * pH;
                if (!rm.regResource(uri, tm)) {
                    throw Error("资源注册失败");
                }
                // tileCount++;
                tm.load();
            }
            // txt.text = `{x = ${x}, y = ${y} + [ ${args}]}`
            // txt.textColor = 0xFFFFFF;
            // txt.size = 24;
            // txt.x = tm.x;
            // txt.y = tm.y;
            container.addChild(tm);
            // container.addChild(txt);

            // 舞台上的标记为静态
            tm.isStatic = true;
            showing[i++] = tm;
        }


        /**
         * 获取资源路径
         */
        public getMapUri(col: number, row: number): string {
            //测试处理
            var uri = ResPrefix.MapBlock + "japan_map_" + row + "_" + (col+"").zeroize(2) + Extension.JPG;
            return uri;
        }
    }

    /**
    * TileMap
    */
    export class TileMap extends egret.Bitmap implements IResource {
        /**
         * 地图块的列
         */
        private col: number;
        /**
         * 地图块的行
         */
        private row: number;

        /**
         * 资源唯一标识
         */
        private uri: string;

        /**
         * 
         * 是否为静态资源
         * @type {boolean}
         */
        public isStatic: boolean;

        public lastUseTime: number;

        /**
         * 
         * 资源路径
         * @type {string}
         */
        public url: string;

        get resID() {
            return this.uri;
        }


        constructor() {
            super();
        }

        reset(col: number, row: number, uri: string) {
            this.col = col;
            this.row = row;
            this.uri = uri;
            this.url = ConfigUtils.getResUrl(uri);
        }

        load() {
            RES.getResByUrl(this.url, this.loadComplete, this, RES.ResourceItem.TYPE_IMAGE);
        }

        /**
         * 资源加载完成
         */
        loadComplete(res: egret.Texture, key: string) {
            if (key == this.url) {
                this.texture = res;
            }
            // mvc.Facade.simpleDispatch(EventConst.MAP_COUNT_UPDATE);
        }

        dispose() {
            TileMap._pool.recycle(this);
        }

        onRecycle() {
            if (this.texture) {
                this.texture.dispose();
                this.texture = undefined;
            }

            RES.destroyRes(this.url);

            this.uri = undefined;
            this.url = undefined;
        }

        private static _pool: RecyclablePool<TileMap> = new RecyclablePool(TileMap);

        static getInstance(): TileMap {
            return this._pool.getInstance();
        }
    }
}