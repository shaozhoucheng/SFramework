module shao.game {
    export class HeroDB {
        public constructor() {
            this.init();
        }

        private init() {
            var dic = DataLocator.getData(game.ConfigKey.Hero);
            this._heroMaps = dic;
        }

        private _heroMaps: { [heroid: number]: HeroCfg };

        public getCfgById(id: number) {
            return this._heroMaps[id];
        }
    }
}