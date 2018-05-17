module shao.game{
    export class JianZhuDB
    {
        public constructor() {
            this.init();
        }

        private init() {
            var dic = DataLocator.getData(game.ConfigKey.JianZhu);
            this._jianzhuMaps = dic;
        }

        private _jianzhuMaps: { [heroid: number]: JianZhuCfg };

        public getCfgById(id: number) {
            return this._jianzhuMaps[id];
        }
    }
}