module shao.game {
    export class FriendPanel extends sui.Panel {

        protected bindComponents() {
        }

        protected init() {
            this.skinName = "resource/ui/panel/friend/friend.exml";
            // this.skinName = "LoginPanel";
            this._key = "friend"
            // this._thmName = "friend/friend_thm.json"
        }

        public tg_friend: eui.ToggleSwitch;
        public maskrect: eui.Rect;
        public group_tween: eui.Group;
    }
}