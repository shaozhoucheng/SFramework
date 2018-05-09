module core.game {
    export interface ResPrefixConstructor {
        /**
         * 刀光前缀
         */
        DaoGuang: string;
        /**
         * 角色武器
         */
        Weapon: string;
        /**
         * 翅膀前缀
         */
        Wing: string;
        /**
        * 头像
        */
        F: string;

        /**
        * 按钮美术字
        */
        P: string;

        /**
         * 角色图片
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        R: string;

        /**
         * 功能模块所需图片
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        O: string;


        /**
         * 物品掉落Icon
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        IM: string;


    }


    ResPrefix = {
        Cloth: "n/a/",
        DaoGuang: "d/",
        Weapon: "n/w/",
        Wing: "n/c/",
        ANI: "ef/",
        I: "i/",
        F: "f/",
        P: "p/",
        R: "r/",
        O: "o/",
        IM: "im/",

        ClanFuben: "o/clanfuben/",
        ChengZhang: "o/chengzhang/",
        ClanTask: "o/clantask/",
        NewModule: "o/newmodule/",
        TuJing: "o/tujing/",
        ChengJiu: "o/chengjiu/",
        Fuben: "o/fuben/",
        CreateRole: "o/createrole/",
        DuanZao: "o/duanzao/",
        SevenDay: "o/sevenday/",
        Fabao: "o/fabao/",
        Activity: "o/activity/",
        Center: "o/center/",
        Recharge: "o/recharge/",
        FailResult: "o/failresult/",
        BigBg: "o/bigbg/",
        IconTip: "o/icontip/",
        TimeActivity: "o/timeactivity/",
        Challenge: "o/challenge/",
        Fuli: "o/fuli/",
        YingHun: "o/yinghun/",
        RiChang: "o/richang/",
        GongCheng:"o/gongcheng/",
        RenderBg:"o/renderbg/",
        MiddleBg:"o/middlebg/",
        ClanManage:"o/clanmanage/",
        Attribute:"o/attribute/",
        ModuleOpen:"o/moduleopen/",
        Title:"o/title/",
        Tisheng:"o/tisheng/",
        Vip:"o/vip/",
        ChuanQiZhiZun:"o/chuanqizhizun/",
        KaiFu:"o/kaifu/",
        GuanXingTai:"o/guanxingtai/",
        ChiBang: "o/chibang/",
        ChengZhu: "o/chengzhu/",
        Chat: "o/Chat/",
    };
}