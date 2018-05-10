module core.game {
    export class StoryScene extends BaseScene {
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
            $facade.toggle(ModuleId.ConfirmAgree, 1);
        }

        /**
         * 退出Scene调用
         */
        public onExit(): void {
            super.onExit();
        }
    }
}