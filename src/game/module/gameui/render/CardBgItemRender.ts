module shao.game {
    export class CardBgItemRender extends sui.ListItemRender<HeroCfg>{

        private render: CodeCardBgItemRender;
        public constructor() {
            super();
            this.skin = this.render = new CodeCardBgItemRender();
        }

        private bgImage: sui.Image;
        private nameImage: sui.Image;
        private roleImage: sui.Image;
        private armyImage: sui.Image;
        private rareImage: sui.Image;
        private paImage: sui.Image;

        protected bindComponent() {
            super.bindComponent();
            let im = this.armyImage = new sui.Image;
            this.addChild(im);
            im.y = 280;
            im = this.paImage = new sui.Image;
            this.addChildAt(im, 0);
            im.x = 180; im.y = 10
            im = this.roleImage = new sui.Image;
            this.addChildAt(im, 0);
            // im.x = 20; im.y = 29
            im = this.nameImage = new sui.Image;
            this.addChildAt(im, 0);
            im.x = 180; im.y = 40
            im = this.rareImage = new sui.Image;
            this.addChildAt(im, 0);
            im = this.bgImage = new sui.Image;
            this.addChildAt(im, 0);

        }

        public setData(value: HeroCfg) {
            super.setData(value);
            if (!value) return;
            let render = this.render;
            render.txt_gong.text = value.bpropArr[0] + "";
            render.txt_fang.text = value.bpropArr[1] + "";
            render.txt_su.text = value.bpropArr[2] + "";
            render.txt_de.text = value.bpropArr[3] + "";
            render.txt_ce.text = value.bpropArr[4] + "";
            this.rareImage.source = game.ResPrefix.Card + CPath.rare + $appendPNG((value.rare + "").zeroize(2));
            this.armyImage.source = game.ResPrefix.Card + CPath.army + $appendPNG(value.army + "");
            this.paImage.source = game.ResPrefix.Card + CPath.element + $appendPNG((value.primeattribute + "").zeroize(2));
            this.roleImage.source = game.ResPrefix.Card + CPath.chara + $appendPNG((value.id + "").zeroize(5));
            this.nameImage.source = game.ResPrefix.Card + CPath.name + $appendPNG((value.id + "").zeroize(5));
            this.bgImage.source = game.ResPrefix.Card+CPath.bg+$appendJPG((value.rare + "").zeroize(2));
        }
    }
}