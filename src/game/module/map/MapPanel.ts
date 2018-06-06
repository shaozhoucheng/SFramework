module shao.game {
    export class MapPanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/map/map.exml";
            // this.skinName = "LoginPanel";
            this._key = "map"
            // this._thmName = "map/map_thm.json"
        }

        public rect_mask: eui.Rect;
    }
}