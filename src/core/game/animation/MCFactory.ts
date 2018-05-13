module shao.game {
    export class MCFactory {
        private _factorys: { [key: string]: egret.MovieClipDataFactory };

        public constructor() {
            this.init();
        }

        private init() {
            this._factorys = {};
        }

        public getMovieClipData(jsons, pngs, key): egret.MovieClipData {
            var mcFactory = this._factorys[key];
            if (!mcFactory) {
                mcFactory = new egret.MovieClipDataFactory(jsons, pngs);
                this._factorys[key] = mcFactory;
                return mcFactory.generateMovieClipData(key);
            } else {
                return mcFactory.generateMovieClipData(key);
            }
        }
    }
}