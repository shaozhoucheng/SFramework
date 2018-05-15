module shao.game {
    export class CardReverseItemRender extends sui.ListItemRender<HeroCfg>{

        private render: CodeCardReverseItemRender;
        private bgImage: sui.Image;
        public constructor() {
            super();
            this.skin = this.render = new CodeCardReverseItemRender();
        }


        protected bindComponent() {
            super.bindComponent();
            let im = this.bgImage = new sui.Image;
            this.addChildAt(im, 0)
        }

        public setData(value: HeroCfg) {
            super.setData(value);
            if (!value) return;
            let render = this.render;
            render.txt_name.text = value.name
            render.txt_nickname.text = value.nickname
            render.txt_ce.text = render.txt_de.text = render.txt_gong.text =
                render.txt_fang.text = render.txt_su.text = "Lv00";
            render.txt_dialogue.text = value.dialogue;
            render.txt_introduce.text = value.introduce;
            // render.txt_job.text= 
            render.txt_skillname0.text = render.txt_skillname1.text = render.txt_skillname2.text = "";
            render.txt_meritvalue.text = "功勋值：0";
            render.txt_realname.text = value.realname;
            render.txt_totalLevel.text = "修炼综合  Lv0 / 50";
            this.bgImage.source = game.ResPrefix.Card + CPath.reverse + $appendJPG((value.rare + "").zeroize(2));
        }
    }
}