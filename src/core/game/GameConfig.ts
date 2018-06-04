/**
 * 游戏的常量的接口定义
 * 子项目自身实现接口
 * @author builder
 */
module shao.game {
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
         * 新手入门
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        Story: string;

        /**
         * 卡片相关
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        Card: string;

        /**
         * 面板底层bg
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        PanelBg: string; 
        
        /**
         * 建筑相关
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        Building: string;

        
        /**
         * 地图块
         * 
         * @type {string}
         * @memberOf ResPrefixConstructor
         */
        MapBlock: string;
    }

}


