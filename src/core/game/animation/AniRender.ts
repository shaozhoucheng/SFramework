module core.game {
    import Event = egret.Event;
    export enum AniPlayState {
        Standby = 0,
        Playing = 1,
        Recycled = 2
    }

    export class AniRender implements IRecyclable {
        /**
         * 0 初始化，未运行
         * 1 正在运行
         * 2 已回收
         */
        public state: AniPlayState = AniPlayState.Standby;

        protected _guid: number = 0;

        public _uri: string;

        onCompleteFunc: Function;

        /**
         * 特效标识
         */
        public get guid(): number {
            return this._guid;
        }

        public get uri(): string {
            return this._uri;
        }


        public displaymc: egret.MovieClip;

        public frameRate:number;

        /**
         * MovieClip资源加载类
         */
        protected _aniInfo: AniInfo;

        public constructor() {
            this.displaymc = new egret.MovieClip();
        }

        /**
         * 获取ANI动画
         * 
         * @static
         * @param {string} uri    动画地址
         * @param {number} [guid] 外部设置动画的guid
         * @returns (description)
         */
        public static getAni(uri: string, guid?: number) {
            if (!uri) return;
            // let aniDict: any = DataLocator.getData(ConfigKey.ANI);
            let aniDict = this.aniDict;
            if (!aniDict) aniDict = {};
            let aniInfo: AniInfo = aniDict[uri];
            if (!aniInfo) {
                aniInfo = new AniInfo();
                aniInfo.key = uri;
                aniDict[uri] = aniInfo;
                this.aniDict = aniDict;
            }
            // let display = ResourceBitmap.getInstance();
            let ani = this._pool.getInstance();
            ani._aniInfo = aniInfo;
            // ani.display = display;
            if (aniInfo.state == RequestState.COMPLETE) {
                ani.displaymc.movieClipData = getInstance(MCFactory).getMovieClipData(aniInfo.loadJson, aniInfo.loadPng, uri);
            } else {
                aniInfo.bind(ani);
            }
            ani._guid = guid === void 0 ? this.guid++ : guid;
            ani._uri = uri;
            this._renderByGuid[ani._guid] = ani;
            return ani;
        }



        public callback() {
            if (this._aniInfo) {
                let display = this.displaymc;
                let aniInfo = this._aniInfo;
                display.movieClipData = getInstance(MCFactory).getMovieClipData(aniInfo.loadJson, aniInfo.loadPng, this._uri);
                this.play(-1);
            }
        }

        public play(playTimes?: number) {
            let display = this.displaymc;
            this.state = AniPlayState.Playing;
            if (display.movieClipData) {
                display.play(playTimes);
                if(this.frameRate)
                {
                    display.frameRate = this.frameRate;
                }
            }
        }

        public recycle() {
            AniRender._pool.recycle(this);
        }

        public onRecycle() {
            // if (DEBUG) {
            //     if ($gm._recordAni) {
            //         delete $gm._aniRecords[this._guid];
            //     }
            // }

            delete AniRender._renderByGuid[this._guid];
            this.state = AniPlayState.Recycled;
            let display = this.displaymc;
            if (display) {
                display.movieClipData = undefined;
                removeDisplay(display);
            }
            if (this._aniInfo) {
                this._aniInfo.loose(this);
                this._aniInfo = undefined;
            }
            this.frameRate = 0;
            this._guid = 0;
        }


        /***********************************静态方法****************************************/
        public static _renderByGuid: { [index: number]: AniRender } = {};

        private static guid = 1;

        private static _pool: RecyclablePool<AniRender> = new RecyclablePool(AniRender);

        public static aniDict: { [key: string]: AniInfo };
    }
}