module shao.game {
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

        Story: "o/story/",
        Card: "o/card/",
    };
}