module core.game {
    export class LoginScene extends BaseScene {
        /**
         * 构造函数
         */
        public constructor() {
            super();
        }

        /**
         * 进入Scene调用
         */
        public onEnter(): void {
            super.onEnter();
            $facade.toggle(ModuleId.Login)
        }

        /**
         * 退出Scene调用
         */
        public onExit(): void {
            super.onExit();
            $facade.toggle(ModuleId.Notice,0)
            RES.destroyRes("Login")
            RES.destroyRes("ServerSelect")
        }
    }
}