module shao.game {
    export class MapPanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/map/MapPanel.exml";
            // this.skinName = "LoginPanel";
            this._key = "Map"
            this._thmName = "resource/ui/skin/map/map_thm.json"
        }

        public rect_mask: eui.Rect;
    }
}