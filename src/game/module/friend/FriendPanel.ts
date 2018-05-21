module shao.game {
    export class FriendPanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/friend/FriendPanel.exml";
            // this.skinName = "LoginPanel";
            this._key = "Friend"
            this._thmName = "resource/ui/skin/friend/friend_thm.json"
        }

        public tg_friend: eui.ToggleSwitch;
        public maskrect: eui.Rect;
        public group_tween: eui.Group;
    }
}