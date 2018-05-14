module shao.game {
    export class StoryPanelMediator extends mvc.Mediator {
        constructor() {
            super(ModuleId.Story);
        }

        public $view: StoryPanel;

        // public status: number = 0;

        protected init() {
            this.view = new StoryPanel;
            ResizeManager.getInstance().add(this.view, sui.LayoutType.MIDDLE_CENTER);
            //这里加事件关注
        }

        private teacher: sui.Image;

        private headList: sui.PageList<number, StoryHeroRender>

        private cardBgRender: CardBgItemRender;

        private talks = "闲话少说，我来介绍一下你在这个世界的职责吧。\n在这个游戏中，你自己本身无需战斗。\n而你的职责，一言以蔽之，\n就是收集武将，组成佣兵团“御雇众”，\n惩处山贼、忍者等，\n或与其他御雇众一决胜负，扬名天下。"

        protected afterAllReady() {
            let view = this.$view;
            view.btn_next.visible = false;
            let t = this.teacher = new sui.Image;
            view.addChild(t)
            t.x = 32; t.y = 200;
            this.talkLabel = new sui.TalkLabel(view.txt_talk, this.talks, 50, this.onTalkComplete, this);
            let list = this.headList = new sui.PageList<number, StoryHeroRender>(StoryHeroRender, 100, 100, false)
            view.addChild(list);
            list.moveTo(400, 100)
            let cardbg = this.cardBgRender = new CardBgItemRender();
            view.addChild(cardbg)
            cardbg.x = 400; cardbg.y = 220;
        }

        private talkLabel: sui.TalkLabel

        private onNextBtnTouch(e?: egret.TouchEvent) {
            this.headList.displayList([171, 61, 128, 155, 84])
        }

        private onTalkComplete() {
            let view = this.$view;
            view.btn_next.visible = true;
        }

        public showTalk() {
            this.talkLabel.playTalk()
        }

        public awake() {
            let view = this.$view;
            view.btn_next.bindTouch(this.onNextBtnTouch, this);
            this.teacher.source = game.ResPrefix.Story + "teacher_01.png";
            this.showTalk()
        }



        public sleep() {
            let view = this.$view;
            view.btn_next.looseTouch(this.onNextBtnTouch, this);

        }
    }
}