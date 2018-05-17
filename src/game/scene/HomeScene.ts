module shao.game {
    export class HomeScene extends BaseScene {
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
            $facade.toggle(ModuleId.Top);
            $facade.toggle(ModuleId.Home);
        }

        /**
         * 退出Scene调用
         */
        public onExit(): void {
            super.onExit();
        }
    }
}