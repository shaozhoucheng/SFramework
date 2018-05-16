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
        private cardReverseRender: CardReverseItemRender;

        private talk1 = "闲话少说，我来介绍一下你在这个世界的职责吧。\n在这个游戏中，你自己本身无需战斗。\n而你的职责，一言以蔽之，\n就是收集武将，组成佣兵团“御雇众”，\n惩处山贼、忍者等，\n或与其他御雇众一决胜负，扬名天下。"
        private talk2 = "首先就以这5个人来战斗吧。\n当然，有新伙伴加入时，\n努力雇佣、培养，\n创建更强的佣兵团吧！"

        private step: number = 0;

        protected afterAllReady() {
            let view = this.$view;
            view.btn_next.visible = false;
            let t = this.teacher = new sui.Image;
            view.addChild(t)
            t.x = 32; t.y = 200;
            this.talkLabel = new sui.TalkLabel(view.txt_talk, 50, this);
            let list = this.headList = new sui.PageList<number, StoryHeroRender>(StoryHeroRender, 90, 90, false)
            view.addChild(list);
            list.moveTo(250, 200)
            list.on(sui.PageList.ITEM_SELECTED, this.onListItemSelect, this);
            let cardbg = this.cardBgRender = new CardBgItemRender();
            view.addChild(cardbg)
            cardbg.x = 250; cardbg.y = 280;
            let cardbg2 = this.cardReverseRender = new CardReverseItemRender();
            view.addChild(cardbg2)
            cardbg2.x = 466; cardbg2.y = 280;
            view.btn_next2.visible = false;
        }

        private onListItemSelect() {
            let id: number = this.headList.selectData;
            let cfg = getInstance(HeroDB).getCfgById(id);
            this.cardBgRender.setData(cfg);
            this.cardReverseRender.setData(cfg);
        }

        private talkLabel: sui.TalkLabel

        private onNextBtnTouch(e?: egret.TouchEvent) {
            let view = this.$view;
            this.step++;
            if (this.step == 1) {
                this.talkLabel.clearTalk();
                this.headList.displayList([171, 61, 128, 155, 84])
                view.btn_next.visible = false;
                view.btn_next2.visible = true;
            } else if (this.step == 3) {
                getInstance(SceneManager).runScene(SceneConst.Home);
            }
        }

        private onNext2BtnTouch(e?: egret.TouchEvent) {
            this.step++;
            let view = this.$view;
            if (this.step == 2) {
                this.headList.dispose();
                this.cardBgRender.visible = false;
                this.cardReverseRender.visible = false;
                view.btn_next2.visible = false;
                this.talkLabel.talk = this.talk2;
                this.talkLabel.CompleteFun = this.onTalk2Complete
                this.talkLabel.playTalk()
            }
        }

        private onTalk2Complete() {
            let view = this.$view;
            view.btn_next.visible = true;
        }


        private onTalkComplete() {
            let view = this.$view;
            view.btn_next.visible = true;
        }

        public showTalk() {
            this.talkLabel.talk = this.talk1;
            this.talkLabel.CompleteFun = this.onTalkComplete;
            this.talkLabel.playTalk()
        }

        public awake() {
            let view = this.$view;
            view.btn_next.bindTouch(this.onNextBtnTouch, this);
            view.btn_next2.bindTouch(this.onNext2BtnTouch, this);
            this.teacher.source = game.ResPrefix.Story + "teacher_01.png";
            this.showTalk()
        }



        public sleep() {
            let view = this.$view;
            view.btn_next.looseTouch(this.onNextBtnTouch, this);
            view.btn_next2.looseTouch(this.onNext2BtnTouch, this);
        }
    }
}