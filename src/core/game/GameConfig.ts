/**
 * 游戏的常量的接口定义
 * 子项目自身实现接口
 * @author builder
 */
module core.game {
    /**
     * 配置key
     */
    export var ConfigKey: IConfigKey;

    export interface IConfigKey {
        /**
         * 角色动作数据
         */
        // PST: string;
        /**
         * 特效数据
         */
        // ANI: string;
        /**
         * 地图数据
         */
        // MAP: string;
    }

    /**
     * 资源前缀<br/>
     * 用于配置文件夹<br/>
     * 如果是/结尾<br/>
     * 目前测试使用的<br/>
     * Cloth为u/<br/>
     * ANI为a/<br/>
     */
    export var ResPrefix: ResPrefixConstructor;

    export interface ResPrefixConstructor {
        /**
         * 衣服/底图
         */
        Cloth: string;
        /**
         * 特效
         */
        ANI: string;

        /**
        * 道具icon
        */
        I: string;
    }

    export interface ResPrefixConstructor {

        /**
         * 帮派副本
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        ClanFuben: string;

        /**
        * 帮派副本
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        ClanTask: string;

        /**
         * 成长面板
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        ChengZhang: string;

        /* 新功能开启
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        NewModule: string;

        /*获取途径
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        TuJing: string;

        /* 成就
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        ChengJiu: string;

        /*副本
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        Fuben: string;

        /*创角
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        CreateRole: string;

        /*锻造
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        DuanZao: string;

        /*七日登陆礼
       * 
       * @type {string}
       * @memberOf ResPrefixConstructor
       */
        SevenDay: string;

        /*法宝
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        Fabao: string;

        /*运营活动
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        Activity: string;

        /*主界面list
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        Center: string;

        /*充值
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        Recharge: string;

        /*失败结算
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        FailResult: string;

        /*大底图
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        BigBg: string;

        /*主界面图标
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        IconTip: string;

        /*定时活动
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        TimeActivity: string;

        /*生存挑战
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        Challenge: string;

        /*福利
        * 
        * @type {string}
        * @memberOf ResPrefixConstructor
        */
        Fuli: string;

        /*英魂
       * 
       * @type {string}
       * @memberOf ResPrefixConstructor
       */
        YingHun: string;

        /*日常
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        RiChang: string;

        
        /*攻城
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        GongCheng: string;

         /*各种renderbg
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        RenderBg: string;

         /*各种界面小bg
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        MiddleBg: string;

         /*帮派管理
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        ClanManage: string;

          /*属性
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        Attribute: string;

         /*功能开放提示
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        ModuleOpen: string;

        /*称号
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        Title: string;

        /*失败提升
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        Tisheng: string;

        /*vip
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        Vip: string;
        /*传奇至尊
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        ChuanQiZhiZun: string;
        
        /*观星台
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        GuanXingTai: string;

        
        /*kaifu
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        KaiFu: string;


         /*翅膀
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        ChiBang: string;

        /*沙巴克城主
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        ChengZhu: string;

        /*聊天
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        Chat: string;
    }

}


